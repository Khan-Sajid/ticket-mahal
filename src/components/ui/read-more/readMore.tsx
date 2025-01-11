import { useState } from "react";

interface word {
  text: string;
  wordLimit: number;
}
function ReadMore(props: word) {
  const { text, wordLimit } = props;

  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = (e: any) => {
    e.stopPropagation();
    setIsTruncated(!isTruncated);
  };

  // Split the text into words
  const words = text.split(" ");

  // Check if the text exceeds 15 words
  const shouldTruncate = words.length > wordLimit;

  // Truncate the text if necessary
  const displayedText =
    shouldTruncate && isTruncated
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;

  return (
    <p>
      {displayedText}
      {shouldTruncate && isTruncated && (
        <b
          style={{ cursor: "pointer", marginLeft: "5px" }}
          onClick={toggleTruncate}
        >
          Read More
        </b>
      )}
      {!isTruncated && (
        <b onClick={toggleTruncate} style={{ cursor: "pointer" }}>
          {" "}
          Show Less
        </b>
      )}
    </p>
  );
}

export default ReadMore;
