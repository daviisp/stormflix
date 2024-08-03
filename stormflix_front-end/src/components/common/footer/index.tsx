import { Container } from "reactstrap";
import styles from "./styles.module.scss";

// Pode ser usado em qualquer pag que quiser ter um footer

const Footer = () => {
  return (
    <>
      <Container className={styles.footer}>
        <h1>StormFlix</h1>
        <a href="#" target="blank" className={styles.footerLink}>
          STORMFLIX
        </a>
      </Container>
    </>
  );
};
export default Footer;
