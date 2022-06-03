import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const { name, username, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:5000/createUser", formData)
      .then((res) => {
        toast.success(res.data);
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
        });
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  return (
    <div className="max-w-7xl mx-auto my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mx-3">
        <div className="col-span-1">
          <div className="flex flex-col">
            <p className="font-bold text-xl md:text-2xl lg:text-3xl my-4 text-[#00152E]">
              Please Enter your credential
            </p>
            <p className="text-[#62626B]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam,
              doloribus! Recusandae repudiandae necessitatibus modi, ea autem
              fugiat porro pariatur? Molestiae in sed temporibus, quidem
              explicabo facilis deserunt totam molestias sequi!
            </p>
            <div className="">
              <form onSubmit={onSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="John Doe"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:w-9/12 md:w-8/12 lg:w-1/2"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChange}
                    placeholder="john01"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:w-9/12 md:w-8/12 lg:w-1/2"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="john@mail.co"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:w-9/12 md:w-8/12 lg:w-1/2"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="john1234"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:w-9/12 md:w-8/12 lg:w-1/2"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-1 w-96 h-80 md:w-[420px] md:h-[350px] lg:w-[450px] lg:h-[375px]">
          <div className="flex justify-center items-center">
            <img
              src="/assets/email_phone.png"
              className="h-full w-full"
              alt=""
            />
          </div>
          <div className="mt-5 md:mt-8 flex flex-col lg:flex-row mx-0 md:ml-10 lg:ml-20 xl:ml-36">
            <p className="ml-1 md:ml-0 mr-2">Need any help?</p>
            <div className="mx-1 uppercase text-[#0C77FF] cursor-pointer">
              Contact Us
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
