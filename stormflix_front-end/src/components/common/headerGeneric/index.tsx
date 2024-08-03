import { Container, Button } from "reactstrap";
import styles from "./styles.module.scss";
import Link from "next/link";

interface Props {
  logoUrl: string;
  btnUrl: string;
  btnContent: string;
}

// Usado no Login e Register

const HeaderGeneric = ({ logoUrl, btnUrl, btnContent }: Props) => {
  return (
    <>
      <div className={styles.header}>
        <Container className={styles.headerContainer}>
          <Link href={logoUrl} style={{ textDecoration: "none" }}>
            <h1
              style={{
                color: "#ff003a",
                fontWeight: "bold",
              }}
            >
              StormFlix
            </h1>
          </Link>

          <Link href={btnUrl}>
            <Button outline color="light" className={styles.headerBtn}>
              {btnContent}
            </Button>
          </Link>
        </Container>
      </div>
    </>
  );
};
export default HeaderGeneric;
