"use client";

import React, { useState } from "react";
import styles from "./contactUsForm.module.scss";
import formStyles from "../../Login/EmailLoginForm/EmailLoginForm.module.scss";
import classNames from "classnames";
import { COUNTRY_CODE } from "@/constants";
import { postContactForm } from "./contactusForm.http";
import { toast } from "react-toastify";

const ContactUsForm = () => {
  const initFormData = {
    name: "",
    message: "",
    email: "",
    phoneNo: "",
    countryCode: COUNTRY_CODE,
  };
  const [formData, setFormData] = useState(initFormData);

  async function handleFormSubmit(e: any) {
    e.preventDefault();
    const res = await postContactForm(formData);
    if (res && (res.statusCode === 200 || res.statusCode === 201)) {
      toast.success("Request sent successfully!");
      setFormData(initFormData);
    } else {
      toast.error(res.message || "Something went wrong! Please try again.");
    }
  }

  function handleInputChange(e: any) {
    const target = e.target;
    const name = target.name;
    setFormData((prev) => {
      return { ...prev, [name]: target.value };
    });
  }

  return (
    <section className={styles.contentContainer}>
      <div className="container">
        <h3>Get in touch with us</h3>
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <div className={formStyles.formGroup}>
            <label htmlFor="name" className={formStyles.inputLabel}>
              Enter your name here:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={classNames(formStyles.formControl)}
              placeholder="Enter your name"
            />
          </div>
          <div className={formStyles.formGroup}>
            <label htmlFor="phoneNo" className={formStyles.inputLabel}>
              Enter your phone here:
            </label>
            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleInputChange}
              required
              className={classNames(formStyles.formControl)}
              placeholder="Enter your phone"
            />
          </div>
          <div className={formStyles.formGroup}>
            <label htmlFor="email" className={formStyles.inputLabel}>
              Enter your email here:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={classNames(formStyles.formControl)}
              placeholder="Enter your email"
            />
          </div>
          <div className={formStyles.formGroup}>
            <label htmlFor="message" className={formStyles.inputLabel}>
              Enter your message here:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className={classNames(formStyles.formControl)}
              placeholder="Enter your message"
            />
          </div>
          <button className={formStyles.btnSubmit} type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUsForm;
