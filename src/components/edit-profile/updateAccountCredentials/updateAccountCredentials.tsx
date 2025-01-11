import React, { useState } from "react";
import formStles from "../personal-details/personalDetails.module.scss";
import styles from "./updateAccountCredentials.module.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { IUser } from "@/interfaces";
import { useRouter } from "next/navigation";
import ChangePassword from "../changePassword/changePassword";
import UpdateEmailPhone from "../updateEmailPhone/updateEmailPhone";
import { CredentialsType } from "./updateAccountCredentials.enums";

const UpdateAccountCredentials = ({ userDetail }: { userDetail: IUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [changeCredentialPopup, setChangeCredentialPopup] = useState<
    CredentialsType | false
  >();
  const [changePasswordPopup, setChangePasswordPopup] = useState(false);
  const router = useRouter();

  function handlePassword() {
    setShowPassword(!showPassword);
  }

  function handleChangePassword() {
    setChangePasswordPopup(!changePasswordPopup);
  }
  function handleCredentialPopup(type?: CredentialsType) {
    if (type) {
      setChangeCredentialPopup(type);
    } else setChangeCredentialPopup(false);
  }

  function handleChangeEmail() {
    setChangeCredentialPopup(CredentialsType.EMAIL);
  }

  function handleChangePhone() {
    setChangeCredentialPopup(CredentialsType.PHONE);
  }

  return (
    <>
      <div className={classNames(formStles.formWrap, styles.wrap)}>
        <h2 className="headingTwo">Login Credentials</h2>
        <div className={classNames(formStles.formGroup, styles.inputwrapper)}>
          <label htmlFor="email" className={formStles.inputLabel}>
            Email ID
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userDetail?.email}
            required
            className={formStles.formControl}
            placeholder="Enter your Email"
            readOnly
          />
          <span className={styles.updateBtn} onClick={handleChangeEmail}>
            Update Email
          </span>
        </div>
        <div className={classNames(formStles.formGroup, styles.inputwrapper)}>
          <label htmlFor="phoneNo" className={formStles.inputLabel}>
            Phone No.
          </label>
          <input
            type="tel"
            id="phoneNo"
            name="phoneNo"
            value={userDetail?.phoneNo}
            required
            className={formStles.formControl}
            placeholder="Enter your phone number"
            readOnly
          />
          <span className={styles.updateBtn} onClick={handleChangePhone}>
            Update Phone
          </span>
        </div>
        <div className={classNames(formStles.formGroup, styles.inputwrapper)}>
          <label htmlFor="password" className={formStles.inputLabel}>
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={"userDetail"}
            required
            className={formStles.formControl}
            placeholder="Enter your full name"
            readOnly
          />
          <span className={styles.updateBtn} onClick={handleChangePassword}>
            {/* {showPassword ? (
            <FontAwesomeIcon icon={faEye} onClick={handlePassword} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} onClick={handlePassword} />
          )} */}
            <em>Change Password</em>
          </span>
        </div>
      </div>
      {changePasswordPopup && <ChangePassword close={handleChangePassword} />}
      {changeCredentialPopup && (
        <UpdateEmailPhone
          type={changeCredentialPopup}
          close={() => handleCredentialPopup()}
        />
      )}
    </>
  );
};

export default UpdateAccountCredentials;
