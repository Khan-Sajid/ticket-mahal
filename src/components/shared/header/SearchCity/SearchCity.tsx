import React, { useEffect, useState } from "react";
import styles from "./SearchCity.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import CustomModal from "@/components/ui/custom-modal/customModal";
import SearchCityListing from "./city-listing/CityListing";
import { getAllCities } from "../header.http";

const SearchCity = ({ closePopup }: any) => {
  const [cityList, setCityList] = useState([]);
  const [location, setLocation] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  async function fetchAllCities() {
    const res = await getAllCities();
    if (res && res.statusCode === 200) {
      setCityList(res.data);
    }
  }

  const handleGetLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log("Geolocation", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoadingLocation(false);
          setError(null); // Clear previous errors, if any
        },
        (err) => {
          setError(err.message);
          setLoadingLocation(false);
        }
      );
    } else {
      setLoadingLocation(false);

      setError("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    fetchAllCities();
  }, []);

  return (
    <CustomModal>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeading}>
          <h4>Select Your City</h4>
          <span className={styles.crossIcon} onClick={closePopup}>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </span>
        </div>
        <div className={styles.citySearchBox}>
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          <input
            type="text"
            name="search"
            placeholder="Type your city or Pincode"
          />
        </div>
        <button
          type="button"
          className={`btn-simple ${styles.btnLocation}`}
          onClick={handleGetLocation}
        >
          <FontAwesomeIcon icon={faLocationCrosshairs}></FontAwesomeIcon>
          {loadingLocation ? "Detecting Location..." : "Detect my location"}
        </button>
        <SearchCityListing
          cityList={cityList}
          closePopup={closePopup}
        ></SearchCityListing>
      </div>
    </CustomModal>
  );
};

export default SearchCity;
