import React from "react";
import styles from "./ImageGallery.module.scss";
import Image from "next/image";
const ImageSection = (props: any) => {
  const { eventName, images } = props;
  const s3Url = process.env.NEXT_PUBLIC_S3_URL;

  if (!images.length) return <></>;

  return (
    <div className={`row ${styles.imageGallarySec}`}>
      <div className="col-lg-6">
        <div className={styles.imageGalleryItem}>
          <Image
            src={s3Url + images[0]}
            alt={eventName}
            className="img-fluid"
            width="300"
            height="300"
          />
        </div>
      </div>
      <div className="col-lg-6">
        <div className={styles.wraperGallery}>
          {images.map((data: string) => (
            <div className={styles.item} key={data}>
              <Image
                src={s3Url + data}
                alt={eventName}
                className="img-fluid"
                width="300"
                height="300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSection;
