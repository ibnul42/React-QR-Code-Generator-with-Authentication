import { CardContent, Grid, TextField, Button } from "@mui/material";

import { useState } from "react";
import QRCode from "qrcode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//   loginInformation
const loginInfo = {
  username: "aaa",
  password: "123",
};

function Login() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [qrCodeNumber, setQrCodeNumber] = useState("");
  const [loginMessage, setLoginmessage] = useState(null);
  const [authenticate, setAuthenticate] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/loginWithUsername", formData)
      .then((res) => {
        setAuthenticate(true);
        generateQrCode(res.data.authenticationCode);
        setLoginmessage("Please verify via QRCode");
      })
      .catch((err) => console.log(err.response));
  };

  const generateQrCode = async (code) => {
    try {
      setQrCodeNumber(code);
      const response = await QRCode.toDataURL(code);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyQrCode = (text) => {
    if (qrCodeNumber === text) {
      alert("Authentication Success!");
      navigate("/");
    } else {
      alert("Please enter valid QR Code");
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={username}
          onChange={onChange}
        />
        <br /> <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <br /> <br />
        <input type="submit" value="Login" />
      </form>
      <p>{loginMessage}</p>
      {authenticate && (
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              {imageUrl && (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="imageUrl" />
                </a>
              )}
              <br />
              <TextField
                label="Enter Text"
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => verifyQrCode(text)}
              >
                Verify
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      )}
    </>
  );
}

export default Login;
