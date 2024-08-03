import categoryService from "@/src/services/categoryService";
import useSWR from "swr";
import SlideComponent from "../../common/slideComponent";
import styles from "../../../../styles/slideCategory.module.scss";
import PageSpinner from "../../common/spinner";

interface Props {
  categoryId: number;
  categoryName: string;
}

const ListCategoriesSlide = ({ categoryId, categoryName }: Props) => {
  const { data, error } = useSWR(
    `/categories/${categoryId}`,
    () => categoryService.getCourses(categoryId) // Dentro de cada category tem os cursos
  );

  if (error) return error;

  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      <p className={styles.titleCategory}>{categoryName}</p>
      <SlideComponent course={data?.data.courses} />
    </>
  );
};
export default ListCategoriesSlide;
