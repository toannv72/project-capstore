import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComButton from "../../Components/ComButton/ComButton";
import { useNotification } from "../../Notification/Notification";

function Admin() {
  const {
    text: {
      Login,
    },
  } = useContext(LanguageContext);
  const { notificationApi } = useNotification();
  const show = () => {
    notificationApi("error", "tạo thành công", "đã tạo");

  }
  return (
    <>
      <p> {Login.pageTitle}</p>
      <ComButton onClick={show}>show</ComButton>
      <ComButton onClick={show}>show</ComButton>
      <p>
        Admin aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaa
      </p>
    </>
  );
}

export default Admin;
