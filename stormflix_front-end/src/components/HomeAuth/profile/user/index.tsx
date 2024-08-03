import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../../styles/profile.module.scss";
import { FormEvent, useEffect, useState } from "react";
import profileService from "@/src/services/profileService";
import ToastComponent from "@/src/components/common/toast";
import { useRouter } from "next/router";

const UserForm = () => {
  const router = useRouter();

  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [initialEmail, setInitialEmail] = useState("");

  const date = new Date(createdAt);
  const month = date.toLocaleDateString("default", { month: "long" });

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setInitialEmail(user.email);
      setPhone(user.phone);
      setCreatedAt(user.createdAt);
    });
  }, []);

  const handleUserUpdate = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const res = await profileService.userUpdate({
      firstName,
      lastName,
      email,
      phone,
      createdAt,
    });

    if (res === 200) {
      setToastIsOpen(true);
      setErrorMessage("Informações alteradas com sucesso");
      setColor("bg-success");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);

      if (email != initialEmail) {
        sessionStorage.clear();
        router.push("/");
      }
    } else {
      setToastIsOpen(true);
      setErrorMessage("Você não pode mudar para esse email!");
      setColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleUserUpdate}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>
            {firstName.slice(0, 1)}
            {lastName.slice(0, 1)}
          </p>
          <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
        </div>
        <hr />
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} for="firstName">
              NOME
            </Label>
            <Input
              name="firstName"
              type="text"
              id="firstName"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={firstName}
              onChange={(ev) => setFirstName(ev.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="lastName">
              SOBRENOME
            </Label>
            <Input
              name="lastName"
              type="text"
              id="lastName"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
            />
          </FormGroup>
        </div>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} for="phone">
              WHATSAPP
            </Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              required
              maxLength={20}
              className={styles.input}
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="email">
              EMAIL
            </Label>
            <Input
              name="email"
              type="email"
              id="email"
              required
              maxLength={30}
              className={styles.input}
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </FormGroup>

          <Button outline className={styles.formBtn} type="submit">
            Salvar alterações
          </Button>
        </div>
      </Form>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={errorMessage}
      />
    </>
  );
};
export default UserForm;
