import React, { useEffect, useState } from "react";
import ComButton from "../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseImgs } from "../../../upImgFirebase/firebaseImgs";
import ComUpImg from "../../../Components/ComUpImg/ComUpImg";
import { useNotification } from "../../../Notification/Notification";

export default function EditContract({ selectedUser, onClose }) {
  const [image, setImages] = useState([]);
  const { notificationApi } = useNotification();

  const [disabled, setDisabled] = useState(false);
  const CreateProductMessenger = yup.object({
    name: yup.string().required("textApp.CreateProduct.message.name"),
    // phone: yup
    //   .string()
    //   .trim()
    //   .matches(/^\d{10}$/, "textApp.CreateProduct.message.name")
    //   .required("textApp.CreateProduct.message.name"),
  });
  useEffect(() => {
    setImages([]);
  }, [selectedUser]);
  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    defaultValues: {
      name: "",
      phone: "",
    },
    values: selectedUser,
  });
  const { handleSubmit, register, setFocus, watch, setValue } = methods;

  const onSubmit = (data) => {
    setDisabled(true);
    console.log(data);

    firebaseImgs(image).then((dataImg) => {
      setDisabled(false);
      console.log("ảnh nè : ", dataImg);
      notificationApi("error", "Cập nhật thành công", "đã sửa");
      onClose();
    });
  };

  const onChange = (data) => {
    const selectedImages = data;
    const newImages = selectedImages.map((file) => file.originFileObj);
    setImages(newImages);
  };
  return (
    <div>
      <div className="p-4 bg-white ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Chi tiết người dùng
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-4 max-w-xl sm:mt-8"
          >
            <div className=" overflow-y-auto p-4">
              <div
                className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
                // style={{ height: "65vh" }}
              >
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
                      label={"phone"}
                      placeholder={"phone"}
                      {...register("phone")}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <ComUpImg onChange={onChange} />
            <div className="mt-10">
              <ComButton
                htmlType="submit"
                type="primary"
                disabled={disabled}
                className="block w-full rounded-md bg-[#0F296D]  text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0F296D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cập nhật
              </ComButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
