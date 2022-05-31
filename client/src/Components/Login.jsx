import { CardContent, Grid, TextField, Button } from "@mui/material";

import { useState } from "react";
import QRCode from "qrcode";
import { useNavigate } from "react-router-dom";

//   loginInformation
const loginInfo = {
  userName: "aaa",
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
    userName: "",
    password: "",
  });

  const { userName, password } = formData;

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(loginInfo, formData);
    if (
      formData.userName === loginInfo.userName &&
      formData.password === loginInfo.password
    ) {
      setAuthenticate(true);
      generateQrCode();
      setLoginmessage("Please verify via QRCode");
    } else {
      setLoginmessage("Invalid Credential");
    }
  };

  const generateQrCode = async () => {
    const randomNumber = (Math.random() * 100000).toFixed(0);
    console.log(randomNumber);
    try {
      setQrCodeNumber(randomNumber.toString());
      const response = await QRCode.toDataURL(randomNumber.toString());
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
          placeholder="userName"
          name="userName"
          value={userName}
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
