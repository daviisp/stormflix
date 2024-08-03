import styles from "./styles.module.scss";

import { Container, Row, Col, Button } from "reactstrap";
import Link from "next/link";

const PresentationSection = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col className="d-flex flex-column justify-content-center align-items-start">
          <p className={styles.subTitle}>ACESSO ILIMITADO</p>
          <p className={styles.title}>
            Tenha acesso aos melhores <br /> filmes e séries da atualidade.
          </p>
          <p className={styles.description}>
            Veja onde e quando quiser e tenha acesso aos filmes <br />
            mais recentes lançados.
          </p>
          <Link href="/register" style={{ textDecoration: "none" }}>
            <Button className={styles.btnCta} outline>
              ACESSE AGORA
              <img
                className={styles.btnImg}
                src="/buttonPlay.svg"
                alt="Imagem do botão"
              />
            </Button>
          </Link>
        </Col>
        <Col>
          <img
            className={styles.imgPresentation}
            src="/img-test-removebg-preview.png"
            alt="imgIndex"
          />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center pt-5">
          <img
            className={styles.arrowDown}
            src="/homeNoAuth/iconArrowDown.svg"
            alt="Arrow Down"
          />
        </Col>
      </Row>
    </Container>
  );
};
export default PresentationSection;
