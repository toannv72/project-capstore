import React, { useState } from "react";
import ComButton from "./../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "./../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseImgs } from "../../../upImgFirebase/firebaseImgs";
import ComUpImg from "./../../../Components/ComUpImg/ComUpImg";
import { useNotification } from "./../../../Notification/Notification";
import { postData } from "../../../api/api";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import { handleErrors } from "../../../Components/errorUtils/errorUtils";

export default function CreateBlock({ isOpen, onClose, getDataApi }) {
  const [image, setImages] = useState([]);
  const { notificationApi } = useNotification();

  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhâp tên").trim(),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    defaultValues: {
      name: "",
    },
  });
  const { handleSubmit, register, setFocus, watch, setValue, setError } =
    methods;

  const onSubmit = (data) => {
    console.log(data);

    postData(`/block`, { ...data, totalFloor: 0 })
      .then((e) => {
        notificationApi("success", "tạo thành công", "đã tạo phòng!");
        getDataApi();
        onClose();
      })
      .catch((error) => {
        console.log(error);
        if (error?.data?.status === 409) {
          setError("name", {
            message: "Đã có khu này rồi",
          });
        }
        handleErrors(error, setError, setFocus);
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
                      label={"Tên khu"}
                      placeholder={"Tên khu"}
                      {...register("name")}
                      required
                    />
                  </div>
                </div>
                {/* <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComTextArea
                      type="text"
                      rows={5}
                      label={"Thông tin bổ sung"}
                      placeholder={"Thông tin bổ sung"}
                      {...register("description")}
                      required
                    />
                  </div>
                </div> */}
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
