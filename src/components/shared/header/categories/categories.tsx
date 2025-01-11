import React from "react";
import styles from "./categories.module.scss";
import Link from "next/link";
import { CategoriesProps } from "@/types/categories";
import { Category } from "@/interfaces/categories";
import { EventType } from "@/utils/enums";
import { useSearchParams } from "next/navigation";

const CategoriesNav: React.FC<CategoriesProps> = ({
  categories,
}: {
  categories: Category[];
}) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("categoty_id");
  return (
    <div className="row">
      <div className={`col-md-12 ${styles.secondNav}`}>
        <ul>
          {categories.map((categery) => (
            <li key={categery._id}>
              <Link
                href={`/view-all-events/${EventType.UPCOMMING}?categoty_id=${categery._id}`}
                className={`${
                  categery._id.toString() === category ? styles.active : ""
                }`}
              >
                {categery.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesNav;
