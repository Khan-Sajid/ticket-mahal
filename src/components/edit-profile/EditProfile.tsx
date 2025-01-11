"use client";
import React, { useEffect, useState } from "react";
import CommonHeader from "../common-header/CommonHeader.component";
import ProfileHeader from "../profile/profile-header/ProfileHeader.component";
import ProfileUser from "../profile/profile-card/ProfileCard";
import PersonalDetails from "./personal-details/PersonalDetails";
import AddressDetails from "./address/address";
import { IUser } from "@/interfaces/user";
import { updateUserDetails } from "../profile/profile.http";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import UpdateAccountCredentials from "./updateAccountCredentials/updateAccountCredentials";
import { getSession, login } from "@/utils/userAuth";
import { useAtom } from "jotai";
import { userDetails } from "@/jotai/atoms";

const EditProfileMain = ({ userDetail }: { userDetail: IUser }) => {
  const [formData, setFormData] = useState<Partial<IUser>>({} as any);
  const [user, setUser] = useAtom(userDetails);
  const router = useRouter();

  const sanitizeAndFillFormData = () => {
    const updatedData = {
      name: userDetail["name"] || "",
      dob: userDetail?.dob ? userDetail.dob.split?.("T")[0] : "",
      genderType: userDetail["genderType"] || "",
      profilePic: userDetail["profilePic"] || "",
      addresses: [
        {
          zipCode: userDetail["addresses"]?.[0]?.["zipCode"] || "",
          addressType: userDetail["addresses"]?.[0]?.["addressType"] || "Home",
          country: userDetail["addresses"]?.[0]?.["country"] || "",
          state: userDetail["addresses"]?.[0]?.["state"] || "",
          city: userDetail["addresses"]?.[0]?.["city"] || "",
          address: userDetail["addresses"]?.[0]?.["address"] || "",
        },
      ],
    };
    setFormData(updatedData as any);
  };

  function handleInput(e: any) {
    const name = e.target.name;
    const target = e.target;
    if (name.includes(".")) {
      const valueChangeFor = name.split(".").pop();
      setFormData((prevData) => {
        const updatedAddresses = prevData?.addresses || [];
        updatedAddresses[0] = {
          ...updatedAddresses[0],
          [valueChangeFor]: target.value,
        };
        return {
          ...prevData,
          addresses: [...updatedAddresses],
        };
      });
    } else
      setFormData((prevData) => {
        return { ...prevData, [name]: target.value };
      });
  }

  async function saveFormData() {
    if (!formData) return;
    const dataToUpdate = JSON.parse(JSON.stringify(formData));
    Object.keys(dataToUpdate);
    for (const key in dataToUpdate) {
      if (Object.prototype.hasOwnProperty.call(dataToUpdate, key)) {
        const element = dataToUpdate[key];
        if (!element) {
          delete dataToUpdate[key];
        }
      }
    }
    const res = await updateUserDetails(dataToUpdate);
    if (res && (res.statusCode === 200 || res.statusCode === 201)) {
      login(res.data);
      setUser({ ...res.data, session: res.data.accessToken || getSession() });
      toast.success("Details updated successfully!");
      router.push("/profile");
    } else {
      toast.error(
        res.message || "Something went wrong! Please try again later."
      );
    }
  }

  useEffect(() => {
    if (userDetail) {
      sanitizeAndFillFormData();
    }
    return () => {
      setFormData({});
    };
  }, [JSON.stringify(userDetail)]);

  if (!userDetail && !formData) return null;

  return (
    <>
      <CommonHeader>
        <ProfileHeader heading="My Profile"></ProfileHeader>
      </CommonHeader>
      <section style={{ background: "var(--light-6)" }} className="paddingBoth">
        <div className="container">
          <div className="row  d-flex justify-content-center">
            <div className="col-xl-7 col-lg-8 col-sm-12">
              <div>
                <ProfileUser {...userDetail}></ProfileUser>
                <PersonalDetails
                  formData={formData}
                  handleInput={handleInput}
                />
                <UpdateAccountCredentials userDetail={userDetail} />
                <AddressDetails formData={formData} handleInput={handleInput} />
                <button
                  type="button"
                  className="btnTheme mt-3"
                  onClick={saveFormData}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProfileMain;
