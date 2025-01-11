"use client";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styles from "./termsContent.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const TermsContent = ({
  content,
  accordian = false,
}: {
  content: any;
  accordian?: boolean;
}) => {
  const arr = new Array(content.cmsList.length).fill(false);
  const [accordionState, setAccordionState] = useState(arr);

  function toggleAccordion(index: number) {
    if (!accordian) return;
    const updatedAcoordion = JSON.parse(JSON.stringify(accordionState));
    updatedAcoordion[index] = !accordionState[index];
    setAccordionState(updatedAcoordion);
  }

  useEffect(() => {
    toggleAccordion(0);
  }, []);

  return (
    <section className={classNames(styles.contentContainer)}>
      <div className="container">
        {content?.title && <h3>{content.title}</h3>}
        {content?.des && (
          <div dangerouslySetInnerHTML={{ __html: content.des }}></div>
        )}
        {content?.cmsList?.map((item: any, index: number) => (
          <div className={styles.items} key={item?._id}>
            <div
              className={classNames(styles.title, {
                [styles.pointer]: accordian,
              })}
              onClick={() => toggleAccordion(index)}
            >
              <h5>{item?.header}</h5>
              {accordian && (
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className={classNames({
                    [styles.rotate]: accordionState[index],
                  })}
                />
              )}
            </div>
            {(!!accordionState[index] || !accordian) && (
              <div dangerouslySetInnerHTML={{ __html: item?.desc }}></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TermsContent;
