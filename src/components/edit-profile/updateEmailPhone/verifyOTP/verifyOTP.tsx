import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import formStyle from "../../../Login/EmailLoginForm/EmailLoginForm.module.scss";
import otpStyles from "../../../Login/verifyAndReset/verifyAndReset.module.scss";
import { useAtom } from "jotai";
import { userDetails } from "@/jotai/atoms";
import { CredentialsType } from "../../updateAccountCredentials/updateAccountCredentials.enums";
import { updateEmail, updatePhone } from "../updateEmailPhone.http";
import { toast } from "react-toastify";
import { postVerifyOTP } from "@/components/Login/login.http";
import { login } from "@/utils/userAuth";
import { useRouter } from "next/navigation";

const VerifyOTP = ({
  type,
  close,
  userDetailInput,
}: {
  type: CredentialsType;
  close: () => void;
  userDetailInput: string;
}) => {
  const [formData, setFormData] = useState({
    otp: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [resendOTPNeeded, setResendOTPNeeded] = useState(false);
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const [time, setTime] = useState(30);
  const [userDetail, setUserDetail] = useAtom(userDetails);
  const router = useRouter();

  function handleOTPChange(OTP: string) {
    setFormData((prev) => {
      return { ...prev, otp: OTP };
    });
  }

  async function resendOTP() {
    setIsResendingOTP(true);
    if (!formData) return;
    let res;
    type === CredentialsType.EMAIL
      ? (res = await updateEmail({ newEmail: userDetailInput }))
      : (res = await updatePhone({ newPhoneNo: userDetailInput }));
    if (res && res.statusCode === 200) {
      setTime(30);
      setResendOTPNeeded(false);
      toast.success("OTP Resent Successfully!");
    } else {
      toast.error(res.message || "Something went wrong! Please try again.");
    }
    setIsResendingOTP(false);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!formData.otp) return;
    setIsLoading(true);
    const res = await postVerifyOTP({ otp: formData.otp });
    if (res && res.statusCode === 200) {
      login(res.data);
      setUserDetail(res.data);
      toast.success("OTP Verified Successfully!");
      router.refresh();
      close();
    } else {
      toast.error(
        res.message || "Something went wrong! Please try again later."
      );
    }
    setIsLoading(false);
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
    <form onSubmit={handleSubmit}>
      <div className={formStyle.formGroup}>
        <label className={formStyle.inputLabel}>
          Enter OTP Sent to your {type}:
        </label>
        <OtpInput
          value={formData.otp}
          onChange={handleOTPChange}
          numInputs={6}
          renderSeparator={<span></span>}
          containerStyle={{ gap: "4px", margin: "12px 0" }}
          inputStyle={{}}
          renderInput={(props) => (
            <input {...props} className={otpStyles.otpInput} />
          )}
        />
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
        disabled={formData.otp.length !== 6 || isLoading}
      >
        {isLoading ? "Submitting..." : "Submit OTP"}
      </button>
    </form>
  );
};

export default VerifyOTP;
