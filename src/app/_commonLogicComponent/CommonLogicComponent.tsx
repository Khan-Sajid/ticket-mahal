"use client";
import Login from "@/components/Login/Login";
import VerifyRegisterOtp from "@/components/register/VerifyRegisterOtp/VerifyRegisterOtp";
import { Verification } from "@/constants/enums";
import {
  loginNeeded,
  openVerification,
  userDetails,
  userPrefferedLocation,
} from "@/jotai/atoms";
import { PreferredLocation } from "@/types/common";
import { PREFERRED_LOCATION } from "@/utils/constants";
import { getLocalStorage } from "@/utils/storage.utils";
import { getUserDetail } from "@/utils/userAuth";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

const CommonLogicComponent = () => {
  const [_, setPrefferedLocation] = useAtom(userPrefferedLocation);
  const [openLogin, setOpenLogin] = useAtom(loginNeeded);
  const [user, setUser] = useAtom(userDetails);
  const [openVerifyModal, setOpenVerifyModal] = useAtom(openVerification);

  useEffect(() => {
    const userDetails = getUserDetail();
    if (userDetails) setUser(userDetails);
    const userPreference =
      getLocalStorage<PreferredLocation>(PREFERRED_LOCATION);
    if (userPreference) setPrefferedLocation(userPreference);
  }, [setUser, setPrefferedLocation]);

  useEffect(() => {
    if (
      user &&
      !(
        (user.email && user.isEmailVerified === Verification.APPROVED) ||
        (user.phoneNo && user.isPhoneNoVerified === Verification.APPROVED)
      )
    ) {
      setOpenVerifyModal(true);
    }
    return () => {};
  }, [user]);

  return (
    <>
      {openLogin && <Login />}
      {openVerifyModal && <VerifyRegisterOtp />}
    </>
  );
};

export default CommonLogicComponent;
