import React, { useState } from "react";
import ComButton from "../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseImgs } from "../../../upImgFirebase/firebaseImgs";
import ComUpImg from "../../../Components/ComUpImg/ComUpImg";
import { useNotification } from "../../../Notification/Notification";

export default function TableVisitation({ isOpen, onClose }) {
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
    },
  });
  const { handleSubmit, register, setFocus, watch, setValue } = methods;

  const onSubmit = (data) => {
    console.log(data);

    firebaseImgs(image).then((dataImg) => {
      console.log("ảnh nè : ", dataImg);
      notificationApi("error", "tạo thành công", "đã tạo");
      onClose();
    });
  };

  return (
    <div>
      <div className="  bg-white ">
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
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComInput
                      type="text"
                      label={"description"}
                      placeholder={"description"}
                      {...register("description")}
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
                className="block w-full rounded-md bg-[#0F296D]  text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0F296D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
