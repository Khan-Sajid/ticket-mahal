import CommonHeader from "@/components/common-header/CommonHeader.component";
import ContactInfoWithMap from "@/components/contactUs/contactInfoWithMap/contactInfoWithMap";
import ContactUsForm from "@/components/contactUs/contactUsForm/contactUsForm";
import ProfileHeader from "@/components/profile/profile-header/ProfileHeader.component";
import React from "react";

const page = () => {
  return (
    <>
      <CommonHeader>
        <ProfileHeader heading="Contact" />
      </CommonHeader>
      <ContactUsForm />
      <ContactInfoWithMap />
    </>
  );
};

export default page;
