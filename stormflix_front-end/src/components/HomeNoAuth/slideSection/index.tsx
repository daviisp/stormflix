import styles from "./styles.module.scss";

import { CourseType } from "../../../services/courseService";
import { Button, Container } from "reactstrap";
import SlideComponent from "../../common/slideComponent";
import Link from "next/link";

interface Props {
  newestCourses: CourseType[];
}

const SlideSection = ({ newestCourses }: Props) => {
  return (
    <Container className="d-flex flex-column align-items-center py-5">
      <p className={styles.sectionTitle}>AULAS JÁ DISPONÍVEIS</p>
      <SlideComponent course={newestCourses} />
      <Link href="/register">
        <Button outline color="light" className={styles.slideSectionBtn}>
          Se cadastre para acessar
        </Button>
      </Link>
    </Container>
  );
};
export default SlideSection;
