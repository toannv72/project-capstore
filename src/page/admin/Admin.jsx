import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComNotification from "../../Components/ComNotification/ComNotification";

function Admin() {
  const {
    text: {
      Login,
      common: { button },
    },
  } = useContext(LanguageContext);

  return (
    <>
      <p> {Login.pageTitle}</p>
      <ComNotification notificationType="success" />
      <p>
        Admin aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaa
      </p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
    </>
  );
}

export default Admin;
