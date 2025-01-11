import styles from "./shimmer.module.scss";

interface ShimmerProps {
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  className?: string;
}
//<Shimmer style={{ width: '120px', height: '14px', marginBottom: '4px' }} />
//<Shimmer width="150px" height="24px" />
//<Shimmer className="small" />
const Shimmer: React.FC<ShimmerProps> = ({
  width = "100%",
  height = "20px",
  style = {},
  className = "",
}) => {
  return (
    <div
      className={`${styles.shimmer} ${styles[className]}`}
      style={{ width, height, ...style }}
    ></div>
  );
};

export default Shimmer;
