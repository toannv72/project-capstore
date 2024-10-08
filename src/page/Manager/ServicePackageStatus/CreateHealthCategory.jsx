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

const uniqueMeasureUnitNames = (measureUnits) => {
  const names = measureUnits.map((unit) => unit.name);
  return new Set(names).size === names.length;
};

export default function CreateHealthCategory({ isOpen, onClose, getDataApi }) {
  const [image, setImages] = useState(null);
  const { notificationApi } = useNotification();
  const [disabled, setDisabled] = useState(false);
  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhập tên"),
    // description: yup.string().required("Vui lòng nhập tên"),
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
            )
            .test(
              "is-decimal-precision",
              "Giá trị tối thiểu chỉ được có 2 số sau dấu phẩy",
              function (value) {
                return /^-?\d+(\.\d{1,2})?$/.test(value);
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
            )
            .test(
              "is-decimal-precision",
              "Giá trị tối đa chỉ được có 2 số sau dấu phẩy",
              function (value) {
                return /^-?\d+(\.\d{1,2})?$/.test(value);
              }
            ),
          // description: yup.string().required("Vui lòng nhập mô tả"),
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
    defaultValues: {
      name: "",
      description: "",
      measureUnits: [{ name: "", unitType: "", description: "" }],
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
    if (image) {
      firebaseImg(image).then((imageUrl) => {
        postData(`/health-category`, { ...data, imageUrl })
          .then((e) => {
            notificationApi("success", "Tạo thành công", "Đã tạo chỉ số !");
            getDataApi();
            onClose();
            setDisabled(false);
            reset();
          })
          .catch((error) => {
            console.log(error);
            setDisabled(false);
            handleErrors(error, setError, setFocus);
          });
      });
    } else {
      notificationApi("error", "Không thành công", "Vui lòng nhập ảnh");
      setDisabled(false);
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
                          label={"Tên đơn vị đo"}
                          placeholder={"Tên đơn vị đo"}
                          {...register(`measureUnits.${index}.name`)}
                          required
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <ComInput
                          type="text"
                          label={"Đơn vị đo"}
                          placeholder={"Đơn vị đo"}
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
                    className="bg-blackpointer-events-auto rounded-md bg-[#0F296D] px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-[#0F296D] hover:text-white"
                  >
                    Thêm đơn vị đo lường
                  </button>
                </div>

                <div className="sm:col-span-2">
                  <ComUpImgOne
                    onChange={onChange}
                    label={"Hình ảnh chỉ số"}
                    required
                  />
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
