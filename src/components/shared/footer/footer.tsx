import React from "react";
import styles from "./footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <section className={styles.footerWrapper}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 order-md-1 order-2">
            <Link href="/">
              <Image
                src="/images/footer-logo.svg"
                alt="Example image"
                className={`img-fluid ${styles.logoFooter} w-100`}
                width={100}
                height={100}
              />
            </Link>
            <div className={styles.playStoreWrap}>
              {/* <Link href="/">
                <Image
                  src="/images/app-store-iphone.svg"
                  alt="Play store"
                  className="img-fluid"
                  width={100}
                  height={100}
                />
              </Link>
              <Link href="/">
                <Image
                  src="/images/google-play-store.svg"
                  alt="Play store"
                  className="img-fluid"
                  width={100}
                  height={100}
                />
              </Link> */}
            </div>
            <div className={styles.socialIconWrapper}>
              <p>Follow Us</p>
              <div className="d-flex gap-4">
                <Link href="https://www.youtube.com/">
                  <FontAwesomeIcon icon={faYoutube} />
                </Link>
                <Link href="http://facebook.com">
                  <FontAwesomeIcon icon={faFacebookF} />
                </Link>
                <Link href="https://twitter.com/">
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
                <Link href="https://www.instagram.com/">
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link href="https://in.linkedin.com/">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-8 order-md-2 order-1">
            <div className="row">
              <div className="col-md-4">
                <h4 className={styles.footerHeading}>Helpful Links</h4>
                <ul className={styles.listItemList}>
                  <li>
                    <Link href="/faqs">Help/FAQ</Link>
                  </li>
                  {/* <li>
                    <Link href="/">Sell</Link>
                  </li> */}
                  <li>
                    <Link href="/">My Account</Link>
                  </li>
                  {/* <li>
                    <Link href="/">Gift Cards</Link>
                  </li> */}
                  {/* <li>
                    <Link href="/">Refunds and Exchanges</Link>
                  </li> */}
                </ul>
              </div>
              <div className="col-md-4">
                <h4 className={styles.footerHeading}>Our Network</h4>
                <ul className={styles.listItemList}>
                  <li>
                    <Link href="/">Live Nation</Link>
                  </li>
                  <li>
                    <Link href="/">House of Blues</Link>
                  </li>
                  {/* <li>
                    <Link href="/">Front Gate Tickets</Link>
                  </li>
                  <li>
                    <Link href="/">NFL</Link>
                  </li>
                  <li>
                    <Link href="/">Movies</Link>
                  </li> */}
                </ul>
              </div>
              <div className="col-md-4">
                <h4 className={styles.footerHeading}>Support</h4>
                <ul className={styles.listItemList}>
                  <li>
                    <Link href="/contact-us">Contact Us</Link>
                  </li>
                  {/* <li>
                    <Link href="/">Developers</Link>
                  </li>
                  <li>
                    <Link href="/">Documentation</Link>
                  </li>
                  <li>
                    <Link href="/">Integrations</Link>
                  </li>
                  <li>
                    <Link href="/">Reports</Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={`row ${styles.copyRightRow}`}>
          <div className="col p-0">
            <p className={styles.copyRightString}>
              TicketMahal @ 2024. All rights reserved.
            </p>
          </div>
          <div className="col-auto p-0">
            <ul className={styles.termConditionListing}>
              <li>
                <Link href="/terms-and-conditions">Term</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy </Link>
              </li>
              {/* <li>
                <Link href="/contact-us">Contact</Link>
              </li> */}
              <li>
                <Link href="/">
                  <FontAwesomeIcon icon={faGlobe} />
                  EN
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
