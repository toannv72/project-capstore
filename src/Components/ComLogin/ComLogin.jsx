
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import ComInput from "../ComInput/ComInput";
import ComButton from "../ComButton/ComButton";
import { ComLink } from "../ComLink/ComLink";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldError } from "../FieldError/FieldError";
import { useStorage } from "../../hooks/useLocalStorage";
import { LanguageContext } from "../../contexts/LanguageContext";
import loginImg from "./LoginImg.png";
import { GoogleCircleFilled } from "@ant-design/icons";

export default function ComLogin(props) {
    const { loginImgUrl, bgColor, loginGoogle, pageTitle } = props;

    const {
        text: {
            Login,
            common: { button },
        },
    } = useContext(LanguageContext);

    const [token, setToken] = useStorage("user", null);
    const [disabled, setDisabled] = useState(false);
    const [LoginState, setLogin] = useState(false);
    const [LoginError, setLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const defaultColor = "bg-cyan-600";



    const loginMessenger = yup.object({
        // username: yup.string().trim().required("textApp.Login.message.username"),
        password: yup.string().required(Login.message.password),
        email: yup.string().trim().email(Login.message.emailInvalid).required(Login.message.emailRequired),
    })
    const LoginRequestDefault = {
        password: "",
        email: "",

    };
    const methods = useForm({
        resolver: yupResolver(loginMessenger),
        defaultValues: {
            password: "",
            email: "",
        },
        values: LoginRequestDefault
    })
    const { handleSubmit, register, setFocus, watch, setValue } = methods
    const onSubmit = (data) => {
        console.log(data);
        setLoginError(false)

        setLogin(false)
        setDisabled(true)
        // postData('/login', data, {})
        //     .then((data) => {
        //         localStorage.setItem('user', JSON.stringify(data));
        //         console.log(data);
        //         setToken(data)
        //         setDisabled(false)
        //         // navigate('/')
        //         if (data._doc.admin) {
        //             navigate('#')
        //         } else {
        //             navigate('#')
        //         }
        //         handleCancel();
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching items:", error);
        //         setDisabled(false)
        //         if (error?.response?.status === 401) {
// trả về lỗi sai email hoặc password
        //             setLogin(true)
        // setErrorMessage(Login.message.invalidCredential);
        //         } else {
        //             setLoginError(true)
        // setErrorMessage(Login.message.loginError);
        //         }
        //     });
    }

    return (
        <>

            <div className="flex flex-col justify-center rounded-3xl shadow-lg md:flex-row mx-3">
                <div className="p-6 md:w-1/2 bg-gray-100 py-6 md:px-8  rounded-3xl md:rounded-tr-none md:rounded-br-none shadow-lg border-2 md:border-t-2 md:border-l-2 md:border-b-2">
                    <div className=" flex justify-center items-center md:hidden" >
                        {loginImgUrl ? (
                            <img src={loginImgUrl} alt=" Login Image" className="object-contain max-w-xs max-h-xs" />
                        ) : (
                            <img src={loginImg} className="object-contain max-w-xs max-h-xs" alt="Default Login Image" />
                        )}
                    </div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
                            {pageTitle?pageTitle:Login.pageTitle}
                        </h2>
                        <p className="mt-5 text-center leading-9 tracking-tight text-gray-500">
                            {Login.pageSubTitle}
                        </p>
                    </div>

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                        <FormProvider {...methods} >
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>

                                <ComInput
                                    placeholder={Login.label.email}
                                    label={Login.label.email}
                                    type="text"
                                    // maxLength={15}
                                    {...register("email")}
                                    required
                                />

                                <ComInput
                                    placeholder={Login.label.password}
                                    label={Login.label.password}
                                    type="password"
                                    maxLength={16}
                                    {...register("password")}
                                    required
                                />
                                <ComLink className="text-right">{Login.link.forgetPassword}</ComLink>

                                <FieldError className="text-red-500 text-center">
                                    {LoginState || LoginError ? errorMessage : ''}
                                </FieldError>
                                <ComButton
                                    disabled={disabled}
                                    htmlType="submit"
                                    type="primary"
                                    className={bgColor? bgColor: defaultColor}
                                >
                                    {Login.pageTitle}
                                </ComButton>


                            </form>
                        </FormProvider>
                        {loginGoogle && (
                            <>
                                <p className="flex my-4 justify-center">--- Or login with ---</p>

                                <ComButton
                                    disabled={disabled}
                                    htmlType="submit"
                                    type="primary"
                                    className={`w-1/2 ${bgColor? bgColor: defaultColor } flex justify-center items-center`}
                                >
                                    <GoogleCircleFilled />Login with  Google
                                </ComButton>

                            </>)}
                        <div className="flex my-4 justify-center">

                            <ComLink to="/register" className="flex gap-1" >  <p className="text-black font-normal ">Don't have an account?</p>  {Login.link.register}</ComLink>

                        </div>
                    </div>
                </div>
                <div className={`w-1/2 ${bgColor? bgColor: defaultColor}  rounded-tr-3xl rounded-br-3xl shadow-lg md:flex hidden justify-center items-center  border-2 border-l-0`} >
                    {loginImgUrl ? (
                        <img src={loginImgUrl} alt=" Login Image" className="object-contain max-w-full max-h-full rounded-tr-3xl rounded-br-3xl " />
                    ) : (
                        <img src={loginImg} className="object-contain max-w-full max-h-full" alt="Default Login Image" />
                    )}
                </div>
            </div>

        </>
    )

}

