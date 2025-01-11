import React, { useEffect, useRef, useState } from "react";
import styles from "./SearchPost.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchPostMweb from "./SearchPostMweb/SearchPostMweb";
import { useDebounce } from "@/customHooks/useDebounce";
import { getSearchHistory } from "./searchPosts.http";
import Link from "next/link";
import { toKebabCase } from "@/utils/utils";
import { getSearchEvents } from "@/components/search-event/searchEvent.http";
import { Event } from "@/interfaces";
import { useRouter } from "next/navigation";

const SearchPost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchPostRef = useRef<HTMLDivElement | null>(null);
  const [searchInput, setsearchInput] = useState("");
  const searchValue = useDebounce(searchInput, 300);
  const [searchHistory, setSearchHistory] = useState({});
  const [searchResults, setSearchResults] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<any>();
  const router = useRouter();

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  function handleInputChange(e: any) {
    const search = e.target.value;
    setsearchInput(search);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchPostRef.current &&
      !searchPostRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  async function fetchSearchHistory() {
    const res = await getSearchHistory();
    if (res && res.statusCode === 200) {
      setSearchHistory(res.data);
    }
  }

  async function fetchSearchResults() {
    setIsLoading(true);
    const res = await getSearchEvents({ search: searchValue });
    if (res && res.statusCode === 200) {
      setSearchResults(res.data);
    }
    setIsLoading(false);
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && event.target.value) {
      clearSearch();
      router.push(`/search-event/${event.target.value}`);
    }
  };

  function clearSearch() {
    setsearchInput("");
    inputRef.current.blur();
    setIsOpen(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    fetchSearchHistory();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    searchValue.length && fetchSearchResults();
  }, [searchValue]);

  const [openSearchPostPopup, setSearchPostPopup] = useState(false);
  const toggleSearchPostPopup = () => {
    setSearchPostPopup(!openSearchPostPopup);
  };

  return (
    <>
      <section className={styles.searchMainWrap} ref={searchPostRef}>
        <div className={`d-none d-md-block ${styles.searchBox}`}>
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          <input
            type="text"
            name="search"
            ref={inputRef}
            placeholder="Search for Movies, Events, Plays, Sports and Activities"
            autoComplete="off"
            onClick={toggleList}
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={`${styles.SearchList} ${isOpen ? styles.open : ""}`}>
          {searchValue ? (
            <>
              {!!searchResults.length ? (
                <div className={styles.searchPostItem}>
                  <ul>
                    {searchResults.map?.((item: any) => (
                      <Link
                        href={`/event-detail/${toKebabCase(item.eventName)}/${
                          item._id
                        }`}
                        key={item._id}
                        className={styles.info}
                        onClick={clearSearch}
                      >
                        <li>
                          <FontAwesomeIcon
                            icon={faArrowTrendUp}
                          ></FontAwesomeIcon>
                          {item.eventName}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  <div className={styles.searchPostItem}>
                    <ul>
                      {!isLoading ? (
                        <li>No Items Found.</li>
                      ) : (
                        <li>Loading...</li>
                      )}
                    </ul>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {Object.keys(searchHistory).map((category) => {
                if (
                  (searchHistory[category as keyof typeof searchHistory] as any)
                    .length
                )
                  return (
                    <div key={category} className={styles.searchPostItem}>
                      <h2>{category}</h2>
                      <ul>
                        {(
                          searchHistory[
                            category as keyof typeof searchHistory
                          ] as any
                        )?.map?.((item: any, index: number) => (
                          <Link
                            href={
                              item._id
                                ? `/event-detail/${toKebabCase(
                                    item.eventName
                                  )}/${item._id}`
                                : `/search-event/${item}`
                            }
                            key={item._id || item}
                            className={styles.info}
                            onClick={clearSearch}
                          >
                            <li>
                              <FontAwesomeIcon
                                icon={faArrowTrendUp}
                              ></FontAwesomeIcon>
                              {item.eventName || item}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  );
              })}
            </>
          )}
        </div>
        <div className={`d-block d-md-none ${styles.searchBox}`}>
          <FontAwesomeIcon
            icon={faSearch}
            onClick={toggleSearchPostPopup}
          ></FontAwesomeIcon>
        </div>
      </section>
      {/* forMobile  */}
      {openSearchPostPopup && (
        <SearchPostMweb
          closePopup={toggleSearchPostPopup}
          searchHistory={searchHistory}
        ></SearchPostMweb>
      )}
    </>
  );
};

export default SearchPost;
