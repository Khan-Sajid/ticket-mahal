import React from "react";
import styles from "./GoogleSignUp.module.scss";
import Link from "next/link";
import Image from "next/image";

const GoogleSignUp = () => {
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
            className="img-fluid"
            alt="google-logo"
          />
          <p>Login with Google</p>
        </Link>
        <Link href="">
          <Image
            src="/images/microsoft-logo.svg"
            width={20}
            height={20}
            className="img-fluid"
            alt="microsoft-logo"
          />
          <p>Login with Google</p>
        </Link>
      </div>
    </div>
  );
};

export default GoogleSignUp;
