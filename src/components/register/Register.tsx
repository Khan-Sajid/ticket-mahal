"use client";
import React, { useState } from "react";
import FirstStage from "./first-stage/FirstStage";
import GoogleRegister from "./GoogleRegister/GoogleRegister";
import VerifyRegisterOtp from "./VerifyRegisterOtp/VerifyRegisterOtp";

const Register = () => {
  const [stage, setStage] = useState(1);

  return (
    <>
      {stage === 1 && <FirstStage setStage={setStage} />}
      {/* {stage === 2 && <VerifyRegisterOtp />} */}
      <GoogleRegister></GoogleRegister>
    </>
  );
};

export default Register;
