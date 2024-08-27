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
import ComUpImgOne from "../../../Components/ComUpImg/ComUpImgOne";
import { firebaseImg } from "./../../../upImgFirebase/firebaseImg";

const uniqueMeasureUnitNames = (measureUnits) => {
  const names = measureUnits.map((unit) => unit.name);
  return new Set(names).size === names.length;
};

export default function CreateMeasureUnit({ onClose, getDataApi, dataSelect }) {
  const [image, setImages] = useState(null);
  const { notificationApi } = useNotification();
  const [disabled, setDisabled] = useState(false);
  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhập tên chỉ số"),
    unitType: yup.string().required("Vui lòng nhập đơn vị chỉ số"),
    minValue: yup
      .number()
      .required("Vui lòng nhập đơn vị chỉ số")
      .moreThan(0, "Giá trị tối thiểu phải lớn hơn 0")
      .typeError("Vui lòng nhập ")
      .test(
        "is-less-than-max",
        "Giá trị tối thiểu phải nhỏ hơn giá trị tối đa",
        function (value) {
          const { maxValue } = this.parent;
          return value < maxValue;
        }
      ),
    maxValue: yup
      .number()
      .required("Vui lòng nhập đơn vị chỉ số")
      .moreThan(0, "Giá trị tối đa phải lớn hơn 0")
      .typeError("Vui lòng nhập ")

      .test(
        "is-more-than-min",
        "Giá trị tối đa phải lớn hơn giá trị tối thiểu",
        function (value) {
          const { minValue } = this.parent;
          return value > minValue;
        }
      ),
    description: yup.string().required("Vui lòng nhập mô tả"),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
  });

  const {
    handleSubmit,
    register,
    setFocus,
    watch,
    setValue,
    setError,
    control,
    reset,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "measureUnits",
  });

  const onSubmit = (data) => {
    setDisabled(true);
    console.log(data);

    postData(`/measure-unit?healthCategoryId=${dataSelect.id}`, { ...data })
      .then((e) => {
        notificationApi("success", "tạo thành công", "đã tạo chỉ số !");
        getDataApi();
        onClose();
        reset();setDisabled(false);
      })
      .catch((error) => {
        console.log(error);setDisabled(false);
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
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Thêm chỉ số mới
        </h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl ">
            <div className=" p-4">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <ComInput
                    type="text"
                    label={"Tên đơn vị đo lường"}
                    placeholder={"Tên đơn vị đo lường"}
                    {...register(`name`)}
                    required
                  />
                </div>
                <div className="sm:col-span-1">
                  <ComInput
                    type="text"
                    label={"Loại đơn vị"}
                    placeholder={"Loại đơn vị"}
                    {...register(`unitType`)}
                    required
                  />
                </div>
                <div className="sm:col-span-1">
                  <ComInput
                    type="numberFloat"
                    label={"Giá trị tối thiểu"}
                    placeholder={"Giá trị tối thiểu"}
                    {...register(`minValue`)}
                    required
                  />
                </div>
                <div className="sm:col-span-1">
                  <ComInput
                    type="numberFloat"
                    label={"Giá trị tối đa"}
                    placeholder={"Giá trị tối đa"}
                    {...register(`maxValue`)}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <ComTextArea
                    type="text"
                    rows={3}
                    label={"Mô tả đơn vị"}
                    placeholder={"Mô tả đơn vị"}
                    {...register(`description`)}
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
                Thêm mới
              </ComButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
