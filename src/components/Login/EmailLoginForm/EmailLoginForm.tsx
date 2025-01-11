"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./EmailLoginForm.module.scss";
import { postLoginEmailPassword } from "../login.http";
import { login } from "@/utils/userAuth";
import { useAtom } from "jotai";
import { loginNeeded, userDetails } from "@/jotai/atoms";
import { toast } from "react-toastify";
import { emailFormat, phoneFormat } from "@/constants";
import classNames from "classnames";

const EmailLoginForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    remember: false,
  });
  const [_, setUser] = useAtom(userDetails);
  const [errors, setErrors] = useState({
    userName: false,
    password: false,
    remember: false,
    any: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openLogin, setOpenLogin] = useAtom(loginNeeded);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await postLoginEmailPassword({
      userName: formData.userName,
      password: formData.password,
    });
    if (res && res.statusCode == 200) {
      setUser(res.data);
      login(res.data);
      setOpenLogin(false);
      toast.success("Logged in successfully!");
    } else {
      toast.error(
        res.message ||
          "Login failed! Please verify credentials and try again later."
      );
    }
    setIsLoading(false);
  };

  function handleInputChange(e: any) {
    const target = e.target;
    const name = target.name;
    if (target.type === "checkbox")
      setFormData({ ...formData, [name]: target.checked });
    else setFormData({ ...formData, [name]: target.value });
  }

  const validateForm = useCallback(() => {
    const errorObj = JSON.parse(JSON.stringify(errors));
    if (
      !formData.userName ||
      (formData.userName &&
        !(
          emailFormat.test(formData.userName) ||
          phoneFormat.test(formData.userName)
        ))
    )
      errorObj.userName = true;
    else errorObj.userName = false;
    if (!formData.password) errorObj.password = true;
    else errorObj.password = false;
    if (!formData.remember) errorObj.remember = true;
    else errorObj.remember = false;
    if (errorObj.userName || errorObj.password) errorObj.any = true;
    else errorObj.any = false;
    setErrors({ ...errorObj });
  }, [formData]);

  useEffect(() => {
    validateForm();
  }, [formData, validateForm]);

  return (
    <form onSubmit={handleLogin}>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.inputLabel}>
          Email ID/ Phone Number:
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          required
          className={classNames(styles.formControl)}
          placeholder="Enter your email ID/ Phone number"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.inputLabel}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className={styles.formControl}
          placeholder="Your password"
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.checkControl}>
          <input
            className="form-check-input"
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleInputChange}
          />
          <div>Remember me as member of Ticket Mahal</div>
        </label>
      </div>
      <button
        type="submit"
        className={styles.btnSubmit}
        disabled={errors.any || isLoading}
      >
        {isLoading ? "Loggin in..." : "Login"}
      </button>
    </form>
  );
};

export default EmailLoginForm;
