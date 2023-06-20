import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

type Props = {};

const VerifyOtp = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const [otpDetails, setOtpDetails] = useState({
    username: location.state.user.username,
  });
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(otpDetails);
    var data = JSON.stringify({
      otpDetails,
      user: location.state.user,
    });

    var config = {
      method: "post",
      url: "http://localhost:3000/verifyotp",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert(response.data.message);
        if (response.data.role == "Admin") {
          navigate("/admin/home");
          Cookie.set(response.data.role, response.data.token);
          Cookie.remove("User");
        } else if (response.data.role == "User") {
          navigate("/reporter/home");
          Cookie.set(response.data.role, response.data.token);
          Cookie.remove("Admin");
        } else {
          Cookie.remove("Admin");
          Cookie.remove("User");
          navigate("/login");
        }
      })
      .catch(function (error) {
        console.log(error);
        setError(error.response.data);
      });
  };
  const resendOtp = () => {
    var data = JSON.stringify({
      username: location.state.user.username,
      password: location.state.password,
    });

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
        }
      })
      .catch(function (error) {
        console.log(error);
        setError(error.response.data);
      });
  };
  console.log(otpDetails, "a");
  return (
    <div>
      <h1 className="text-center text-4xl mt-10 font-semibold">Gujarat News</h1>

      <div className="border border-black rounded-md w-[20%] mx-auto mt-20 p-3">
        <h1 className="text-center text-2xl font-semibold">Verify Otp</h1>

        <form className="text-center" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="number"
              name="otp"
              required
              autoComplete="new-password"
              className="border border-black p-2 rounded-md mt-2 "
              placeholder="Enter Otp"
              onChange={(e) => {
                setOtpDetails((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </div>
          <a onClick={resendOtp} className="text-blue-600 underline">
            resent otp
          </a>
          <br />
          {error.length > 3 ? (
            <span className="text-sm text-red-500">{error}</span>
          ) : (
            ""
          )}
          <br></br>
          <button className="button-container bg-blue-700 rounded-md text-white font-semibold w-32 mt-1 p-2 mx-auto">
            Verify Otp
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
