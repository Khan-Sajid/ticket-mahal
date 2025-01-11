import React from "react";
import styles from "./Video.module.scss";
const VideoSection = (props: any) => {
  const { key, eventName, videoUrl } = props;
  const s3Url = process.env.NEXT_PUBLIC_S3_URL;
  return (
    <div className={`${styles.videoWrapper}`}>
      <video controls autoPlay muted>
        <source src={s3Url + videoUrl} type="video/mp4" />
        <source src={s3Url + videoUrl} type="video/ogg" />
      </video>
    </div>
  );
};

export default VideoSection;
