"use client";
import React from "react";
import styles from "./address.module.scss";
import { IUser } from "@/interfaces/user";
interface IPersonalDetails {
  formData?: Partial<IUser>;
  handleInput: (e: any) => void;
}

const AddressDetails = (props: IPersonalDetails) => {
  const { formData, handleInput } = props;

  if (!formData) return null;
  return (
    <div className={styles.formWrap}>
      <h2 className="headingTwo">Your Address</h2>
      <div className={styles.formGroup}>
        <label htmlFor="address" className={styles.inputLabel}>
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address.address"
          value={formData?.addresses?.[0]?.address ?? ""}
          onChange={handleInput}
          required
          className={styles.formControl}
          placeholder="House No, Floor, Street"
        />
      </div>
      <div className={styles.formRowGroup}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="city"
            name="address.city"
            value={formData?.addresses?.[0]?.city ?? ""}
            onChange={handleInput}
            required
            className={styles.formControl}
            placeholder="Enter your city"
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="zipCode"
            name="address.zipCode"
            value={formData?.addresses?.[0]?.zipCode ?? ""}
            onChange={handleInput}
            required
            className={styles.formControl}
            placeholder="Enter your Zip Code"
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="state"
            name="address.state"
            value={formData?.addresses?.[0]?.state ?? ""}
            onChange={handleInput}
            required
            className={styles.formControl}
            placeholder="Enter your state"
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="country"
            name="address.country"
            value={formData?.addresses?.[0]?.country ?? ""}
            onChange={handleInput}
            required
            className={styles.formControl}
            placeholder="Enter your country"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
