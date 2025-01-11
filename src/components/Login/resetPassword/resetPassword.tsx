"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import styles from "../EmailLoginForm/EmailLoginForm.module.scss";
import { emailFormat, phoneFormat } from "@/constants";
import { postforgotPassword } from "../login.http";
import { toast } from "react-toastify";
import VerifyAndReset from "../verifyAndReset/verifyAndReset";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    userName: "",
    remember: false,
  });
  const [errors, setErrors] = useState({
    userName: false,
    remember: false,
    any: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);

  const handleLogin = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const res = await postforgotPassword({
      userName: formData.userName,
    });
    if (res && res.statusCode == 200) {
      setVerifyOTP(true);
      toast.success("OTP sent successfully!");
    } else {
      toast.error(
        res.message || "Something went wrong. Please try again later"
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
          phoneFormat.test(formData.userName) ||
          emailFormat.test(formData.userName)
        ))
    )
      errorObj.userName = true;
    else errorObj.userName = false;
    if (!formData.remember) errorObj.remember = true;
    else errorObj.remember = false;
    if (errorObj.userName) errorObj.any = true;
    else errorObj.any = false;
    setErrors({ ...errorObj });
  }, [formData]);

  useEffect(() => {
    validateForm();
  }, [formData, validateForm]);

  if (verifyOTP) {
    return <VerifyAndReset userName={formData.userName} />;
  }

  return (
    <form onSubmit={handleLogin}>
      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.inputLabel}>
          Email ID/ Phone Number:
        </label>
        <input
          type="tel"
          id="phone"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          required
          className={styles.formControl}
          placeholder="Enter your Email ID/Phone Number"
        ></input>
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
          <div>Remember me as member of Ticket Mahal.</div>
        </label>
      </div>
      <button
        type="submit"
        className={styles.btnSubmit}
        disabled={errors.any || isLoading}
      >
        {isLoading ? "Sending OTP..." : "Send OTP"}
      </button>
    </form>
  );
};

export default ResetPassword;
