import Head from "next/head";
import styles from "../../styles/search.module.scss";
import HeaderAuth from "@/src/components/common/headerAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import courseService, { CourseType } from "@/src/services/courseService";
import { Container } from "reactstrap";
import SearchCard from "@/src/components/searchCard";
import Footer from "@/src/components/common/footer";
import PageSpinner from "@/src/components/common/spinner";

const Search = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchName: any = router.query.name;

  const [searchResult, setSearchResult] = useState<CourseType[]>([]);

  const searchCourses = async () => {
    if (typeof searchName === "string") {
      const res = await courseService.getSearch(searchName);

      setSearchResult(res.data.courses);
    }
  };

  useEffect(() => {
    searchCourses();
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("stormflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>StormFlix - {searchName}</title>
      </Head>
      <main className={styles.main}>
        <HeaderAuth />
        {searchResult.length >= 1 ? (
          <div className={styles.searchResult}>
            <Container className="d-flex flex-wrap justify-content-center gap-5 p-4">
              {searchResult?.map((course) => (
                <SearchCard key={course.id} course={course} />
              ))}
            </Container>
          </div>
        ) : (
          <p className={styles.noSearchText}>Nenhum resultado encontrado!</p>
        )}
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
};
export default Search;
