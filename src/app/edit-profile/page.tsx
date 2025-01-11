import EditProfileMain from "@/components/edit-profile/EditProfile";
import { fetchUserDetail } from "@/components/profile/profile.http";
import { loginCookieName } from "@/utils/userAuth";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

const EditProfile = async () => {
  let session: any = (await cookies()).get(loginCookieName);
  if (session) session = JSON.parse(session?.value)?.session;
  const userDetailRes = await fetchUserDetail(session);
  if (userDetailRes.statusCode !== 200 || !userDetailRes.data) {
    return notFound();
  }
  return <EditProfileMain userDetail={userDetailRes.data} />;
};

export default EditProfile;
