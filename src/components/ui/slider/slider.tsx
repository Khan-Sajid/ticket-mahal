import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import styles from "./slider.module.scss";

const SliderUI = ({
  children,
  nextButtonClassName = "",
  prevButtonClassName = "",
  onNextButton,
  onPrevButton,
}: {
  children: React.ReactNode;
  nextButtonClassName?: string;
  prevButtonClassName?: string;
  onNextButton?: () => void;
  onPrevButton?: () => void;
}) => {
  const sliderRef = useRef<Slider>(null);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: false, // Disable infinite scrolling
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1, // Auto-slide one item at a time
    autoplay: true,
    autoplaySpeed: 1000, // Auto-slide every 3 seconds
    afterChange: (index: number) => setCurrentIndex(index), // Track the current slide index
    nextArrow: (
      <SampleNextArrow
        className={nextButtonClassName}
        disabled={isNextDisabled}
        onNextButton={() => {
          if (sliderRef.current) {
            // Scroll 4 items when clicking next
            sliderRef.current.slickGoTo(currentIndex + 4);
          }
          if (onNextButton) onNextButton();
        }}
      />
    ),
    prevArrow: (
      <SamplePrevArrow
        className={prevButtonClassName}
        disabled={isPrevDisabled}
        onPrevButton={() => {
          if (sliderRef.current) {
            // Scroll 4 items when clicking prev
            sliderRef.current.slickGoTo(currentIndex - 4);
          }
          if (onPrevButton) onPrevButton();
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 2160,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  useEffect(() => {
    const totalSlides = React.Children.count(children);
    const totalPages = totalSlides - 4;

    setIsPrevDisabled(currentIndex === 0);
    setIsNextDisabled(currentIndex >= totalPages);
  }, [currentIndex, children]);

  return (
    <Slider ref={sliderRef} {...settings}>
      {children}
    </Slider>
  );
};

export default SliderUI;

function SampleNextArrow({
  className,
  onNextButton,
  disabled,
}: {
  className: string;
  onNextButton?: () => void;
  disabled: boolean;
}) {
  return (
    <div
      className={`${className} ${disabled ? styles.disabled : ""}`}
      onClick={!disabled ? onNextButton : undefined}
    >
      <FontAwesomeIcon icon={faAngleRight} />
    </div>
  );
}

function SamplePrevArrow({
  className,
  onPrevButton,
  disabled,
}: {
  className: string;
  onPrevButton?: () => void;
  disabled: boolean;
}) {
  return (
    <div
      className={`${className} ${disabled ? styles.disabled : ""}`}
      onClick={!disabled ? onPrevButton : undefined}
    >
      <FontAwesomeIcon icon={faAngleLeft} />
    </div>
  );
}
