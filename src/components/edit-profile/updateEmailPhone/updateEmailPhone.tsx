import React, { useState } from "react";
import styles from "./updateEmailPhone.module.scss";
import formStyle from "../../Login/EmailLoginForm/EmailLoginForm.module.scss";
import loginStyles from "../../Login/Login.module.scss";
import CustomModal from "@/components/ui/custom-modal/customModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import classNames from "classnames";
import { toast } from "react-toastify";
import UserNameInput from "./userNameInput/userNameInput";
import VerifyOTP from "./verifyOTP/verifyOTP";
import { CredentialsType } from "../updateAccountCredentials/updateAccountCredentials.enums";

const UpdateEmailPhone = ({
  close,
  type,
}: {
  close: () => void;
  type: CredentialsType;
}) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isVerifyOTPScreen, setIsVerifyOTPScreen] = useState(false);
  const [userNameInput, setUserNameInput] = useState("");

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
    // const res = await updatePassword({
    //   oldPassword: formData.oldPassword,
    //   newPassword: formData.newPassword,
    // });
    // if (res && (res.statusCode === 200 || res.statusCode === 201)) {
    //   toast.success("Password reset successful!");
    //   close();
    // } else
    //   toast.error(res.message || "Something went wrong! Please try again.");
    setIsLoading(false);
  }

  // function handlePassword(input: PASSWORD) {
  //   const updatedView = JSON.parse(JSON.stringify(showPassword));
  //   updatedView[input] = !showPassword[input];
  //   setShowPassword(updatedView);
  // }

  function otpSent(inputValue: string) {
    setUserNameInput(inputValue);
    setIsVerifyOTPScreen(true);
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
          <p className={loginStyles.info}>Enter details to change {type}! </p>
          <div>
            {isVerifyOTPScreen ? (
              <VerifyOTP
                type={type}
                close={close}
                userDetailInput={userNameInput}
              />
            ) : (
              <UserNameInput type={type} otpSent={otpSent} />
            )}
          </div>
          <span className={loginStyles.crossIcon} onClick={close}>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </span>
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

export default UpdateEmailPhone;
