import {
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import QRCode from "qrcode";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // const classes = useStyles();

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="container">
      <Card>
        <h2 className="title">Generate Download & scan code</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField
                label="Enter Text"
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => generateQrCode()}
              >
                Generate
              </Button>
              <br />
              <br />
              {imageUrl && (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="imageUrl" />
                </a>
              )}
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}></Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}></Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

// const useStyles = makeStyles((theme) => ({
//   container: {
//     marginTop: 10,
//   },
//   title: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#3f51b5",
//     color: "#fff",
//     padding: 20,
//   },
// }));

export default App;
