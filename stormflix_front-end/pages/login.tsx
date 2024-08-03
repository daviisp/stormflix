import Head from "next/head";
import styles from "../styles/registerLogin.module.scss";
import HeaderGeneric from "@/src/components/common/headerGeneric";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import Footer from "@/src/components/common/footer";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import ToastComponent from "@/src/components/common/toast";
import authService from "@/src/services/authService";

const Login = () => {
  const router = useRouter();
  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("stormflix-token")) {
      router.push("/home");
    }
  }, []);

  useEffect(() => {
    const registerSucess = router.query.registred;
    if (registerSucess === "true") {
      setToastColor("bg-success");
      setToastIsOpen(true);

      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage("Cadastro feito com sucesso!");
    }
  }, [router.query]);

  const handleLogin = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();

    const params = { email, password };

    const { status } = await authService.login(params);

    if (status === 200) {
      router.push("/home");
    } else {
      setToastColor("bg-danger");
      setToastIsOpen(true);

      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);

      setToastMessage("Email ou senha incorretos!");
    }
  };

  return (
    <>
      <Head>
        <title>StormFlix - Login</title>
      </Head>
      <HeaderGeneric
        logoUrl="/"
        btnContent="Quero fazer parte"
        btnUrl="/register"
      />
      <main className={styles.main}>
        <Container className="py-5">
          <p className={styles.formTitle}>Bem vindo(a) de volta!</p>
          <Form className={styles.form} onSubmit={handleLogin}>
            <p className="text-center">
              <strong>Bem-vindo(a) ao StromFlix!</strong>
            </p>
            <FormGroup>
              <Label for="email" className={styles.label}>
                EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Qual o seu email?"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className={styles.label}>
                SENHA
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Qual a sua senha?"
                required
                className={styles.input}
              />
            </FormGroup>
            <Button outline className={styles.formBtn}>
              ENTRAR
            </Button>
          </Form>
        </Container>
        <ToastComponent
          color={toastColor}
          isOpen={toastIsOpen}
          message={toastMessage}
        />
      </main>
    </>
  );
};
export default Login;
