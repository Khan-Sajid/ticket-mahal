import React from "react";
import styles from "./CityListing.module.scss";
import Image from "next/image";
import { useAtom } from "jotai";
import { userPrefferedLocation } from "@/jotai/atoms";
import { ICity, PreferredLocation } from "@/types/common";
import { PREFERRED_LOCATION } from "@/utils/constants";
import { setLocalStorage } from "@/utils/storage.utils";

const SearchCityListing = ({
  closePopup,
  cityList,
}: {
  closePopup: () => void;
  cityList: ICity[];
}) => {
  const [prefferedLocation, setPrefferedLocation] = useAtom(
    userPrefferedLocation
  );
  const s3Url = process.env.NEXT_PUBLIC_S3_URL;

  function selectCity(cityDetail: ICity) {
    setLocalStorage<PreferredLocation>(PREFERRED_LOCATION, {
      ...prefferedLocation,
      city: cityDetail,
    });
    setPrefferedLocation({ ...prefferedLocation, city: cityDetail });
    closePopup();
  }

  return (
    <div className={styles.imageCityWrapper}>
      <div className={styles.imageCityListing}>
        {cityList.slice(0, 10)?.map((item: ICity) => (
          <div
            className={styles.imageBox}
            key={item._id}
            onClick={() => selectCity(item)}
          >
            <Image
              src={s3Url + item.image}
              alt={item.name}
              className="img-fluid"
              width={100}
              height={100}
            />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
      <div>
        <h4 className={styles.cityListingHeading}>All Cities</h4>
        <ul className={styles.cityListing}>
          {cityList.map((item: ICity) => (
            <li onClick={() => selectCity(item)} key={item._id}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchCityListing;
