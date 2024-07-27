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
import {
  addressRegex,
  cccdRegex,
  emailRegex,
  nameRegex,
  phoneNumberRegex,
} from "../../../regexPatterns";
import { handleErrors } from "../../../Components/errorUtils/errorUtils";
import ComSelect from "../../../Components/ComInput/ComSelect";

export default function EditUser({ selectedUser, onClose, tableRef }) {
  const [image, setImages] = useState([]);
  const { notificationApi } = useNotification();
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
    gender: yup.string().required("Vui lòng chọn chọn giới tính"),
    // phoneNumber: yup
    //   .string()
    //   // .required("Vui lòng nhập đủ số điện thoại")
    //   .nullable()
    //   .matches(phoneNumberRegex, "Vui lòng nhập đúng số số điện thoại"),
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
      .required("Vui lòng nhập đầy đủ email"),
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
      if (dataImg) {
        const dataPut = { ...data, imageUrl: dataImg };
        putData(`/users`, selectedUser.id, dataPut)
          .then((e) => {
            notificationApi("success", "Chỉnh sửa thành công", "đã sửa");
            setTimeout(() => {}, 100);
            tableRef();
            onClose();
          })
          .catch((e) => {
            console.log(e);
            // set các trường hợp lỗi api
            handleErrors(e, setError, setFocus);
            notificationApi("error", "Chỉnh sửa không thành công", "đã sửa");
          });
      } else {
        const dataPut = { ...data, imageUrl: selectedUser.imageUrl };
        putData(`/users`, selectedUser.id, dataPut)
          .then((e) => {
            notificationApi("success", "Chỉnh sửa thành công", "đã sửa");
            setTimeout(() => {}, 100);
            tableRef();
            onClose();
          })
          .catch((e) => {
            console.log(e);
            // set các trường hợp lỗi api
            handleErrors(e, setError, setFocus);
            notificationApi("error", "Chỉnh sửa không thành công", "đã sửa");
          });
      }
    });
  };
  useEffect(() => {
    setImages([]);
  }, [selectedUser]);

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
    <div className="p-4 bg-white font-sans">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
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
                <div className="">
                  <ComInput
                    type="text"
                    label={"Họ và Tên"}
                    placeholder={"Vui lòng nhập Họ và Tên"}
                    className="text-sm font-normal"
                    {...register("fullName")}
                    required
                  />
                </div>
              </div>
              {/* <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComInput
                      type="numbers"
                      label={"Số điện thoại"}
                      placeholder={"Vui lòng nhập số điện thoại"}
                      {...register("phoneNumber")}
                      required
                    />
                  </div>
                </div> */}
              <div className="sm:col-span-1">
                <div className="">
                  <ComInput
                    type="numbers"
                    label={"Số CMND hoặc CCCD "}
                    className="text-sm"
                    placeholder={"Vui lòng nhập số CMND hoặc CCCD "}
                    {...register("cccd")}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="">
                  <ComDatePicker
                    disabledDate={DateOfBirth}
                    label={"Ngày tháng năm sinh"}
                    className="text-sm"
                    placeholder={"VD:17-12-2000"}
                    {...register("dateOfBirth")}
                    // required
                  />
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="">
                  <ComSelect
                    style={{
                      width: "100%",
                    }}
                    className="text-sm"
                    label="Chọn giới tính"
                    placeholder="Giới tính"
                    onChangeValue={(e, value) => {
                      if (value.length === 0) {
                        setValue("gender", null, { shouldValidate: true });
                      } else {
                        setValue("gender", value, { shouldValidate: true });
                      }
                    }}
                    // value={selectedUser}
                    value={watch("gender")}
                    mode="default"
                    options={[
                      {
                        value: "Male",
                        label: `Nam`,
                      },
                      {
                        value: "Female",
                        label: `Nữ`,
                      },
                    ]}
                    required
                    {...register("gender")}
                  />
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="">
                  <ComInput
                    type="text"
                    label={"Email"}
                    className="text-sm"
                    placeholder={"Vui lòng nhập Email"}
                    {...register("email")}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="mt-2">
                  <ComInput
                    type="text"
                    label={"Địa chỉ"}
                    className="text-sm"
                    placeholder={"Vui lòng nhập Địa chỉ"}
                    {...register("address")}
                    required
                  />
                </div>
              </div>
              <ComUpImgOne
                imgUrl={selectedUser.avatarUrl}
                onChange={onChange}
                label={"Hình ảnh"}
              />
            </div>
          </div>

          <div className="mt-10">
            <ComButton
              htmlType="submit"
              type="primary"
              className="block w-full rounded-md bg-[#0F296D]  text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0F296D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Chỉnh sửa
            </ComButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
