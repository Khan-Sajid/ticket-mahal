import React from "react";
import CommonHeader from "../common-header/CommonHeader.component";
import ProfileHeader from "./profile-header/ProfileHeader.component";
import ProfileUser from "./profile-card/ProfileCard";
import UserBooking from "./user-booking/UserBooking";
import { notFound } from "next/navigation";
import { loginCookieName } from "@/utils/userAuth";
import { fetchUserDetail } from "./profile.http";
import { cookies } from "next/headers";

const ProfileMain = async () => {
  let session: any = (await cookies()).get(loginCookieName);
  if (session) session = JSON.parse(session?.value)?.session;

  const userDetailRes = await fetchUserDetail(session);
  if (userDetailRes.statusCode !== 200 || !userDetailRes.data) {
    return notFound();
  }

  return (
    <>
      <CommonHeader>
        <ProfileHeader heading="My Profile" />
      </CommonHeader>
      <section style={{ background: "var(--light-6)" }} className="paddingBoth">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-8 col-sm-12">
              <div>
                <ProfileUser {...userDetailRes.data}></ProfileUser>
                <UserBooking></UserBooking>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileMain;
