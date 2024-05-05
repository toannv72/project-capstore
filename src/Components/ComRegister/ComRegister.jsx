
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import ComInput from "../ComInput/ComInput";
import ComButton from "../ComButton/ComButton";
import ComLoading from "../ComLoading/ComLoading";
import { ComLink } from "../ComLink/ComLink";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldError } from "../FieldError/FieldError";
import { useStorage } from "../../hooks/useLocalStorage";
import { LanguageContext } from "../../contexts/LanguageContext";
import loginImg from "../ComLogin/LoginImg.png";

export default function ComRegister(props) {
    const {
        text: {
            Register,
            common: { button },
        },
    } = useContext(LanguageContext);

    const [disabled, setDisabled] = useState(false);
    const [registerState, setRegister] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const defaultColor = "bg-cyan-600";

    const registerMessenger = yup.object({
        username: yup.string().required("textApp.Register.message.username"),
        name: yup.string().trim().required(Register.message.name).min(2, Register.message.nameTooShort),
        phone: yup.string().trim().matches(/^\d{10}$/, Register.message.phoneInvalid).required(Register.message.phoneRequired),
        password: yup.string().required(Register.message.password).min(8, Register.message.passwordTooShort)
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                Register.message.passwordInvalid
            ),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], Register.message.passwordNotMatch).required(Register.message.confirmPassword),
        email: yup.string().trim().email(Register.message.emailInvalid).required(Register.message.emailRequired),
    })
    const RegisterRequestDefault = {
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",
        email: "",

    };
    const methods = useForm({
        resolver: yupResolver(registerMessenger),
        defaultValues: {
            name: "",
            phone: "",
            password: "",
            confirmPassword: "",
            email: "",
        },
        values: RegisterRequestDefault
    })
    const { handleSubmit, register, setFocus, watch, setValue } = methods
    const onSubmit = (data) => {
        setRegisterError(false)

        setRegister(false)
        setDisabled(true)
        // postData('/register', data, {})
        //     .then((data) => {
        //         console.log(data);
        // navigate('/')
        //       
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching items:", error);
        //         setDisabled(false)
        //         if (error?.response?.message === "Existed email") {
        // trả về thông báo lỗi email đã tồn tại
        //             setRegister(true)
        // setErrorMessage(Register.message.emailExisted);
        //         } else {
        //             setRegisterError(true)
        // setErrorMessage(Register.message.registerError);
        //         }
        //     });
    }

    return (
        <>
            <div className="flex flex-col justify-center rounded-3xl shadow-lg lg:flex-row mx-3">
                {/* <ComLoading></ComLoading> */}
                <div className="p-6 lg:w-1/2 bg-gray-100 py-6 lg:px-8  rounded-3xl lg:rounded-tr-none lg:rounded-br-none shadow-lg border-2 lg:border-t-2 lg:border-l-2 lg:border-b-2">
                    <div className=" flex justify-center items-center lg:hidden" >
                        <img src={loginImg} className="object-contain max-w-xs max-h-xs" alt="Default Login Image" />

                    </div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
                            {Register.pageTitle}
                        </h2>
                        <p className="mt-5 text-center leading-9 tracking-tight text-gray-500">
                            {Register.pageSubTitle}
                        </p>
                    </div>

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                        <FormProvider {...methods} >
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                                <ComInput
                                    placeholder={Register.label.yourName}
                                    label={Register.label.yourName}
                                    type="text"
                                    {...register("name")}
                                    required
                                />
                                <ComInput
                                    placeholder={Register.label.phone}
                                    label={Register.label.phone}
                                    type="text"
                                    maxLength={10}
                                    {...register("phone")}
                                    required
                                />

                                <ComInput
                                    placeholder={Register.label.email}
                                    label={Register.label.email}
                                    type="text"
                                    maxLength={15}
                                    {...register("email")}
                                    required
                                />

                                <ComInput
                                    placeholder={Register.label.password}
                                    label={Register.label.password}
                                    type="password"
                                    maxLength={16}
                                    {...register("password")}
                                    required
                                />
                                <ComInput
                                    placeholder={Register.label.confirmPassword}
                                    label={Register.label.confirmPassword}
                                    type="password"
                                    maxLength={16}
                                    {...register("confirmPassword")}
                                    required
                                />

                                <FieldError className="text-red-500 text-center">
                                    {registerState || registerError ? errorMessage : ''}
                                </FieldError>
                                <ComButton
                                    disabled={disabled}
                                    htmlType="submit"
                                    type="primary"
                                    className={props.bgColor ? props.bgColor : defaultColor}

                                >
                                    {Register.pageTitle}
                                </ComButton>


                            </form>
                        </FormProvider>
                        <div className="flex my-4 justify-center">

                            <ComLink to="/login" className="flex gap-1"> <p className="text-black font-normal ">Have an account?</p>  {Register.link.login}</ComLink>

                        </div>
                    </div>
                </div>
                <div className={`w-1/2 ${props.bgColor ? props.bgColor : defaultColor}  rounded-tr-3xl rounded-br-3xl shadow-lg lg:flex hidden justify-center items-center  border-2 border-l-0`} >
                    {props.loginImgUrl ? (
                        <img src={props.loginImgUrl} alt=" Login Image" className="object-contain max-w-full max-h-full rounded-tr-3xl rounded-br-3xl " />
                    ) : (
                        <img src={loginImg} className="object-contain max-w-full max-h-full" alt="Default Login Image" />
                    )}
                </div>
            </div>

        </>
    )

}

