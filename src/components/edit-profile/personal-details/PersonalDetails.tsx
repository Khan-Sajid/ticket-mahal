"use client";
import React from "react";
import styles from "./personalDetails.module.scss";
import { IUser } from "@/interfaces/user";
interface IPersonalDetails {
  formData?: Partial<IUser>;
  handleInput: (e: any) => void;
}

const PersonalDetails = (props: IPersonalDetails) => {
  const { formData, handleInput } = props;
  if (!formData) return null;

  return (
    <div className={styles.formWrap}>
      <h2 className="headingTwo">Personal Details</h2>
      <div className={styles.formGroup}>
        <label htmlFor="fullname" className={styles.inputLabel}>
          Full Name
        </label>
        <input
          type="text"
          id="fullname"
          name="name"
          value={formData?.name}
          onChange={handleInput}
          required
          className={styles.formControl}
          placeholder="Enter your full name"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="dob" className={styles.inputLabel}>
          Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData?.dob ?? ""}
          onChange={handleInput}
          required
          className={styles.formControl}
          placeholder="Your dob"
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.inputLabel}>Gender:</label>
        <div className={styles.checkBoxList}>
          <div className={styles.item}>
            <input
              type="radio"
              id="male"
              name="genderType"
              value="male"
              checked={formData?.genderType === "male"}
              readOnly
              onChange={handleInput}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className={styles.item}>
            <input
              type="radio"
              id="female"
              name="genderType"
              value="female"
              checked={formData?.genderType === "female"}
              readOnly
              onChange={handleInput}
            />
            <label htmlFor="female">Female</label>
          </div>
          <div className={styles.item}>
            <input
              type="radio"
              id="other"
              name="genderType"
              value="other"
              checked={formData?.genderType === "other"}
              readOnly
              onChange={handleInput}
            />
            <label htmlFor="other">other</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
