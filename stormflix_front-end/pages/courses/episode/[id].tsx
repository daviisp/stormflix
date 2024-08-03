import styles from "../../../styles/episodePlayer.module.scss";

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import HeaderGeneric from "../../../src/components/common/headerGeneric";
import courseService, { CourseType } from "../../../src/services/courseService";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";

import PageSpinner from "@/src/components/common/spinner";
import episodeService from "@/src/services/episodeService";

const EpisodePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<CourseType>();
  const episodeOrder = parseFloat(router.query.id?.toString() || "");
  const courseId = router.query.courseid?.toString() || "";
  const episodeId = parseFloat(router.query.episodeid?.toString() || "");

  const [getEpisodeTime, setGetEpisodeTime] = useState(0);
  const [episodeTime, setEpisodeTime] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const playerRef = useRef<ReactPlayer>(null);

  const handleGetEpisodeTime = async () => {
    const res = await episodeService.getWatchTime(episodeId);
    console.log(res);

    if (res.data !== null) {
      setGetEpisodeTime(res.data.seconds);
    }
  };

  const handleSetEpisodeTime = async () => {
    await episodeService.setWatchTime({
      episodeId,
      seconds: Math.round(episodeTime),
    });
  };

  useEffect(() => {
    handleGetEpisodeTime();
  }, [router]);

  const handlePlayerTime = () => {
    playerRef.current?.seekTo(getEpisodeTime);
    setIsReady(true);
  };

  if (isReady) {
    setTimeout(() => {
      handleSetEpisodeTime();
    }, 1000 * 3);
  }

  const getCourse = async () => {
    if (typeof courseId !== "string") return;
    const res = await courseService.getEpisodes(courseId);

    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  const handleLastEpisode = () => {
    router.push(
      `/courses/episode/${episodeOrder - 1}?courseid=${courseId}&episodeid=${
        episodeId - 1
      }`
    );
  };

  const handleNextEpisode = () => {
    router.push(
      `/courses/episode/${episodeOrder + 1}?courseid=${courseId}&episodeid=${
        episodeId + 1
      }`
    );
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  useEffect(() => {
    if (!sessionStorage.getItem("stormflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (course?.episodes === undefined) return <PageSpinner />;

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>Onebtiflix - {course?.episodes?.[episodeOrder].name}</title>
      </Head>

      <main>
        <HeaderGeneric
          logoUrl="/home"
          btnContent={"Voltar para o curso"}
          btnUrl={`/courses/${courseId}`}
        />
        <Container className="d-flex flex-column align-items-center gap-3 pt-5">
          <p className={styles.episodeTitle}>
            {course?.episodes?.[episodeOrder].name}
          </p>
          {typeof window === "undefined" ? null : (
            <ReactPlayer
              className={styles.player}
              url={`${
                process.env.NEXT_PUBLIC_BASEURL
              }/episodes/stream?videoUrl=${
                course?.episodes?.[episodeOrder].videoUrl
              }&token=${sessionStorage.getItem("stormflix-token")}`}
              controls
              ref={playerRef}
              onStart={handlePlayerTime}
              onProgress={(progress) => {
                setEpisodeTime(progress.playedSeconds);
              }}
            />
          )}
          <div className={styles.episodeButtonDiv}>
            <Button
              className={styles.episodeButton}
              disabled={episodeOrder === 0 ? true : false}
              onClick={handleLastEpisode}
            >
              <img
                src="/episode/iconArrowLeft.svg"
                alt="Seta para esquerda"
                className={styles.arrowImg}
              />
            </Button>
            <Button
              className={styles.episodeButton}
              disabled={
                episodeOrder + 1 === course?.episodes?.length ? true : false
              }
              onClick={handleNextEpisode}
            >
              <img
                src="/episode/iconArrowRight.svg"
                alt="Seta para direita"
                className={styles.arrowImg}
              />
            </Button>
          </div>
          <p className="text-center py-4">
            {course?.episodes?.[episodeOrder].synopsis}
          </p>
        </Container>
      </main>
    </>
  );
};
export default EpisodePage;
