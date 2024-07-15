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

export default function EditHealthCategory({dataSelect, isOpen, onClose, getDataApi }) {
  const [image, setImages] = useState(null);
  const { notificationApi } = useNotification();
  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhâp tên"),
    description: yup.string().required("Vui lòng nhâp tên"),
    measureUnits: yup
      .array()
      .of(
        yup.object({
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
        })
      )
      .min(1, "Cần ít nhất một đơn vị đo lường")
      .test(
        "unique-names",
        "Tên đơn vị đo lường phải khác nhau",
        uniqueMeasureUnitNames
      ),
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
    console.log(data);
    if (image) {
      console.log("có ảnh");
        firebaseImg(image).then((imageUrl) => {
          putData(`/health-category`, dataSelect.id, { ...data, imageUrl })
            .then((e) => {
              notificationApi("success", "tạo thành công", "đã tạo chỉ số !");
              getDataApi();
              onClose();
            })
            .catch((error) => {
              console.log(error);
              handleErrors(error, setError, setFocus);
            });
        });
    } else {
      console.log("ko có ảnh");

      putData(`/health-categorys`,dataSelect.id, { ...data, imageUrl: dataSelect.imageUrl })
        .then((e) => {
          notificationApi("success", "tạo thành công", "đã tạo chỉ số !");
          getDataApi();
          onClose();
        })
        .catch((error) => {
          console.log(error);
          handleErrors(error, setError, setFocus);
        });
    }
  
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
                      label={"Tên chỉ số"}
                      placeholder={"Tên chỉ số"}
                      {...register("name")}
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
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
                </div>
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="sm:col-span-2  p-4 rounded mb-4 border-[#4f46e5] border-2 "
                  >
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <ComInput
                          type="text"
                          label={"Tên đơn vị đo lường"}
                          placeholder={"Tên đơn vị đo lường"}
                          {...register(`measureUnits.${index}.name`)}
                          required
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <ComInput
                          type="text"
                          label={"Loại đơn vị"}
                          placeholder={"Loại đơn vị"}
                          {...register(`measureUnits.${index}.unitType`)}
                          required
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <ComInput
                          type="numberFloat"
                          label={"Giá trị tối thiểu"}
                          placeholder={"Giá trị tối thiểu"}
                          {...register(`measureUnits.${index}.minValue`)}
                          required
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <ComInput
                          type="numberFloat"
                          label={"Giá trị tối đa"}
                          placeholder={"Giá trị tối đa"}
                          {...register(`measureUnits.${index}.maxValue`)}
                          required
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <ComTextArea
                          type="text"
                          rows={3}
                          label={"Mô tả đơn vị"}
                          placeholder={"Mô tả đơn vị"}
                          {...register(`measureUnits.${index}.description`)}
                          required
                        />
                      </div>

                      <div className="sm:col-span-2 text-right">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="bg-blackpointer-events-auto rounded-md bg-red-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-red-800 hover:text-white"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {errors.measureUnits?.root?.message && (
                  <p className="text-red-600">
                    {errors.measureUnits?.root?.message}
                  </p>
                )}
                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={() =>
                      append({ name: "", unitType: "", description: "" })
                    }
                    className="bg-blackpointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 hover:text-white"
                  >
                    Thêm đơn vị đo lường
                  </button>
                </div>

                <div className="sm:col-span-2">
                  <ComUpImgOne
                    onChange={onChange}
                    label={"Hình ảnh chỉ số"}
                    imgUrl={dataSelect?.imageUrl}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <ComButton
                htmlType="submit"
                type="primary"
                className="block w-full rounded-md bg-indigo-600  text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
