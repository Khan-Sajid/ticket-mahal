import React from "react";
import styles from "./GoogleRegister.module.scss";
import Link from "next/link";
import Image from "next/image";

const GoogleRegister = () => {
  return (
    <div>
      <div className={styles.orLine}>
        <span>or</span>
      </div>
      <div className={styles.googleSignUP}>
        <Link href="">
          <Image
            src="/images/Google-logo.svg"
            width={20}
            height={20}
            alt="google-logo"
          />
          <p>Login with Google</p>
        </Link>
        <Link href="">
          <Image
            src="/images/microsoft-logo.svg"
            width={20}
            height={20}
            alt="microsoft-logo"
          />
          <p>Login with Google</p>
        </Link>
      </div>
    </div>
  );
};

export default GoogleRegister;
