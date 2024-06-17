import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import ComInput from "../../Components/ComInput/ComInput";
import ComButton from "../../Components/ComButton/ComButton";

const passwordSchema = yup.object({
  password: yup.string().required("Mật khẩu hiện tại là bắt buộc"),
  newPassword: yup
    .string()
    .min(9, "Mật khẩu mới phải có ít nhất 9 ký tự")
    .matches(/[A-Z]/, "Phải chứa ít nhất 1 chữ cái in hoa")
    .matches(/[a-z]/, "Phải chứa ít nhất 1 chữ cái in thường")
    .matches(/[0-9]/, "Phải chứa ít nhất 1 chữ số")
    .notOneOf([yup.ref("password")], "Không được trùng với mật khẩu cũ")
    .required("Mật khẩu mới là bắt buộc"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Mật khẩu phải khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

export default function ChangePassword() {
  const navigate = useNavigate();
  const [oldPassword] = useState("abc");
  const [isOldPasswordIncorrect, setIsOldPasswordIncorrect] = useState(false);

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
  const passwordStrength = {
    length: newPassword.length >= 9,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
  };

  useEffect(() => {
    if (
      methods.getValues("newPassword") !== methods.getValues("confirmPassword")
    ) {
      setError("confirmPassword", {
        type: "manual",
        message: "Mật khẩu phải khớp",
      });
    } else {
      clearErrors("confirmPassword");
    }
  }, [newPassword]);

  const onSubmit = (data) => {
    if (data.password !== oldPassword) {
      setIsOldPasswordIncorrect(true);
    } else {
      setIsOldPasswordIncorrect(false);
      // Proceed to send data.newPassword to the database
    }
  };

  const handleCancelClick = () => {
    navigate("/admin/profile");
  };
  return (
    <div className="flex flex-col-1 md:flex-row p-10 gap-10">
      <div className="p-10 flex w-full bg-gray-200 rounded-md">
        <div className="flex flex-1 flex-col w-full gap-2">
          <div className="text-5xl font-semibold font-montserrat text-gray-500 mb-4">
            Change Password
          </div>
          <div className="text-xl font-montserrat text-gray-400">
            Passwords must contain:
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
            At least 9 characters
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
            At least 1 upper case (A-Z)
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
            At least 1 lower case (a-z)
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
            At least 1 number (0-9)
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
                label="Mật khẩu cũ"
                type="password"
                maxLength={16}
                {...register("password")}
                error={errors.password?.message}
                required
              />
              {isOldPasswordIncorrect && (
                <span className="text-red-500">
                  Mật khẩu cũ không chính xác.
                </span>
              )}
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
                label="Nhập lại mật khẩu"
                type="password"
                maxLength={16}
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
                required
              />

              <ComButton className="w-full" htmlType="submit" type="primary">
                Thay đổi mật khẩu
              </ComButton>
              <ComButton
                className="w-full bg-transparent border-none text-faded shadow-none"
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
