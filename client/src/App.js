import Login from "./Components/Login";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <h2 className="title">Qr Code authentication with React</h2>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
