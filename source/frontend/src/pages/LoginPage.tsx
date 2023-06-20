import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const LoginPage = (props: Props) => {
  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    var data = JSON.stringify(loginCreds);

    var config = {
      method: "post",
      url: "http://localhost:3000/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.status == 200) {
          setError("");
          console.log(response.data);
          alert(response.data.message);
          navigate("/verifyotp", {
            state: {
              user: response.data.user,
              password: loginCreds.password,
            },
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        setError(error.response.data);
      });
    console.log(loginCreds);
  };
  return (
    <div>
      <h1 className="text-center text-4xl mt-10 font-semibold">Gujarat News</h1>
      <div className="border border-black rounded-md w-[20%] mx-auto mt-20 p-3">
        <form className="text-center" onSubmit={handleSubmit}>
          <h1 className="text-center text-3xl font-semibold">Login</h1>
          <div className="input-container">
            <input
              type="text"
              name="username"
              onChange={(e) => {
                setLoginCreds((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
              required
              autoComplete="new-password"
              className="border border-black p-2 my-2 rounded-md"
              placeholder="Username"
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              required
              autoComplete="new-password"
              className="border border-black p-2 rounded-md mt-2 mb-1"
              onChange={(e) => {
                setLoginCreds((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
              placeholder="Password"
            />
          </div>
          {error.length > 3 ? (
            <span className="text-sm text-red-500">{error}</span>
          ) : (
            ""
          )}
          <br></br>
          <button className="button-container bg-blue-700 rounded-md text-white font-semibold w-20  p-2 mx-auto">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
