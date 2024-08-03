import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import courseService from "@/src/services/courseService";
import SlideComponent from "../../common/slideComponent";
import PageSpinner from "../../common/spinner";

// Lista de favoritos
const FavoriteCategory = () => {
  const { data, error } = useSWR("/favorites", courseService.getFav);

  if (error) return error;
  if (!data) {
    return (
      <>
        <PageSpinner />
      </>
    );
  }

  return (
    <>
      <p className={styles.titleCategory}>MINHA LISTA</p>
      {data.data.courses.length >= 1 ? (
        <SlideComponent course={data.data.courses} />
      ) : (
        <p className="text-center pt-3">
          <strong>Você não tem nenhum curso na lista de favoritos</strong>
        </p>
      )}
    </>
  );
};
export default FavoriteCategory;
