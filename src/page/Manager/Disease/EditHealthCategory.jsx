import React, { useState } from "react";
import ComButton from "./../../../Components/ComButton/ComButton";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import ComInput from "./../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "./../../../Notification/Notification";
import { postData, putData } from "../../../api/api";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import { handleErrors } from "../../../Components/errorUtils/errorUtils";

export default function EditHealthCategory({
  dataSelect,
  isOpen,
  onClose,
  getDataApi,
}) {
  const [image, setImages] = useState(null);
  const { notificationApi } = useNotification();
  const [disabled, setDisabled] = useState(false);
  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhập tên").trim(),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    values: { ...dataSelect, measureUnits: dataSelect.measureUnitsActive },
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
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "measureUnits",
  });

  const onSubmit = (data) => {
    setDisabled(true);

    putData(`/disease-category`, dataSelect.id, data)
      .then((e) => {
        notificationApi("success", "thành công", "đã cập nhật tên loại bệnh !");
        getDataApi();
        onClose();
        setDisabled(false);
      })
      .catch((error) => {
        console.log(error);
        setDisabled(false);
        handleErrors(error, setError, setFocus);
        if (error?.response?.status === 409) {
          setError("name", {
            message: "Đã có tên loại bệnh này",
          });
          setFocus("name");
        }
      });
  };
  const onChange = (data) => {
    const selectedImages = data;
    setImages(selectedImages);
  };
  return (
    <div>
      <div className="  bg-white ">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Cập nhật tên loại bệnh
        </h2>
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
            </div>
            <div className="mt-10">
              <ComButton
                htmlType="submit"
                disabled={disabled}
                type="primary"
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
