import styles from "../../../../styles/slideCategory.module.scss";

import useSWR from "swr";
import courseService from "@/src/services/courseService";
import SlideComponent from "../../common/slideComponent";
import PageSpinner from "../../common/spinner";
import { useEffect } from "react";

// Todos os cursos em lançamentos, mesmo da index.tsx
const NewestCategory = () => {
  const { data, error } = useSWR("/newest", courseService.getNewestCourses);

  if (error) return error;
  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      <p className={styles.titleCategory}>LANÇAMENTOS</p>
      <SlideComponent course={data.data} />
    </>
  );
};
export default NewestCategory;
