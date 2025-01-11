import React from "react";
import styles from "./contactInfoWithMap.module.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquareFacebook,
  faSquareInstagram,
  faSquareThreads,
  faSquareYoutube,
  faTiktok,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const fields = {
  heading: "Contact Information",
  desc: "Say something to start a live chat!",
  phone: "45674365743",
  email: "example.com",
  address: "lorem Ipsum dolor sit amet, consectetur adipiscing elit",
  socialLinks: [
    {
      name: "faceBook",
      link: "https://facebook.com",
      logoIcon: faSquareFacebook,
    },
    {
      name: "instagram",
      link: "https://instagram.com",
      logoIcon: faSquareInstagram,
    },
    {
      name: "faceBook",
      link: "https://twitter.com",
      logoIcon: faXTwitter,
    },
  ],
};

const ContactInfoWithMap = () => {
  return (
    <section className={styles.contentContainer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.contactContainer}>
            <div className={styles.bg}></div>
            <div>
              <h3 className={classNames(styles.heading, "rem3")}>
                {fields.heading}
              </h3>
              <p className="rem2">{fields.desc}</p>
            </div>
            <div className={styles.contactUs}>
              <p className="rem2">
                <FontAwesomeIcon icon={faPhoneVolume} />
                <a href={`tel:${fields.phone}`}>{fields.phone}</a>
              </p>
              <p className="rem2">
                <FontAwesomeIcon icon={faEnvelope} />
                <a href={`mailto:${fields.email}`}>{fields.email}</a>
              </p>
              <p className="rem2">
                <FontAwesomeIcon icon={faLocationDot} />
                {fields.address}
              </p>
            </div>
            <div className={styles.socialIcons}>
              {fields?.socialLinks?.map((socialLink) => (
                <span key={socialLink.name}>
                  <a href={socialLink.link} target="_blank">
                    <FontAwesomeIcon icon={socialLink.logoIcon as any} />
                  </a>
                </span>
              ))}
            </div>
          </div>
          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.6562088135793!2d55.191406275507575!3d25.113496435085732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6bbd5de50327%3A0xcb8cc5fff0ed38f2!2sAl%20Barsha%20Business%20Centre%20-%20Al%20Barsha%20-%20Al%20Barsha%201%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1725034715443!5m2!1sen!2sin"
              // width="400"
              // height="300"
              style={{ border: "0" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoWithMap;
