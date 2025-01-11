"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./FirstStage.module.scss";
import Link from "next/link";
import { COUNTRY_CODE, emailFormat, phoneFormat } from "@/constants";
import { postRegister } from "@/components/Login/login.http";
import { toast } from "react-toastify";
import { login } from "@/utils/userAuth";
import { useAtom } from "jotai";
import { loginNeeded, userDetails } from "@/jotai/atoms";

const FirstStage = (props: any) => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    name: "",
    termCondition: false,
    remember: false,
  });
  const [errors, setErrors] = useState({
    userName: false,
    password: false,
    name: false,
    termCondition: false,
    remember: false,
    any: true,
  });
  const [userDetail, setUserDetail] = useAtom(userDetails);
  const [openLogin, setOpenLogin] = useAtom(loginNeeded);
  const [isLoading, setIsLoading] = useState(false);

  const handRegister = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const body: any = {
      name: formData.name,
      password: formData.password,
      isTermsAndCondition: formData.termCondition,
    };
    if (emailFormat.test(formData.userName)) {
      body.email = formData.userName;
    } else {
      body.phoneNo = formData.userName;
      body.countryCode = COUNTRY_CODE;
    }
    const res = await postRegister(body);
    if (res && (res.statusCode === 201 || res.statusCode === 200)) {
      login(res.data);
      setUserDetail(res.data);
      setOpenLogin(false);
      toast.success("Registration Done Successfully!");
    } else {
      toast.error(res.message || "Something Went wrong! Please try again.");
    }
    setIsLoading(false);
  };

  const handleInput = (e: any) => {
    const target = e.target;
    const name = target.name;
    setFormData((prev) => {
      if (target.type === "checkbox") {
        return { ...prev, [name]: target.checked };
      }
      return { ...prev, [name]: target.value };
    });
  };

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
    if (!formData.name) errorObj.name = true;
    else errorObj.name = false;
    if (!formData.termCondition) errorObj.termCondition = true;
    else errorObj.termCondition = false;
    if (
      errorObj.userName ||
      errorObj.password ||
      errorObj.name ||
      errorObj.termCondition
    )
      errorObj.any = true;
    else errorObj.any = false;
    setErrors({ ...errorObj });
  }, [formData]);

  useEffect(() => {
    validateForm();
  }, [formData, validateForm]);

  return (
    <form onSubmit={handRegister}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.inputLabel}>
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInput}
          required
          className={styles.formControl}
          placeholder="Enter your name"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="userName" className={styles.inputLabel}>
          Email or Phone Number:
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleInput}
          required
          className={styles.formControl}
          placeholder="Enter your email or phone number"
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
          onChange={handleInput}
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
            name="termCondition"
            checked={formData.termCondition}
            onChange={handleInput}
            required
          />
          <div>
            {`By signing up, you are creating a Ticket Mahal account, and you
            agree to Ticket Mahal's`}
            <Link href=""> Term of Use</Link> and
            <Link href=""> Privacy Policy</Link>.
          </div>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.checkControl}>
          <input
            className="form-check-input"
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleInput}
          />
          <div>Remember me as member of Ticket Mahal.</div>
        </label>
      </div>
      <button
        type="submit"
        className={styles.btnSubmit}
        disabled={errors.any || isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default FirstStage;
