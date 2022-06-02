import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import LoginNew from "./Components/LoginNew";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginNew />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
