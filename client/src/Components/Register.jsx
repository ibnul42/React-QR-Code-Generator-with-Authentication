import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const { name, username, password } = formData;

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/createUser", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Enter name"
        />
        <br /> <br />
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          placeholder="Enter username"
        />
        <br /> <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Enter password"
        />
        <br /> <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
