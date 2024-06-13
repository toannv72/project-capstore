import React, { useState } from "react";
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

export  function CreateServicePackageCategories({
  onClose,
  tableRef,
}) {
  const [image, setImages] = useState([]);
  const { notificationApi } = useNotification();

  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhập tên thể loại"),
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
    postData(`/package-categories`, data)
      .then((e) => {
        notificationApi(
          "success",
          "tạo thành công",
          "đã tạo thể loại dịch vụ thành công!"
        );
     
        setTimeout(() => {
          if (tableRef.current) {
            // Kiểm tra xem ref đã được gắn chưa
            tableRef.current.reloadData();
          }
        }, 100); // Thời gian trì hoãn (có thể điều chỉnh)

        onClose();
      })
      .catch((error) => {
        console.log(error);
        notificationApi(
          "error",
          "tạo không thành công",
          "tạo thể loại dịch vụ không thành công!"
        );
      });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Tạo thể loại dịch vụ
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
