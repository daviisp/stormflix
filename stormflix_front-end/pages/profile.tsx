import UserForm from "@/src/components/HomeAuth/profile/user";
import styles from "../styles/profile.module.scss";

import Head from "next/head";
import HeaderAuth from "@/src/components/common/headerAuth";
import { Button, Col, Container, Row } from "reactstrap";
import Footer from "@/src/components/common/footer";
import { useEffect, useState } from "react";
import PasswordForm from "@/src/components/HomeAuth/profile/password";
import { useRouter } from "next/router";
import PageSpinner from "@/src/components/common/spinner";

const UserInfo = () => {
  const [form, setForm] = useState("userForm");

  const router = useRouter();

  const [loading, setLoading] = useState(true);

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
        <title>StormFlix - Meus Dados</title>
      </Head>
      <main style={{ position: "relative", paddingBottom: "50px" }}>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        <Container className="py-5">
          <p className={styles.title}>Minha conta</p>
          <Row className="pt-5 pb-5">
            <Col md={4} className={styles.btnColumn}>
              <Button
                className={styles.renderForm}
                onClick={() => setForm("userForm")}
                style={{ color: form === "userForm" ? "#ff0044" : "#fff" }}
              >
                DADOS PESSOAIS
              </Button>
              <Button
                style={{ color: form === "passwordForm" ? "#ff0044" : "#fff" }}
                className={styles.renderForm}
                onClick={() => setForm("passwordForm")}
              >
                SENHA
              </Button>
            </Col>
            <Col md>
              {form === "userForm" ? <UserForm /> : <PasswordForm />}
            </Col>
          </Row>
        </Container>
        <div
          className={styles.footer}
          style={{
            position: "absolute",

            bottom: "0",
            width: "100%",
          }}
        ></div>
      </main>
    </>
  );
};
export default UserInfo;
