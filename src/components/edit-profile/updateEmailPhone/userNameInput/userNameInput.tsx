import classNames from "classnames";
import React, { useState } from "react";
import formStyle from "../../../Login/EmailLoginForm/EmailLoginForm.module.scss";
import { CredentialsType } from "../../updateAccountCredentials/updateAccountCredentials.enums";
import { updateEmail, updatePhone } from "../updateEmailPhone.http";
import { toast } from "react-toastify";
import { emailFormat, phoneFormat } from "@/constants";

const UserNameInput = ({
  type,
  otpSent,
}: {
  type: CredentialsType;
  otpSent: (value: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState("");
  const [isValid, setIsValid] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);
    if (!formData) return;
    let res;
    type === CredentialsType.EMAIL
      ? (res = await updateEmail({ newEmail: formData }))
      : (res = await updatePhone({ newPhoneNo: formData }));
    if (res && res.statusCode === 200) {
      otpSent(formData);
      toast.success("OTP sent successfully!");
    } else {
      toast.error(res.message || "Something went wrong! Please try again.");
    }
    setIsLoading(false);
  }

  function handleInputChange(e: any) {
    setFormData(e.target.value);
    type === CredentialsType.EMAIL
      ? setIsValid(emailFormat.test(e.target.value))
      : setIsValid(phoneFormat.test(e.target.value));
  }

  const inputType = type === CredentialsType.EMAIL ? "email" : "tel";

  return (
    <form onSubmit={handleSubmit}>
      <div className={classNames(formStyle.formGroup)}>
        <label htmlFor="input" className={formStyle.inputLabel}>
          Enter new {type}:
        </label>
        <input
          type={inputType}
          id="input"
          name="input"
          value={formData}
          onChange={handleInputChange}
          className={formStyle.formControl}
          placeholder={`Enter new ${type}`}
          required
        ></input>
      </div>
      <button
        type="submit"
        className={formStyle.btnSubmit}
        disabled={isLoading || !isValid}
      >
        {isLoading ? "Sending OTP..." : "Send OTP"}
      </button>
    </form>
  );
};

export default UserNameInput;
