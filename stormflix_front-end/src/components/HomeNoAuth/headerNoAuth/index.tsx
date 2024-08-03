import styles from "./styles.module.scss";

import { Button, Container } from "reactstrap";
import Link from "next/link";

const HeaderNoAuth = () => {
  return (
    <>
      <Container className={styles.nav}>
        <h1
          className={styles.logoTitle}
          style={{
            fontWeight: "700",
            color: "#FF003A",
          }}
        >
          StormFlix
        </h1>
        <div>
          <Link href="/login">
            <Button className={styles.navBtn} outline>
              Entrar
            </Button>
          </Link>

          <Link href="/register">
            <Button className={styles.navBtn} outline>
              Quero fazer parte
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};
export default HeaderNoAuth;
