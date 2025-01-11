import React, { useEffect, useRef, useState } from "react";
import styles from "./Comment.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolideStar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import AddComment from "../add-comment/AddComment";
import { getFeedbacks } from "./comments.http";
import { shortNumber } from "@/utils/utils";
import { formatDate } from "@/utils/date.utils";
import { loginNeeded, userDetails } from "@/jotai/atoms";
import { useAtom } from "jotai";
const Comment = ({
  eventId,
  allRatings,
  totalComments,
}: {
  eventId: string;
  allRatings: number;
  totalComments: number;
}) => {
  const [isOpenComment, setOpenComment] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [openLogin, setOpenLogin] = useAtom(loginNeeded);
  const [userDetail, setUserDetail] = useAtom(userDetails);

  const pageRef = useRef<{
    page: number;
    isNextPage: boolean;
    userGivenFeedback: boolean;
  }>({
    page: 1,
    isNextPage: false,
    userGivenFeedback: true,
  });
  const toggleOpenComment = () => {
    if (!userDetail?._id) {
      setOpenLogin(true);
      return;
    }
    setOpenComment(!isOpenComment);
  };

  async function fetchAllComments(page: number) {
    const commentRes = await getFeedbacks({
      id: eventId,
      page,
    });
    if (commentRes && commentRes.statusCode === 200) {
      setComments([...comments, ...commentRes.data.feedbacks]);
      pageRef.current.isNextPage = commentRes.data.isNextPage;
      pageRef.current.userGivenFeedback = commentRes.data?.userGivenFeedback;
    }
  }

  function fetchMoreComments() {
    pageRef.current.page = pageRef.current.page + 1;
    fetchAllComments(pageRef.current.page);
  }

  useEffect(() => {
    fetchAllComments(pageRef.current.page);
    return () => {
      setComments([]);
    };
  }, []);

  if (!comments) return <></>;

  return (
    <div className={styles.stickyComment}>
      <div className={styles.headingWrap}>
        <h3 className="headingOne m-0">Feedback</h3>
        <div className={styles.feedbackCount}>
          <span className={styles.badge}>
            <FontAwesomeIcon icon={faSolideStar}></FontAwesomeIcon>
            {allRatings}
          </span>
          <span className={styles.comment}>
            {shortNumber(totalComments)} Comments
          </span>
        </div>
      </div>
      <div className={styles.commentList}>
        {comments?.map((comment) => (
          <div className={styles.item} key={comment.id}>
            <div className={styles.imgBox}>
              <Image
                src={comment.userId?.profileImage || "/images/profile.png"}
                alt={comment.name}
                className="img-fluid"
                width={45}
                height={45}
              />
              <div>
                <span className={styles.name}>{comment.userId?.name}</span>
                <span className={styles.date}>
                  {formatDate(comment.createdAt)}
                </span>
              </div>
            </div>
            <div className={styles.comment}>
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faSolideStar}
                  className={index < comment.rating ? styles.active : ""}
                />
              ))}
              <span>{comment.rating}</span>
            </div>
            <p>{comment.comment}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <div className={styles.noDiv}>
            <p>No feedbacks</p>
          </div>
        )}
        {pageRef.current.isNextPage && (
          <button
            type="button"
            className={`btnThemeTwo d-block w-100 ${styles.marginTop12}`}
            onClick={fetchMoreComments}
          >
            Load More Review
          </button>
        )}
        {!pageRef.current?.userGivenFeedback && (
          <button
            type="button"
            className={`btnTheme d-block w-100 ${styles.marginTop32}`}
            onClick={toggleOpenComment}
          >
            Write a review
          </button>
        )}
      </div>
      {isOpenComment && (
        <AddComment
          closePopup={toggleOpenComment}
          eventId={eventId}
        ></AddComment>
      )}
    </div>
  );
};

export default Comment;
