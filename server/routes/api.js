const app = require("express").Router();
const bcrypt = require("bcrypt");
const twofactor = require("node-2fa");
const User = require("../Models/User");

app.get("/", (req, res) => {
  try {
    res.json({ ok: true, msg: "Hello" });
  } catch (error) {
    res.json({ ok: false, msg: error });
  }
});

app.post("/register", async (req, res) => {
  try {
    if (!req.body?.password?.trim() || !req.body?.username?.trim()) {
      res.json({ ok: false, msg: "Please enter all required fields" });
    }
    const i = (o, ...s) => s.map((_) => o[_].trim());
    //   will destructure the given data // Trimed
    const [username, password] = i(req.body, "username", "password");

    if (await User.findOne({ username })) {
      return res.json({ ok: false, msg: "User already exists" });
    }
    console.log(typeof username, typeof password);
    if (password.length < 5) {
      return res.json({
        ok: false,
        msg: "Password must be more than 5 character",
      });
    }

    const newSecret = twofactor.generateSecret({
      name: "TwoFactorAuthenticator", // Application name
      account: username, // Unique identifier for user
    });
    res.json({
      ok: true,
      status: 101,
      msg: "Authentication required",
      twofactor: newSecret, // 2fa details containing the qr code and secret
    });
  } catch (error) {
    res.json({ ok: false, msg: error.toString() });
  }
});

app.post("/register/finish", async (req, res) => {
  try {
    if (
      !req.body?.password?.trim() ||
      !req.body?.username?.trim() ||
      !req.body?.name?.trim() ||
      !req.body?.twofactor_token?.trim() ||
      !req.body?.twofactor_code?.trim()
    ) {
      return res.json({ ok: false, msg: "Please enter all required fields" });
    }
    const i = (o, ...s) => s.map((_) => o[_].trim());
    //   will destructure the given data // Trimed
    const [username, password, name, twofactor_token, twofactor_code] = i(
      req.body,
      "username",
      "password",
      "name",
      "twofactor_token",
      "twofactor_code"
    );

    //   check if 2fa code is valid or not
    const matched = twofactor.verifyToken(twofactor_token, twofactor_code);

    if (await User.findOne({ username })) {
      return res.json({ ok: false, msg: "User already exists" });
    }
    if (password < 5) {
      return res.json({
        ok: false,
        msg: "Password must be more than 5 character",
      });
    }

    if (!matched) {
      return res.json({ ok: false, msg: "Invalid Two factor code" });
    }

    //   hash password and register user
    const hassedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hassedPassword,
      name,
      twofactor: twofactor_token,
    });

    await newUser.save();
    res.json({
      ok: true,
      msg: "Successfully Registered",
    });
  } catch (error) {
    res.json({ ok: false, msg: error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const {
      username: username = null,
      password: password = null,
      twofactor_code: twofacode = null,
      twofatoken: token = null,
    } = req.body;

    if (!username || !password) {
      return res.json({ ok: false, msg: "Invalid login" });
    }

    const verify = await User.findOne({ username });

    if (!verify) {
      return res.json({ ok: false, msg: "Invalid login" });
    }

    const check = bcrypt.compare(password, verify.password);

    if (!check) {
      return res.json({ ok: false, msg: "Invalid login" });
    }
    if (token) {
      const matched = twofactor.verifyToken(token, twofacode);

      if (!matched) {
        return res.json({ ok: false, msg: "Invalid login" });
      }

      let backup = { ...verify._doc };

      delete backup.password;
      delete backup._v;
      delete backup._id;

      res.status(200).json({
        ok: true,
        msg: "Successfully logged in",
        user: backup,
      });
    } else {
      return res.status(200).json({
        ok: true,
        status: 101,
        msg: "need 2fa verification",
        "2fa_token": verify.twofactor,
      });
    }
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.toString() });
  }
});

module.exports = app;
