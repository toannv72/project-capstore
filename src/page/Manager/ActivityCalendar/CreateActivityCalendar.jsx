import React, { useState } from "react";
import ComButton from "../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseImgs } from "../../../upImgFirebase/firebaseImgs";
import ComUpImg from "../../../Components/ComUpImg/ComUpImg";
import { useNotification } from "../../../Notification/Notification";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import ComNumber from "../../../Components/ComInput/ComNumber";
import { postData } from "../../../api/api";
import ComTimePickerRange from './../../../Components/ComTimePickerRange/ComTimePickerRange';

export default function CreateNursingPackage({ isOpen, onClose }) {
  const [image, setImages] = useState([]);
  const { notificationApi } = useNotification();

  const CreateProductMessenger = yup.object({
    name: yup.string().required("textApp.CreateProduct.message.name"),
    // phone: yup
    //   .string()
    //   .trim()
    //   .matches(/^\d{10}$/, "textApp.CreateProduct.message.name")
    //   .required("textApp.CreateProduct.message.name"),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    defaultValues: {
      name: "",
      description: "",
      time: ["10:10", "10:10"],
    },
  });
  const { handleSubmit, register, setFocus, watch, setValue } = methods;
  function formatPriceToNumber(priceString) {
    const cleanedString = priceString.replace(/[^0-9]/g, "");
    return parseInt(cleanedString, 10);
  }
  const onChange = (data) => {
    const selectedImages = data;
    const newImages = selectedImages.map((file) => file.originFileObj);
    setImages(newImages);
  };
  const onSubmit = (data) => {
    console.log(data);
    // console.log(formatPriceToNumber(data.price));
    firebaseImgs(image).then((dataImg) => {
      console.log("ảnh nè : ", dataImg);
      const dataPost = {
        ...data,
        // price: formatPriceToNumber(data.price),
        imagePackage: dataImg[0],
      };
      postData(`/package-register`, dataPost)
        .then((e) => {
          notificationApi(
            "success",
            "tạo thành công",
            "đã tạo gói dịch vụ thành công!"
          );
          onClose();
        })
        .catch((error) => {
          console.log(error);
          notificationApi(
            "error",
            "tạo không thành công",
            "tạo gói dịch vụ không thành công!"
          );
        });
      onClose();
    });
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
                      label={"Tên ca"}
                      placeholder={"Tên"}
                      {...register("name")}
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComTimePickerRange
                      type="numbers"
                      // format=""
                      label={"Ngày tháng năm sinh"}
                      placeholder={["Thời gian bắt đầu", "Thời gian kết thúc"]}
                      {...register("time")}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <ComButton
                htmlType="submit"
                type="primary"
                className="block w-full rounded-md bg-indigo-600  text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Tạo mới
              </ComButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
