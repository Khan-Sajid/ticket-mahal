"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ProfileCard.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPencil,
  faPhone,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { IUser } from "@/interfaces/user";
import { usePathname } from "next/navigation";
import { uploadToBucket } from "@/utils/common.http";
import { updateUserDetails } from "../profile.http";
import { login } from "@/utils/userAuth";
import { useAtom } from "jotai";
import { userDetails } from "@/jotai/atoms";

const ProfileUser = (props: IUser) => {
  const pathname = usePathname();
  const fileInputRef = useRef<any>();
  const [profilePic, setProfilePic] = useState("");
  const [user, setUser] = useAtom(userDetails);

  useEffect(() => {
    const s3Url = process.env.NEXT_PUBLIC_S3_URL;
    setProfilePic(
      props?.profilePic && props?.profilePic !== "string"
        ? s3Url + props.profilePic
        : "/images/profile.png"
    );
  }, [props.profilePic]);

  function openFile() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e: any) {
    const files = e.target.files;
    console.log("Selected files:", files);
    const res = await uploadToBucket(files, files?.[0]?.name);
    if (res && res.statusCode === 200) {
      console.log("respoe", res.data);
      updateProfilePic(res.data);
    }
  }

  async function updateProfilePic(url: string) {
    const res = await updateUserDetails({ profilePic: url } as any);
    if (res && res.statusCode === 200) {
      const s3Url = process.env.NEXT_PUBLIC_S3_URL;
      setProfilePic(s3Url + res.data.profilePic);
      login(res.data);
      setUser(res.data);
    }
  }

  return (
    <>
      <h3 className="headingTwo">My Details</h3>
      <div className={styles.mainWrap}>
        <div className={styles.cardWrap}>
          <div className={styles.userDetail}>
            <div className={styles.userImage}>
              <Image
                src={profilePic}
                alt="Example image"
                className="img-fluid"
                width={100}
                height={30}
              />
              {pathname.includes("edit-profile") && (
                <button onClick={openFile}>
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                  {profilePic ? "Update" : "Add Image"}
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }} // Hide the input element
                onChange={handleFileChange}
              />
            </div>
            <div className={`d-none d-md-block ${styles.userInfo}`}>
              <h3>Hello, {props?.name}</h3>
              <ul>
                {props?.phoneNo && (
                  <li>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    <span>{props.phoneNo}</span>
                  </li>
                )}
                {props?.email && (
                  <li>
                    <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                    <span>{props.email}</span>
                  </li>
                )}
              </ul>
            </div>
            {!pathname.includes("edit-profile") && (
              <Link href="/edit-profile">
                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                Edit Details
              </Link>
            )}
          </div>
        </div>
        <div className={`d-block d-md-none ${styles.userInfoBottom}`}>
          <h3>Hello, {props?.name}</h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
              <span>{props?.phoneNo}</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              <span>{props?.email}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileUser;
