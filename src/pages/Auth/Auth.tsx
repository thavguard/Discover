import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../components/Auth/LoginForm/LoginForm";
import { useAppSelector } from "../../hooks/hooks";
import "./Auth.scss";

type Props = {};

const Auth = (props: Props) => {
  // const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  // if (token) {
  //   navigate("/");
  // }
  
  return (
    <div className="auth-container">
      <div className="auth__welcome">
        {/* To use all the features of the service, please log in {token} */}
      </div>
      <div className="auth__form--container">
        <div className="auth__form">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Auth;
