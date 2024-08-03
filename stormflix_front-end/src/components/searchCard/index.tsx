import { CourseType } from "@/src/services/courseService";
import styles from "./style.module.scss";
import Link from "next/link";

interface Props {
  course: CourseType;
}

const SearchCard = ({ course }: Props) => {
  return (
    <>
      <Link
        href={`/courses/${course.id}`}
        style={{ textDecoration: "none", color: "#fff" }}
      >
        <div className={styles.searchCard}>
          <img
            src={`${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}`}
            alt={course.name}
            className={styles.searchCardImg}
          />
          <p className={styles.searchCardTitle}>{course.name}</p>
          <p className={styles.searchCardDescription}>{course.synopsis}</p>
        </div>
      </Link>
    </>
  );
};
export default SearchCard;
