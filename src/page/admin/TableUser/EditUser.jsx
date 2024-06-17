import React, { useEffect, useState } from "react";
import ComButton from "./../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "./../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseImgs } from "../../../upImgFirebase/firebaseImgs";
import ComUpImg from "./../../../Components/ComUpImg/ComUpImg";
import { useNotification } from "./../../../Notification/Notification";
import ComUpImgOne from "../../../Components/ComUpImg/ComUpImgOne";
import ComDatePicker from "../../../Components/ComDatePicker/ComDatePicker";
import { DateOfBirth } from "../../../Components/ComDateDisabled/DateOfBirth";
import dayjs from "dayjs";
import { firebaseImg } from "../../../upImgFirebase/firebaseImg";
import { postData, putData } from "../../../api/api";
import { cccdRegex, phoneNumberRegex } from "../../../regexPatterns";

export default function EditUser({ selectedUser, onClose, tableRef }) {
  const [image, setImages] = useState([]);
  const { notificationApi } = useNotification();

  const addressRegex =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯăằắẳẵặâầấẩẫậêềếểễệôồốổỗộơờớởỡợưứừửữựỳỵỷỹý0-9\s,.'-]+$/;

  const nameRegex =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯăằắẳẵặâầấẩẫậêềếểễệôồốổỗộơờớởỡợưứừửữựỳỵỷỹý\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const CreateProductMessenger = yup.object({
    fullName: yup
      .string()
      .matches(
        nameRegex,
        "Vui lòng nhập tên hợp lệ (chỉ chứa chữ cái và dấu cách)"
      )
      .required("Vui lòng nhập tên")
      .min(2, "Tên quá ngắn, vui lòng nhập tối thiểu 2 ký tự")
      .max(50, "Tên quá dài, vui lòng nhập tối đa 50 ký tự"),
    phoneNumber: yup
      .string()
      // .required("Vui lòng nhập đủ số điện thoại")
      .nullable()
      .matches(phoneNumberRegex, "Vui lòng nhập đúng số số điện thoại"),
    cccd: yup
      .string()
      .matches(
        cccdRegex,
        "Vui lòng nhập đúng số CMND hoặc CCCD (9 hoặc 12 chữ số)"
      )
      .required("Vui lòng nhập đủ số CMND hoặc CCCD"),
    address: yup
      .string()
      .matches(addressRegex, "Vui lòng nhập địa chỉ hợp lệ")
      .required("Vui lòng nhập địa chỉ")
      .min(5, "Địa chỉ quá ngắn, vui lòng nhập tối thiểu 5 ký tự")
      .max(100, "Địa chỉ quá dài, vui lòng nhập tối đa 100 ký tự"),
    email: yup
      .string()
      .matches(emailRegex, "Vui lòng nhập địa chỉ email hợp lệ")
      .notRequired(),
  });
  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    defaultValues: {
      name: "",
      phoneNumber: "",
      dateOfBirth: selectedUser.dateOfBirth ? selectedUser.dateOfBirth : null,
    },
    values: selectedUser,
  });

  const { handleSubmit, register, setFocus, watch, setValue, setError } =
    methods;
  const onSubmit = (data) => {

    firebaseImg(image).then((dataImg) => {
      console.log("ảnh nè : ", dataImg);
      putData(`/users/${selectedUser.id}`, { ...data, avatarUrl: dataImg })
        .then((e) => {
          notificationApi("success", "Chỉnh sửa thành công", "đã sửa");
          setTimeout(() => {
            if (tableRef.current) {
              // Kiểm tra xem ref đã được gắn chưa
              tableRef.current.reloadData();
            }
          }, 100);
          onClose();
        })
        .catch((e) => {
          console.log("====================================");
          console.log(e);
          if (e.status === 409) {
            setError("phoneNumber", {
              message: "Đã có số điện thoại này",
            });
          }
          console.log("====================================");
        });
    });
  };

  const onChange = (data) => {
    const selectedImages = data;

    // Tạo một mảng chứa đối tượng 'originFileObj' của các tệp đã chọn
    // const newImages = selectedImages.map((file) => file.originFileObj);
    // Cập nhật trạng thái 'image' bằng danh sách tệp mới
    console.log([selectedImages]);
    setImages(selectedImages);
    // setFileList(data);
  };
  return (
    <div>
      <div className="p-4 bg-white ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Chỉnh sửa người dùng
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-2 max-w-xl "
          >
            <div className=" overflow-y-auto p-2">
              <div
                className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
                // style={{ height: "65vh" }}
              >
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComInput
                      type="text"
                      label={"Họ và Tên"}
                      placeholder={"Vui lòng nhập Họ và Tên"}
                      {...register("fullName")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComInput
                      type="numbers"
                      label={"Số điện thoại"}
                      placeholder={"Vui lòng nhập số điện thoại"}
                      {...register("phoneNumber")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComInput
                      type="numbers"
                      label={"Số CMND hoặc CCCD "}
                      placeholder={"Vui lòng nhập số CMND hoặc CCCD "}
                      {...register("cccd")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComDatePicker
                      type="numbers"
                      disabledDate={DateOfBirth}
                      label={"Ngày tháng năm sinh"}
                      placeholder={"VD:17-12-2000"}
                      {...register("dateOfBirth")}
                      // required
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComInput
                      type="text"
                      label={"Gmail"}
                      placeholder={"Vui lòng nhập Gmail"}
                      {...register("email")}
                      // required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComInput
                      type="text"
                      label={"Địa chỉ"}
                      placeholder={"Vui lòng nhập Địa chỉ"}
                      {...register("address")}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <ComUpImgOne onChange={onChange} label={"Hình ảnh"} />
            <div className="mt-10">
              <ComButton
                htmlType="submit"
                type="primary"
                className="block w-full rounded-md bg-indigo-600  text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Chỉnh sửa
              </ComButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
