import React, { useState } from "react";
import styles from "./changePassword.module.scss";
import formStyle from "../../Login/EmailLoginForm/EmailLoginForm.module.scss";
import loginStyles from "../../Login/Login.module.scss";
import CustomModal from "@/components/ui/custom-modal/customModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import classNames from "classnames";
import { updatePassword } from "./changePassword.http";
import { toast } from "react-toastify";

enum PASSWORD {
  OLD_PASSWORD = "oldPassword",
  NEW_PASSWORD = "newPassword",
  CONFIRM_PASSWORD = "confirmPassword",
}

const ChangePassword = ({ close }: { close: () => void }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    [PASSWORD.OLD_PASSWORD]: false,
    [PASSWORD.NEW_PASSWORD]: false,
    [PASSWORD.CONFIRM_PASSWORD]: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(e: any) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);
    const res = await updatePassword({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });
    if (res && (res.statusCode === 200 || res.statusCode === 201)) {
      toast.success("Password reset successful!");
      close();
    } else
      toast.error(res.message || "Something went wrong! Please try again.");
    setIsLoading(false);
  }

  function handlePassword(input: PASSWORD) {
    const updatedView = JSON.parse(JSON.stringify(showPassword));
    updatedView[input] = !showPassword[input];
    setShowPassword(updatedView);
  }

  return (
    <CustomModal>
      <div className={loginStyles.mainWrapper}>
        <div className={loginStyles.formBox}>
          {/* <h4 className={loginStyles.topHeading}>
            <span className="d-block">Hey, </span>
            Welcome Back!
          </h4> */}
          <div className={styles.logoImage}>
            <Image
              src="/images/logo.svg"
              alt="logo"
              className="img-fluid"
              width={219}
              height={100}
            />
          </div>
          <p className={loginStyles.info}>Enter details to change password! </p>
          <div>
            <form onSubmit={handleSubmit}>
              <div
                className={classNames(
                  formStyle.formGroup,
                  styles.inputContainer
                )}
              >
                <label htmlFor="oldPassword" className={formStyle.inputLabel}>
                  Enter old password:
                </label>
                <input
                  type={
                    showPassword[PASSWORD.OLD_PASSWORD] ? "text" : "password"
                  }
                  id="oldPassword"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  required
                  className={formStyle.formControl}
                  placeholder="Enter old password"
                ></input>
                <span className={styles.viewToggle}>
                  {showPassword[PASSWORD.OLD_PASSWORD] ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => handlePassword(PASSWORD.OLD_PASSWORD)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      onClick={() => handlePassword(PASSWORD.OLD_PASSWORD)}
                    />
                  )}
                </span>
              </div>
              <div
                className={classNames(
                  formStyle.formGroup,
                  styles.inputContainer
                )}
              >
                <label htmlFor="password" className={formStyle.inputLabel}>
                  Enter new password (minimum 8 digits):
                </label>
                <input
                  type={
                    showPassword[PASSWORD.NEW_PASSWORD] ? "text" : "password"
                  }
                  id="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                  className={formStyle.formControl}
                  placeholder="Enter new password"
                ></input>
                <span className={styles.viewToggle}>
                  {showPassword[PASSWORD.NEW_PASSWORD] ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => handlePassword(PASSWORD.NEW_PASSWORD)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      onClick={() => handlePassword(PASSWORD.NEW_PASSWORD)}
                    />
                  )}
                </span>
              </div>
              <div
                className={classNames(
                  formStyle.formGroup,
                  styles.inputContainer
                )}
              >
                <label
                  htmlFor="confirmPassword"
                  className={formStyle.inputLabel}
                >
                  Confirm new password (minimum 8 digits):
                </label>
                <input
                  type={
                    showPassword[PASSWORD.CONFIRM_PASSWORD]
                      ? "text"
                      : "password"
                  }
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className={formStyle.formControl}
                  placeholder="Confirm new password"
                ></input>
                <span className={styles.viewToggle}>
                  {showPassword[PASSWORD.CONFIRM_PASSWORD] ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => handlePassword(PASSWORD.CONFIRM_PASSWORD)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      onClick={() => handlePassword(PASSWORD.CONFIRM_PASSWORD)}
                    />
                  )}
                </span>
              </div>
              {formData.newPassword &&
                formData.confirmPassword &&
                formData.confirmPassword !== formData.newPassword && (
                  <p className={styles.mismatch}>Password did not match.</p>
                )}
              <button
                type="submit"
                className={formStyle.btnSubmit}
                disabled={
                  formData.oldPassword.length < 8 ||
                  formData.newPassword.length < 8 ||
                  formData.newPassword !== formData.confirmPassword
                }
              >
                {isLoading ? "Changing..." : "Change Password"}
              </button>
            </form>
            <span className={loginStyles.crossIcon} onClick={close}>
              <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </span>
          </div>
        </div>
        {/* <div className={loginStyles.imageBox}>
          <Image
            src="/images/logo.svg"
            alt="logo"
            className="img-fluid"
            width={219}
            height={100}
          />
          <span className={loginStyles.crossIcon} onClick={close}>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </span>
        </div> */}
      </div>
    </CustomModal>
  );
};

export default ChangePassword;
