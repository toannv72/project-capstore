import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import ComInput from "../../Components/ComInput/ComInput";
import ComButton from "../../Components/ComButton/ComButton";
import { postData } from "../../api/api";
import { useNotification } from "../../Notification/Notification";

const passwordSchema = yup.object({
  oldPassword: yup.string().required("Mật khẩu cũ không được để trống"),
  newPassword: yup
    .string()
    .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự")
    .matches(/[A-Z]/, "Phải chứa ít nhất 1 chữ cái in hoa")
    .matches(/[a-z]/, "Phải chứa ít nhất 1 chữ cái in thường")
    .matches(/[0-8]/, "Phải chứa ít nhất 1 chữ số")
    .notOneOf([yup.ref("password")], "Không được trùng với mật khẩu cũ")
    .required("Mật khẩu mới không được để trống"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Mật khẩu phải khớp")
    .required("Xác nhận mật khẩu không được để trống"),
});

export default function ChangePassword() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const location = useLocation();
  const { notificationApi } = useNotification();

  const methods = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: { password: "", newPassword: "", confirmPassword: "" },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = methods;

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");
  const passwordStrength = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-8]/.test(newPassword),
  };

  useEffect(() => {
    if (newPassword !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Mật khẩu phải khớp",
      });
    } else {
      clearErrors("confirmPassword");
    }
  }, [newPassword, confirmPassword]);
  function getRoleFromPath(pathname) {
    const parts = pathname.split("/");
    return parts[1];
  }
  const onSubmit = (data) => {
    setDisabled(true);
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    postData("/users/change-password", data)
      .then((e) => {
        setDisabled(false);
        notificationApi("success", "Thành công", "Thay đổi mật khẩu thành công!");
         navigate(`/${getRoleFromPath(location.pathname)}/profile`);
      })
      .catch((errors) => {
        console.log("====================================");
        setDisabled(false);
        console.log(errors);
        console.log("====================================");
        setError("oldPassword", {
          type: "manual",
          message: "Mật khẩu hiện tại không đúng!",
        });
      });
  };

  const handleCancelClick = () => {
    navigate(`/${getRoleFromPath(location.pathname)}/profile`);
  };
  return (
    <div className="flex flex-col-1 md:flex-row p-10 gap-10">
      <div className="p-10 flex w-full bg-gray-200 rounded-md">
        <div className="flex flex-1 flex-col w-full gap-2">
          <div className="text-5xl font-semibold font-montserrat text-gray-500 mb-4">
            Thay đổi mật khẩu
          </div>
          <div className="text-xl font-montserrat text-gray-400">
            Mật khẩu phải có:
          </div>
          <div
            className={`text-lg ${
              passwordStrength.length
                ? "line-through text-gray-400"
                : "text-red-400"
            }`}
          >
            {!passwordStrength.length ? (
              <CloseOutlined style={{ marginRight: "5px" }} />
            ) : (
              <CheckOutlined style={{ color: "blue", marginRight: "5px" }} />
            )}
            Ít nhất 8 ký tự
          </div>
          <div
            className={`text-lg ${
              passwordStrength.uppercase
                ? "line-through text-gray-400"
                : "text-red-400"
            }`}
          >
            {!passwordStrength.uppercase ? (
              <CloseOutlined style={{ marginRight: "5px" }} />
            ) : (
              <CheckOutlined style={{ color: "blue", marginRight: "5px" }} />
            )}
            Ít nhất 1 ký tự chữ hoa
          </div>
          <div
            className={`text-lg ${
              passwordStrength.lowercase
                ? "line-through text-gray-400"
                : "text-red-400"
            }`}
          >
            {!passwordStrength.lowercase ? (
              <CloseOutlined style={{ marginRight: "5px" }} />
            ) : (
              <CheckOutlined style={{ color: "blue", marginRight: "5px" }} />
            )}
            Ít nhất 1 ký tự chữ thường
          </div>
          <div
            className={`text-lg ${
              passwordStrength.number
                ? "line-through text-gray-400"
                : "text-red-400"
            }`}
          >
            {!passwordStrength.number ? (
              <CloseOutlined style={{ marginRight: "5px" }} />
            ) : (
              <CheckOutlined style={{ color: "blue", marginRight: "5px" }} />
            )}
            Ít nhất 1 ký tự số
          </div>
        </div>
        <div className="flex-1 w-full md:w-1/2">
          <FormProvider {...methods}>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <ComInput
                placeholder="Nhập mật khẩu đang sử dụng"
                label="Mật khẩu hiện tại"
                type="password"
                maxLength={16}
                {...register("oldPassword")}
                error={errors.password?.message}
                required
              />

              <ComInput
                placeholder="Nhập mật khẩu thay đổi"
                label="Mật khẩu mới"
                type="password"
                maxLength={16}
                {...register("newPassword")}
                // onChange={handlePasswordChange}
                error={errors.newPassword?.message}
                required
              />

              <ComInput
                placeholder="Nhập lại mật khẩu thay đổi"
                label="Xác nhận mật khẩu"
                type="password"
                maxLength={16}
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
                required
              />

              <ComButton
                className="w-full"
                htmlType="submit"
                disabled={disabled}
                type="primary"
              >
                Thay đổi mật khẩu
              </ComButton>
              <ComButton
                // className="w-full bg-transparent border-none text-white shadow-none"
                className="w-full bg-transparent border-none shadow-none bg-white  "
                textColor={"text-black"}
                onClick={handleCancelClick}
              >
                Hủy
              </ComButton>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
