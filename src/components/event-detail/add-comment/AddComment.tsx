import React, { useState } from "react";
import styles from "./AddComment.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "@/components/ui/custom-modal/customModal";
import { faStar as faSolideStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { giveFeedback } from "../comment/comments.http";

const AddComment = ({ closePopup, eventId }: any) => {
  const [rating, setRating] = useState(0);
  const handleRating = (index: any) => {
    setRating(index);
  };

  const [comment, setComment] = useState("");
  const [fieldForm, submitForm] = useState(true);

  const toggleForm = async () => {
    const feedbackResponse = await giveFeedback({
      eventId,
      comment,
      rating,
    });
    if (feedbackResponse.statusCode === 201) submitForm(!fieldForm);
    else console.error(feedbackResponse);
  };

  return (
    <CustomModal>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeading}>
          <span className={styles.crossIcon} onClick={closePopup}>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </span>
        </div>
        {fieldForm ? (
          <div className={`${styles.commentWrap} row`}>
            <div className="col-md-12">
              <h4>Rate this event</h4>
              <div className={styles.ratingWrap}>
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    onClick={() => handleRating(index + 1)}
                    className={styles.Icon}
                  >
                    <FontAwesomeIcon
                      icon={index < rating ? faSolideStar : faRegularStar}
                      className={index < rating ? `${styles.active}` : ""}
                    />
                  </span>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className={styles.formControl}
                placeholder="Please give review"
                cols={5}
              />
              <button
                disabled={!rating || !comment}
                type="button"
                className="btnTheme"
                onClick={toggleForm}
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className={`${styles.successWrap} col-md-12`}>
              <Image
                src="/images/success.jpg"
                alt="success"
                className="img-fluid"
                width={60}
                height={60}
              />
              <h3>Thanks for your feedback!</h3>
              <p>Your appreciation motivate us to provide better quality. </p>
            </div>
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default AddComment;
