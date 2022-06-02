import React, { useState } from "react";
import QRCode from "qrcode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginNew() {
  const [userState, setUserState] = useState(true);
  const [emailState, setEmailState] = useState(false);
  const [mfaState, setMfaState] = useState(false);

  //
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [qrCodeNumber, setQrCodeNumber] = useState("");
  const [loginMessage, setLoginmessage] = useState(null);
  const [authenticate, setAuthenticate] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, password, email } = formData;

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitUsername = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/loginWithUsername", formData)
      .then((res) => {
        setAuthenticate(true);
        generateQrCode(res.data.authenticationCode);
        setLoginmessage("Please verify via QRCode");
      })
      .catch((err) => {
        console.log(err.response);
        setLoginmessage(err.response.data);
        setAuthenticate(false);
      });
  };

  const onSubmitEmail = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/loginWithEmail", formData)
      .then((res) => {
        setAuthenticate(true);
        generateQrCode(res.data.authenticationCode);
        setLoginmessage("Please verify via QRCode");
      })
      .catch((err) => {
        console.log(err.response);
        setLoginmessage(err.response.data);
        setAuthenticate(false);
      });
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
  //

  const currentState = (data) => {
    setUserState(false);
    setEmailState(false);
    setMfaState(false);
    if (data === "username") {
      setUserState(true);
    }
    if (data === "email") {
      setEmailState(true);
    }
    if (data === "mfa") {
      setMfaState(true);
    }
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
              <div className="flex gap-3 my-5 font-bold text-2xl text-[#00152E]">
                <p
                  className={`cursor-pointer opacity-50 ${
                    userState
                      ? "text-[#0C77FF] border-b-4 border-blue-600 !opacity-100"
                      : null
                  }`}
                  onClick={() => currentState("username")}
                >
                  Username
                </p>
                <p
                  className={`cursor-pointer opacity-50 ${
                    emailState
                      ? "text-[#0C77FF] border-b-4 border-blue-600 !opacity-100"
                      : null
                  }`}
                  onClick={() => currentState("email")}
                >
                  Email
                </p>
                {authenticate && (
                  <p
                    className={`cursor-pointer opacity-50 ${
                      mfaState
                        ? "text-[#0C77FF] border-b-4 border-blue-600 !opacity-100"
                        : null
                    }`}
                    onClick={() => currentState("mfa")}
                  >
                    MFA
                  </p>
                )}
              </div>
              <div className="">
                {userState && (
                  <form onSubmit={onSubmitUsername}>
                    <div className="mb-6">
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Your username
                      </label>
                      <input
                        type="text"
                        placeholder="john001"
                        name="username"
                        value={username}
                        onChange={onChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Your password
                      </label>
                      <input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Login
                    </button>
                    <p className="my-2">{loginMessage}</p>
                  </form>
                )}
                {emailState && (
                  <form onSubmit={onSubmitEmail}>
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        placeholder="john@mail.co"
                        name="email"
                        value={email}
                        onChange={onChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Your password
                      </label>
                      <input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Login
                    </button>
                    <p className="my-2">{loginMessage}</p>
                  </form>
                )}
                {mfaState && <p>sdg</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 w-96 h-80">
          <img src="/assets/email_phone.png" className="h-full w-full" alt="" />
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

export default LoginNew;
