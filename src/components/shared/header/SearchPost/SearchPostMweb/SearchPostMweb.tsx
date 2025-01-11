import React from "react";
import styles from "./SearchPostMweb.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import CustomModal from "@/components/ui/custom-modal/customModal";
import { SearchPostList } from "@/app/data/home";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toKebabCase } from "@/utils/utils";

const SearchPostMweb = ({ closePopup, searchHistory }: any) => {
  const router = useRouter();
  return (
    <CustomModal>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeading}>
          <h4>Search Post</h4>
          <span className={styles.crossIcon} onClick={closePopup}>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </span>
        </div>
        <div className={styles.citySearchBox}>
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          <input type="text" name="search" placeholder="Type your event name" />
        </div>
        <div className={`${styles.SearchList}`}>
          {Object.keys(searchHistory).map((category) => {
            if (
              (searchHistory[category as keyof typeof searchHistory] as any)
                .length
            )
              return (
                <div key={category} className={styles.searchPostItem}>
                  <h2>{category}</h2>
                  <ul>
                    {searchHistory[category as keyof typeof searchHistory].map(
                      (item: any, index: number) => (
                        <Link
                          href={`/event-detail/${toKebabCase(item.eventName)}/${
                            item._id
                          }`}
                          className={styles.info}
                          key={item._id}
                        >
                          <li>
                            <FontAwesomeIcon
                              icon={faArrowTrendUp}
                            ></FontAwesomeIcon>
                            {item.eventName}
                          </li>
                        </Link>
                      )
                    )}
                  </ul>
                </div>
              );
          })}
        </div>
      </div>
    </CustomModal>
  );
};

export default SearchPostMweb;
