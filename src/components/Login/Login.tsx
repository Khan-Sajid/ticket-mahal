"use client";
import React, { useState } from "react";
import styles from "./Login.module.scss";
import EmailLoginForm from "@/components/Login/EmailLoginForm/EmailLoginForm";
import CustomModal from "../ui/custom-modal/customModal";
import GoogleSignUp from "./GoogleSignUp/GoogleSignUp";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Register from "../register/Register";
import { useAtom } from "jotai";
import { loginNeeded } from "@/jotai/atoms";
import ResetPassword from "@/components/Login/resetPassword/resetPassword";

const Login = () => {
  const [openLogin, setOpenLogin] = useAtom(loginNeeded);
  const [loginForm, setLoginForm] = useState(true);
  const [firstLogin, setFirstLogin] = useState(true);

  const toggleLoginType = () => {
    setLoginForm(!loginForm);
  };
  const toggleLogin = () => {
    setFirstLogin(!firstLogin);
  };
  return (
    <CustomModal>
      <div className={styles.mainWrapper}>
        <div className={styles.formBox}>
          {firstLogin ? (
            <h4 className={styles.topHeading}>
              <span className="d-block">Hey, </span>
              {loginForm ? "Welcome Back!" : "Enter Details"}
            </h4>
          ) : (
            <h4 className={styles.topHeading}>
              <span className="d-block">Hey, </span>
              Welcome!
            </h4>
          )}
          <p className={styles.info}>
            {firstLogin
              ? loginForm
                ? "We are very happy to see you back!"
                : "Enter details to reset your password"
              : "Start your Sign Up process here!"}
          </p>
          {firstLogin ? (
            <>
              {loginForm ? <EmailLoginForm /> : <ResetPassword />}
              <p
                className={`${styles.signUpFirst} ${styles.left}`}
                onClick={toggleLoginType}
              >
                {loginForm ? `Forgot password` : ""}
              </p>
              <GoogleSignUp></GoogleSignUp>
              <p className={styles.signUpFirst}>
                Don’t have account?
                <Link href="" onClick={toggleLogin}>
                  Sign Up here!
                </Link>
              </p>
            </>
          ) : (
            <Register></Register>
          )}
        </div>
        <div className={styles.imageBox}>
          <Image
            src="/images/logo.svg"
            alt="logo"
            className="img-fluid"
            width={219}
            height={100}
          />
          <span
            className={styles.crossIcon}
            onClick={() => setOpenLogin(false)}
          >
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </span>
        </div>
      </div>
    </CustomModal>
  );
};

export default Login;
