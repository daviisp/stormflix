import { CourseType, EpisodeType } from "@/src/services/courseService";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface Props {
  episode: EpisodeType;
  course: CourseType;
}

const EpisodeList = ({ episode, course }: Props) => {
  const router = useRouter();

  const handleEpisodePlayer = () => {
    router.push(
      `/courses/episode/${episode.order - 1}?courseid=${course.id}&episodeid=${
        episode.id
      }`
    );
  };

  console.log(course?.episodes);

  return (
    <>
      <div className={styles.episodeCard} onClick={handleEpisodePlayer}>
        <div className={styles.episodeOrderTime}>
          <p className={styles.episodeOrder}>Episódio N {episode.order}</p>
          <p className={styles.episodeTime}>{episode.secondsLong}</p>
        </div>
        <div className={styles.episodeTitleDescription}>
          <p className={styles.episodeTitle}>{episode.name}</p>
          <p className={styles.episodeDescription}>{episode.synopsis}</p>
        </div>
      </div>
    </>
  );
};
export default EpisodeList;
