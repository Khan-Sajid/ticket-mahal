import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import styles from "./verifyAndReset.module.scss";
import formStyle from "../EmailLoginForm/EmailLoginForm.module.scss";
import { postforgotPassword, postResetPassword } from "../login.http";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { loginNeeded, userDetails } from "@/jotai/atoms";
import { login } from "@/utils/userAuth";

const VerifyAndReset = ({ userName }: { userName: string }) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    otp: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openLogin, setOpenLogin] = useAtom(loginNeeded);
  const [resendOTPNeeded, setResendOTPNeeded] = useState(false);
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const [time, setTime] = useState(30);
  const [userDetail, setUserDetail] = useAtom(userDetails);

  function handleOTPChange(OTP: string) {
    setFormData((prev) => {
      return { ...prev, otp: OTP };
    });
  }

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
    const res = await postResetPassword({
      newPassword: formData.newPassword,
      otp: formData.otp,
    });
    if (res && res.statusCode === 200) {
      setUserDetail(res.data);
      login(res.data);
      setOpenLogin(false);
      toast.success("Password reset successful!");
    } else
      toast.error(res.message || "Something went wrong! Please try again.");
    setIsLoading(false);
  }

  async function resendOTP() {
    setIsResendingOTP(true);
    const res = await postforgotPassword({
      userName,
    });
    if (res && res.statusCode == 200) {
      setResendOTPNeeded(false);
      setTime(30);
      toast.success("OTP Resend successfully!");
    } else {
      toast.error(
        res?.message || "Something went wrong. Please try again later"
      );
    }
    setIsResendingOTP(false);
  }

  useEffect(() => {
    if (time === 0) {
      setResendOTPNeeded(true);
      return;
    }
    let timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={formStyle.formGroup}>
          <label className={formStyle.inputLabel}>
            Enter OTP Sent to your Phone/ Email:
          </label>
          <OtpInput
            value={formData.otp}
            onChange={handleOTPChange}
            numInputs={6}
            renderSeparator={<span></span>}
            containerStyle={{ gap: "4px", margin: "12px 0" }}
            inputStyle={{}}
            renderInput={(props) => (
              <input {...props} className={styles.otpInput} />
            )}
          />
        </div>
        <div className={formStyle.formGroup}>
          <label htmlFor="password" className={formStyle.inputLabel}>
            Enter new password (minimum 8 digits):
          </label>
          <input
            type="password"
            id="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            required
            className={formStyle.formControl}
            placeholder="Enter new password"
          ></input>
        </div>
        <div className={formStyle.formGroup}>
          <label htmlFor="confirmPassword" className={formStyle.inputLabel}>
            Confirm new password (minimum 8 digits):
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className={formStyle.formControl}
            placeholder="Confirm new password"
          ></input>
        </div>
        <div className={formStyle.formGroup}>
          <label className={formStyle.inputLabel}>
            {!resendOTPNeeded ? (
              <p className={formStyle.timer}>
                Resend OTP after <span>{time.toString().padStart(2, "0")}</span>{" "}
                Secs
              </p>
            ) : (
              <p className={formStyle.timer}>
                {isResendingOTP ? (
                  "Resending..."
                ) : (
                  <span onClick={resendOTP} style={{ cursor: "pointer" }}>
                    Resend OTP
                  </span>
                )}
              </p>
            )}
          </label>
        </div>
        <button
          type="submit"
          className={formStyle.btnSubmit}
          disabled={
            formData.otp.length !== 6 ||
            formData.newPassword.length < 8 ||
            formData.confirmPassword.length < 8 ||
            formData.newPassword !== formData.confirmPassword
          }
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default VerifyAndReset;
