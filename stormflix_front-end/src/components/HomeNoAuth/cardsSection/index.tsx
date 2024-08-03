import { Container } from "reactstrap";
import styles from "./styles.module.scss";

const CardsSection = () => {
  return (
    <>
      <p className={styles.sectionTitle}>O QUE VOCÊ VAI ACESSAR</p>
      <Container className="d-flex flex-wrap justify-content-center gap-4 pb-5">
        <div className={styles.card1}>
          <p className={styles.cardTitle}>DESENHOS</p>
        </div>
        <div className={styles.card2}>
          <p className={styles.cardTitle}>FILMES</p>
        </div>
        <div className={styles.card3}>
          <p className={styles.cardTitle}>SERÍES</p>
        </div>
      </Container>
    </>
  );
};
export default CardsSection;
