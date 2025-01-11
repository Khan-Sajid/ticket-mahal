"use client";
import styles from "./header.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronDown,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Notification from "./Notification/Notification";
import SearchPost from "./SearchPost/SearchPost";
import { useEffect, useState } from "react";
import SearchCity from "./SearchCity/SearchCity";
import CategoriesNav from "./categories/categories";
import { Category } from "@/interfaces/categories";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllCategories } from "./header.http";
import { useAtom } from "jotai";
import { loginNeeded, userDetails, userPrefferedLocation } from "@/jotai/atoms";

const Header = () => {
  const router = useRouter();
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [_, setOpenLogin] = useAtom(loginNeeded);
  const [prefferedLocation, setPrefferedLocation] = useAtom(
    userPrefferedLocation
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [user, setUser] = useAtom(userDetails);
  const s3Url = process.env.NEXT_PUBLIC_S3_URL;
  const toggleLocationPopup = () => {
    setIsOpenLocation(!isOpenLocation);
  };

  async function getCategories() {
    const res = await getAllCategories();
    if (res.statusCode && res.statusCode === 200 && res.data) {
      setCategories(res.data);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <section className={styles.headerWrap}>
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-6">
              <Link href={"/"}>
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  className={`img-fluid topHeaderLogo w-100`}
                  width={219}
                  height={100}
                  onClick={() => router.push("/")}
                />
              </Link>
              <button
                className={`d-flex d-lg-none ${styles.locationBtn}`}
                onClick={toggleLocationPopup}
              >
                {prefferedLocation?.city?.name ?? "Select City"}
                <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
              </button>
            </div>
            <div className={`col-lg-10 col-6 ${styles.firstNav}`}>
              <SearchPost></SearchPost>
              <button
                className={`d-none d-lg-flex ${styles.locationBtn}`}
                onClick={toggleLocationPopup}
              >
                {prefferedLocation?.city?.name ?? "Select City"}
                <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
              </button>
              {/* <LanguageDropDown></LanguageDropDown> */}
              <Notification></Notification>
              {!user?._id ? (
                <button
                  className={`d-none d-lg-flex ${styles.btnSignUp}`}
                  onClick={() => setOpenLogin(true)}
                >
                  Login/SignUp
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              ) : (
                <Link href={"/profile"}>
                  <Image
                    src={
                      user?.profilePic
                        ? s3Url + user.profilePic
                        : "/images/profile.png"
                    }
                    width={30}
                    height={30}
                    className={styles.profileImg}
                    alt="profile image"
                  ></Image>
                </Link>
              )}
              {!user?._id && (
                <span
                  className={`d-flex d-lg-none ${styles.userCircleIcon}`}
                  onClick={() => setOpenLogin(true)}
                >
                  <FontAwesomeIcon icon={faUserCircle} />
                </span>
              )}
            </div>
          </div>
          <CategoriesNav categories={categories}></CategoriesNav>
        </div>
      </section>
      {isOpenLocation && (
        <SearchCity closePopup={toggleLocationPopup}></SearchCity>
      )}
    </>
  );
};

export default Header;
