import styles from "../../styles/course.module.scss";
import HeaderAuth from "@/src/components/common/headerAuth";
import PageSpinner from "@/src/components/common/spinner";
import EpisodeList from "@/src/components/episodeList";
import courseService, { CourseType } from "@/src/services/courseService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";

const CoursePage = () => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<CourseType>();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const getCourse = async () => {
    if (typeof id !== "string") return;

    const res = await courseService.getEpisodes(id);

    if (res.status === 200) {
      setCourse(res.data);
      setLiked(res.data.liked);
      setFavorited(res.data.favorited);
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  const handleLiked = async () => {
    if (typeof id !== "string") return;
    if (liked === true) {
      await courseService.removeLike(id);
      setLiked(false);
    } else {
      await courseService.like(id);
      setLiked(true);
    }
  };

  const handleFavorited = async () => {
    if (typeof id !== "string") return;

    if (favorited === true) {
      await courseService.removeFav(id);
      setFavorited(false);
    } else {
      await courseService.addToFav(id);
      setFavorited(true);
    }
  };
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

  if (course === undefined) {
    <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>StormFlix - {course?.name}</title>
      </Head>
      <main>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,

            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "550px",
          }}
        >
          {" "}
          <HeaderAuth />
        </div>
        <Container className={styles.courseInfo}>
          <p className={styles.courseTitle}>{course?.name}</p>
          <p className={styles.courseDescription}>{course?.synopsis}</p>
          <Button
            outline
            className={styles.courseBtn}
            disabled={course?.episodes?.length === 0 ? true : false}
          >
            ASSISTIR AGORA
            <img
              src="/buttonPlay.svg"
              alt="Imagem do Botão"
              className={styles.buttonImg}
            />
          </Button>
          <div className={styles.interactions}>
            {liked === false ? (
              <img
                src="/course/iconLike.svg"
                alt="Imagem de Like"
                className={styles.interactionImages}
                onClick={handleLiked}
              />
            ) : (
              <img
                src="/course/iconLiked.svg"
                alt="Imagem de Like"
                className={styles.interactionImages}
                onClick={handleLiked}
              />
            )}
            {favorited === false ? (
              <img
                src="/course/iconAddFav.svg"
                alt="Imagem de Favorito"
                className={styles.interactionImages}
                onClick={handleFavorited}
              />
            ) : (
              <img
                src="/course/iconFavorited.svg"
                alt="Imagem de Favorito"
                className={styles.interactionImages}
                onClick={handleFavorited}
              />
            )}
          </div>
        </Container>
        <Container className={styles.episodeInfo}>
          <p className={styles.episodeDivision}>EPISÓDIOS</p>
          <p className={styles.episodeLength}>
            {course?.episodes?.length} episódios
          </p>
          {course?.episodes?.length === 0 ? (
            <p>
              <strong>
                Não temos episódios ainda, volte outra hora! &#x1F606;&#x1F918;
              </strong>
            </p>
          ) : (
            course?.episodes?.map((episode) => (
              <EpisodeList key={episode.id} episode={episode} course={course} />
            ))
          )}
        </Container>
      </main>
    </>
  );
};
export default CoursePage;
