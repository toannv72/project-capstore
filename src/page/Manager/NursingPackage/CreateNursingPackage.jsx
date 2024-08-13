import React, { useEffect, useState } from "react";
import ComButton from "../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "../../../Notification/Notification";
import ComTextArea from "./../../../Components/ComInput/ComTextArea";
import ComNumber from "./../../../Components/ComInput/ComNumber";
import { postData } from "../../../api/api";
import { firebaseImg } from "../../../upImgFirebase/firebaseImg";
import ComUpImgOne from "../../../Components/ComUpImg/ComUpImgOne";
import { MonyNumber } from "../../../Components/MonyNumber/MonyNumber";
import { handleErrors } from "../../../Components/errorUtils/errorUtils";

export default function CreateNursingPackage({ tableRef, onClose }) {
  const [image, setImages] = useState(null);
  const { notificationApi } = useNotification();

  const [disabled, setDisabled] = useState(false);
  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhập tên gói").trim(),
    description: yup.string().required("Vui lòng nhập chi tiết gói"),
    price: yup
      .string()
      .typeError("Vui lòng nhập giá tiền")
      .required("Vui lòng nhập giá tiền"),
    capacity: yup
      .number()
      .max(20, "vui lòng nhập nhỏ hơn 20 người")
      .min(1, "vui lòng nhập lớn hơn 1 người")
      .required("Vui lòng nhập số lượng ")
      .typeError("Vui lòng nhập số lượng ")
      .integer("Vui lòng nhập số nguyên"),
    numberOfNurses: yup
      .number()
      .max(20, "vui lòng nhập nhỏ hơn 20 người")
      .min(1, "vui lòng nhập lớn hơn 1 người")
      .required("Vui lòng nhập số lượng ")
      .typeError("Vui lòng nhập số lượng ")
      .integer("Vui lòng nhập số nguyên"),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    values: {
      name: "",
      description: "",
    },
  });
  const { handleSubmit, register, setFocus, watch, setValue, setError } =
    methods;

  const onChange = (data) => {
    const selectedImages = data;

    // Tạo một mảng chứa đối tượng 'originFileObj' của các tệp đã chọn
    // const newImages = selectedImages.map((file) => file.originFileObj);
    // Cập nhật trạng thái 'image' bằng danh sách tệp mới
    console.log([selectedImages]);
    setImages(selectedImages);
    // setFileList(data);
  };
  const onSubmit = (data) => {
    setDisabled(true);
    const change = MonyNumber(
      data.price,
      (message) => setError("price", { message }), // Đặt lỗi nếu có
      () => setFocus("price") // Đặt focus vào trường price nếu có lỗi
    );
    if (change !== null) {
      // Kiểm tra xem change có giá trị hợp lệ không
      if (image) {
        firebaseImg(image).then((dataImg) => {
          const dataUp = { ...data, price: change, imageUrl: dataImg };
          postData(`/nursing-package`, dataUp)
            .then((e) => {
              notificationApi(
                "success",
                "tạo thành công",
                "đã tạo gói dịch vụ thành công!"
              );
              if (tableRef.current) {
                tableRef.current.reloadData();
              }
              onClose();
              setDisabled(false);
            })
            .catch((error) => {
              console.log(error);
              handleErrors(error, setError, setFocus);

             if (error.status === 409) {
               setError("name", {
                 message: "Đã có tên gói dưỡng lão này!",
               });
               setFocus("name");
             }

              setDisabled(false);
              notificationApi(
                "error",
                "tạo không thành công",
                "tạo gói dịch vụ không thành công!"
              );
            });
        });
      } else {
        setDisabled(false);
        notificationApi(
          "error",
          "Chọn ảnh gói dưỡng lão",
          "Vui lòng chọn ảnh!"
        );
      }
    } else {
      setDisabled(false);
    }
  };
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Tạo gói dưỡng lão
      </h2>
      <div className="bg-white ">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl ">
            <div className=" overflow-y-auto p-4">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComInput
                      type="text"
                      label={"Tên gói dưỡng lão"}
                      placeholder={"Tên gói dưỡng lão"}
                      {...register("name")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComNumber
                      // type="text"
                      min={0}
                      label={"Số lượng người một phòng "}
                      placeholder={"Vui lòng nhập số lượng"}
                      {...register("capacity")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComNumber
                      // type="text"

                      label={"Số lượng điều dưỡng "}
                      placeholder={"Vui lòng nhập số lượng"}
                      min={0}
                      {...register("numberOfNurses")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComNumber
                      type="text"
                      money
                      defaultValue={1000}
                      // min={1000}
                      // onChangeValue={(e, value) => {
                      //   setValue(e, value);
                      //   setMony(value);
                      // }}
                      label={"Số tiền"}
                      placeholder={"Vui lòng nhập số tiền"}
                      {...register("price")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComTextArea
                      type="text"
                      rows={5}
                      label={"Chi tiết gói "}
                      placeholder={"Vui lòng chi tiết gói"}
                      {...register("description")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComUpImgOne
                      onChange={onChange}
                      numberImg={1}
                      label={"Hình ảnh gói"}
                      required
                      multiple={false}
                    />
                  </div>
                </div>
              </div>
            <div className="mt-10">
              <ComButton
                htmlType="submit"
                disabled={disabled}
                type="primary"
                className="block w-full rounded-md bg-[#0F296D]  text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0F296D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Tạo mới
              </ComButton>
            </div>
            </div>

          </form>
        </FormProvider>
      </div>
    </div>
  );
}
