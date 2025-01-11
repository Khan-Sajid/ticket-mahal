import React, { useState, useRef, useEffect } from "react";
import styles from "./countryCode.module.scss"; // Assuming you're using the provided CSS

interface ICountry {
  id: number; // Added id property
  name: string;
  code: string;
  flag: string;
}

interface IDropDownFlagProps {
  defaultValue: number; // Default value is an ID now
  countries: ICountry[];
  onChange: (selectedCode: string) => void; // Callback when an option is selected
}

const CountryCodeDropDown: React.FC<IDropDownFlagProps> = ({
  defaultValue,
  countries,
  onChange,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOptionId, setSelectedOptionId] =
    useState<number>(defaultValue);
  const [searchTerm, setSearchTerm] = useState<string>(""); // New state for search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(""); // New state for debounced search term
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust the delay as needed (300ms in this case)

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Filtered countries based on debounced search term
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) // Filter by code as well
  );

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  // Handle option selection
  const handleOptionClick = (id: number, countryCode: string) => {
    setSelectedOptionId(id); // Set the selected ID
    onChange(countryCode); // Notify parent component with the country code
    setIsActive(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Function to highlight search term in text
  const highlightText = (text: string) => {
    const regex = new RegExp(`(${debouncedSearchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === debouncedSearchTerm.toLowerCase() ? (
        <span key={index} className={styles.highlight}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className={`${styles.wrapperDropdown} ${isActive ? styles.active : ""}`}
      ref={dropdownRef}
    >
      <span onClick={toggleDropdown}>
        {countries.find((country) => country.id === selectedOptionId)?.flag}{" "}
        {countries.find((country) => country.id === selectedOptionId)?.code}
      </span>

      {isActive && (
        <div className={styles.dropdownContainer}>
          <ul className={styles.dropdown}>
            <input
              type="text"
              placeholder="Search country"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            {filteredCountries.map((country) => (
              <li
                key={country.id} // Use id as the key
                onClick={() => handleOptionClick(country.id, country.code)} // Pass id and code
              >
                {country.flag} {highlightText(country.name)} (
                {highlightText(country.code)})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountryCodeDropDown;
