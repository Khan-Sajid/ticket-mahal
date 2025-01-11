import React, { useEffect, useState } from "react";
import modalStyles from "../../Login/Login.module.scss";
import styles from "./VerifyRegisterOtp.module.scss";
import OtpInput from "react-otp-input";
import CustomModal from "@/components/ui/custom-modal/customModal";
import Image from "next/image";
import { useAtom } from "jotai";
import { openVerification, userDetails } from "@/jotai/atoms";
import { login } from "@/utils/userAuth";
import { postVerifyOTP, putResendOTP } from "@/components/Login/login.http";
import { toast } from "react-toastify";
import { Verification } from "@/constants/enums";

const VerifyRegisterOtp = () => {
  const [otp, setOtp] = useState("");
  const [resendOTPNeeded, setResendOTPNeeded] = useState(false);
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const [userDetail, setUserDetail] = useAtom(userDetails);
  const [openVerifyOTP, setOpenVerifyOTP] = useAtom(openVerification);
  const [time, setTime] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);
    const res = await postVerifyOTP({
      otp: otp,
    });
    if (res && res.statusCode === 200) {
      setUserDetail(res.data);
      login(res.data);
      setOpenVerifyOTP(false);
      toast.success("OTP verified successfully!");
    } else
      toast.error(res.message || "Something went wrong! Please try again.");
    setIsLoading(false);
  }

  async function resendOTP() {
    setIsResendingOTP(true);
    const res = await putResendOTP({ isPhone });
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
    if (
      userDetail &&
      userDetail.phoneNo &&
      userDetail.isPhoneNoVerified === Verification.APPROVED
    ) {
      setIsPhone(true);
    }
    return () => {};
  }, [userDetail]);

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
    <CustomModal>
      <div className={modalStyles.mainWrapper}>
        <div className={modalStyles.formBox}>
          <h4 className={modalStyles.topHeading}>
            <span className="d-block">Hey, </span>
            Welcome!
          </h4>
          <p className={modalStyles.info}>
            Complete your Sign Up process here!
          </p>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="otp" className={styles.inputLabel}>
                Enter OTP sent to your {isPhone ? "phone" : "email"}
              </label>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span></span>}
                containerStyle={{ gap: "4px", margin: "12px 0" }}
                inputStyle={{}}
                renderInput={(props) => (
                  <input {...props} className={styles.otpInput} />
                )}
              />
            </div>
            {!resendOTPNeeded ? (
              <p className={styles.timer}>
                Resend OTP after <span>{time.toString().padStart(2, "0")}</span>{" "}
                Secs
              </p>
            ) : (
              <p className={styles.timer}>
                {isResendingOTP ? (
                  "Resending..."
                ) : (
                  <span onClick={resendOTP} style={{ cursor: "pointer" }}>
                    Resend OTP
                  </span>
                )}
              </p>
            )}
            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={otp.length != 6 || isLoading}
            >
              {isLoading ? "Verifying.." : "Continue"}
            </button>
          </form>
        </div>
        <div className={modalStyles.imageBox}>
          <Image
            src="/images/logo.svg"
            alt="logo"
            className="img-fluid"
            width={219}
            height={100}
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default VerifyRegisterOtp;
