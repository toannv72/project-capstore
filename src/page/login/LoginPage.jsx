import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComInput from "../../Components/ComInput/ComInput";
import ComButton from "../../Components/ComButton/ComButton";
import { ComLink } from "../../Components/ComLink/ComLink";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FieldError } from "../../Components/FieldError/FieldError";
import { useStorage } from "../../hooks/useLocalStorage";
import { LanguageContext } from "../../contexts/LanguageContext";
import loginImg from "../../assets/LoginImg.png";
import { GoogleCircleFilled } from "@ant-design/icons";
import { postData } from "../../api/api";
import Header from "../Home/Header";

export default function LoginPage(props) {
  const { loginImgUrl, bgColor, loginGoogle, pageTitle } = props;

  const {
    text: {
      Login,
      common: { button },
    },
  } = useContext(LanguageContext);

  const [token, setToken] = useStorage("accessToken", null);
  const [role, setRole, loadStoredValue] = useStorage("role", null);
  const [disabled, setDisabled] = useState(false);
  const [LoginState, setLogin] = useState(false);
  const [LoginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const defaultColor = "bg-cyan-600";

  const loginMessenger = yup.object({
    //   phone: yup
    //     .string()
    //     .trim()
    //     .matches(/^\d{10}$/, Login.message.phone)
    //     .required(Login.message.phoneRequired),
    username: yup.string().trim().required("Tên đăng nhập không được để trống"),
    password: yup.string().required("Mật khẩu không được để trống"),
    // email: yup.string().trim().email(Login.message.emailInvalid).required(Login.message.emailRequired),
  });
  const LoginRequestDefault = {
    username: "",
    password: "",
  };
  const methods = useForm({
    resolver: yupResolver(loginMessenger),
    defaultValues: {
      username: "",
      password: "",
    },
    values: LoginRequestDefault,
  });
  const { handleSubmit, register, setFocus, watch, setValue } = methods;
  const onSubmit = (data) => {
    setDisabled(true);
    setLoginError(false);
    setLogin(false);
    postData("/auth/login", data, {})
      .then((data) => {
        setToken(data?.accessToken);
        setRole(data?.listRole[0]);
        // Chờ setToken hoàn thành trước khi navigate
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log(data);
            switch (data?.listRole[0]) {
              case "Staff":
                navigate("/staff/assignTask");
                break;
              case "Admin":
                navigate("/admin/account");
                break;
              case "Manager":
                navigate("/manager/institute");
                break;
              case "Director":
                navigate("/director/dashboard");
                break;
              case "Nurse":
                setDisabled(false);
                setLogin(true);

                setErrorMessage(
                  "Tài khoản không được phép đăng nhập vào hệ thống"
                );
                break;
              default:
                break;
            }
            resolve(); // Báo hiệu Promise đã hoàn thành
          }, 0); // Thời gian chờ 0ms để đảm bảo setToken đã được thực hiện
        });
      })
      .catch((error) => {
        console.error("1111111 Error fetching items:", error);
        setDisabled(false);
        if (error?.status === 401) {
          setLogin(true);
          setErrorMessage(Login.message.invalidCredential);
        } else {
          setLoginError(true);
          setErrorMessage(Login.message.loginError);
        }
      });
  };

  return (
    <>
      {/* <Header login={true} /> */}
      <section
        className="flex items-center justify-center h-screen w-screen bg-cover bg-center "
        style={{
          backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/careconnect-2d494.appspot.com/o/images%2Fab3611bf-a5f8-4b46-9f42-56fafbaefb5a.jpg?alt=media&token=bc958e0c-35f5-4592-a224-16d476a90536)`,
        }}
      >
        <div className="w-full max-w-4xl h-auto bg-white bg-opacity-90 rounded-3xl shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-lg">
            <div className="hidden lg:block">
              <img
                className="object-cover w-full h-full  p-14"
                src={loginImg}
                alt="Login Image"
              />
            </div>
            <div className="flex flex-col justify-center p-10">
              <div className="mt-8 space-y-6 mx-auto max-w-xl text-center ">
                <h3 className="text-3xl font-bold text-gray-700">Đăng nhập</h3>
                <p className="mt-2 text-gray-500">
                  Chào mừng đến với CareConnect!
                </p>
              </div>
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-8 space-y-6 mx-auto max-w-xl "
                >
                  <div>
                    <ComInput
                      placeholder={Login.placeholder.username}
                      label={Login.label.username}
                      type="text"
                      {...register("username")}
                      required
                    />
                  </div>
                  <div>
                    <ComInput
                      placeholder={Login.placeholder.password}
                      label={Login.label.password}
                      type="password"
                      maxLength={16}
                      {...register("password")}
                      required
                    />
                  </div>
                  <FieldError className="text-red-500 text-center">
                    {LoginState || LoginError ? errorMessage : ""}
                  </FieldError>
                  <div className="mt-6 text-center gap-1 flex flex-col">
                    <ComButton
                      disabled={disabled}
                      htmlType="submit"
                      type="primary"
                      className="w-full duration-300"
                    >
                      {Login.pageTitle}
                    </ComButton>
                    <p>&</p>
                    <Link to="/" className=" text-sky-600">
                      Trang chủ
                    </Link>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
