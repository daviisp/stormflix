import Link from "next/link";
import styles from "./styles.module.scss";
import { Container, Form, Input } from "reactstrap";
import Modal from "react-modal";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import profileService from "@/src/services/profileService";

// Não é usado em home.tsx, é usaado na featuredSection (retorna apenas um curso em destaque)

Modal.setAppElement("#__next");

const HeaderAuth = () => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [initials, setInitials] = useState("");

  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      const firstNameInitial = user.firstName.slice(0, 1);
      const lastNameInitial = user.lastName.slice(0, 1);
      setInitials(firstNameInitial + lastNameInitial);
    });
  }, []);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  const handleSearch = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    router.push(`/search/?name=${searchName}`);
    setSearchName("");
  };

  const handleSearchClick = () => {
    router.push(`/search/?name=${searchName}`);
    setSearchName("");
  };

  return (
    <>
      <Container className={styles.nav}>
        <Link href="/home" style={{ textDecoration: "none" }}>
          <h1 style={{ fontWeight: "bold", color: "#ff003a" }}>StormFlix</h1>
        </Link>
        <div className="d-flex align-items-center">
          <Form onSubmit={handleSearch}>
            <Input
              name="search"
              type="search"
              placeholder="Pesquisar"
              className={styles.input}
              value={searchName}
              onChange={(ev) =>
                setSearchName(ev.currentTarget.value.toLowerCase())
              }
            />
          </Form>
          <img
            src="/homeAuth/iconSearch.svg"
            alt="Ícone de Lupa"
            className={styles.searchImg}
            onClick={handleSearchClick}
          />
          <p className={styles.userProfile} onClick={handleOpen}>
            {initials}
          </p>
        </div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={handleClose}
          shouldCloseOnEsc={true}
          className={styles.modal}
          overlayClassName={styles.overlayModal}
        >
          <Link href="/profile" style={{ textDecoration: "none" }}>
            <p className={styles.modalLink}>Meus Dados</p>
          </Link>
          <p className={styles.modalLink} onClick={handleLogout}>
            Sair
          </p>
        </Modal>
      </Container>
    </>
  );
};
export default HeaderAuth;
