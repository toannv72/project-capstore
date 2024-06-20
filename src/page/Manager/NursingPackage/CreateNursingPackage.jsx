import React, { useEffect, useState } from "react";
import ComButton from "../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseImgs } from "../../../upImgFirebase/firebaseImgs";
import ComUpImg from "../../../Components/ComUpImg/ComUpImg";
import { useNotification } from "../../../Notification/Notification";
import ComTextArea from "./../../../Components/ComInput/ComTextArea";
import ComNumber from "./../../../Components/ComInput/ComNumber";
import { postData } from "../../../api/api";

export default function CreateNursingPackage({ isOpen, onClose }) {
  const [image, setImages] = useState([]);
  const [mony, setMony] = useState(1000);
  const { notificationApi } = useNotification();

  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhập tên gói"),
    description: yup.string().required("Vui lòng nhập chi tiết gói"),
    price: yup
      .number()
      .typeError("Vui lòng nhập giá tiền")
      .required("Vui lòng nhập giá tiền"),
    registrationLimit: yup
      .number()
      .required("Vui lòng nhập số lượng ")
      .typeError("Vui lòng nhập số lượng "),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    values: {
      name: "aa",
      description: "aa",
      price: 100000,
    },
  });
  const { handleSubmit, register, setFocus, watch, setValue } = methods;

  const onChange = (data) => {
    const selectedImages = data;
    const newImages = selectedImages.map((file) => file.originFileObj);
    setImages(newImages);
  };
  useEffect(() => {
    setTimeout(() => {
      setValue("price", mony);
    }, 1);
  }, [mony, watch("price")]);
  const onSubmit = (data) => {
    console.log(data);
    // console.log(formatPriceToNumber(data.price));
    firebaseImgs(image).then((dataImg) => {
      console.log("ảnh nè : ", dataImg);
      const dataPost = {
        ...data,
        imageUrl: dataImg[0],
      };
      postData(`/nursing-package`, dataPost)
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
                      label={"Tên"}
                      placeholder={"Tên"}
                      {...register("name")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComNumber
                      // type="text"
                      min={1}
                      label={"Số lượng người "}
                      placeholder={"Vui lòng nhập số lượng"}
                      {...register("registrationLimit")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComNumber
                      type="text"
                      money
                      // defaultValue={10000}
                      // min={1000}
                      onChangeValue={(e, value) => {
                        setValue(e, value);
                        setMony(value);
                      }}
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
                      placeholder={"description"}
                      {...register("description")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComUpImg
                      onChange={onChange}
                      numberImg={1}
                      label={"Hình ảnh gói"}
                      required
                      multiple={false}
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
