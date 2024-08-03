import categoryService, { CategoryType } from "@/src/services/categoryService";
import useSWR from "swr";
import ListCategoriesSlide from "../listCategoriesSlide";
import PageSpinner from "../../common/spinner";

const ListCategories = () => {
  const { data, error } = useSWR("/categories", categoryService.getCategories);

  if (error) return error;
  if (!data) {
    return (
      <>
        <PageSpinner />
      </>
    );
  }

  console.log(data);
  return (
    <>
      {data.data.categories?.map((category: CategoryType) => (
        <ListCategoriesSlide
          key={category.id}
          categoryId={category.id}
          categoryName={category.name}
        />
      ))}
    </>
  );
};
export default ListCategories;
