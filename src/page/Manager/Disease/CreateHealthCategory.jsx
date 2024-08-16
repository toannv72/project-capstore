import React, { useState } from "react";
import ComButton from "./../../../Components/ComButton/ComButton";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import ComInput from "./../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseImgs } from "../../../upImgFirebase/firebaseImgs";
import ComUpImg from "./../../../Components/ComUpImg/ComUpImg";
import { useNotification } from "./../../../Notification/Notification";
import { postData } from "../../../api/api";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import { handleErrors } from "../../../Components/errorUtils/errorUtils";
import ComUpImgOne from "../../../Components/ComUpImg/ComUpImgOne";
import { firebaseImg } from "./../../../upImgFirebase/firebaseImg";

export default function CreateHealthCategory({ isOpen, onClose, getDataApi }) {
  const [image, setImages] = useState(null);
  const { notificationApi } = useNotification();
  const [disabled, setDisabled] = useState(false);
  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhập tên").trim(),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    defaultValues: {
      name: "",
    },
  });

  const {
    handleSubmit,
    register,
    setFocus,
    watch,
    setValue,
    setError,
    control,
    formState: { errors },
    reset,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "measureUnits",
  });
  const onSubmit = (data) => {
    setDisabled(true);
    console.log(data);
    postData(`/disease-category`, { ...data })
      .then((e) => {
        notificationApi("success", "Tạo thành công", "Đã tạo chỉ số !");
        getDataApi();
        onClose();
        setDisabled(false);
        reset();
      })
      .catch((error) => {
        console.log(error);
        if (error?.status === 409) {
          setError("name", {
            message: "Đã có tên loại bệnh này",
          });
          setFocus("name");
        }
        setDisabled(false);
        handleErrors(error, setError, setFocus);
      });
  };
  const onChange = (data) => {
    const selectedImages = data;
    setImages(selectedImages);
  };
  return (
    <div>
      <div className="  bg-white ">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl ">
            <div className=" p-4">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComInput
                      type="text"
                      label={"Tên loại bệnh"}
                      placeholder={"Tên loại bệnh"}
                      {...register("name")}
                      required
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
