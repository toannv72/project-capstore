import React, { useState } from "react";
import ComButton from "./../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "./../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseImgs } from "../../../upImgFirebase/firebaseImgs";
import ComUpImg from "./../../../Components/ComUpImg/ComUpImg";
import { useNotification } from "./../../../Notification/Notification";
import ComRangePicker from "../../../Components/ComRangePicker/ComRangePicker";
import moment from "moment";
import ComDatePicker from "../../../Components/ComDatePicker/ComDatePicker";

export default function CreateContract({ onClose }) {
  const [image, setImages] = useState([]);
  const { notificationApi } = useNotification();
const disabledDate = (current) => {
  const yearsAgo120 = moment().subtract(120, "years");
  const yearsLater120 = moment().add(120, "years");

  return current && (current < yearsAgo120 || current > yearsLater120);
};
  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhập đủ họ và tên"),
    phone: yup.string().required("Vui lòng nhập đủ họ và tên"),
    day: yup.array().min(1, 'Vui lòng nhập ít nhất một ngày').required("Vui lòng nhập đủ họ và tên"),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    defaultValues: {
      name: "",
      phone: "",
    },
  });
  const { handleSubmit, register, setFocus, watch, setValue } = methods;

  const onSubmit = (data) => {
    console.log(data);

    firebaseImgs(image).then((dataImg) => {
      console.log("ảnh nè : ", dataImg);
      notificationApi("success", "tạo thành công", "đã tạo");
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
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Tạo thông tin hợp đồng
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-2 max-w-xl "
          >
            <div className=" overflow-y-auto p-2">
              <div
                className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
                // style={{ height: "65vh" }}
              >
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComInput
                      type="text"
                      label={"Họ và Tên người già"}
                      placeholder={"Vui lòng nhập Họ và Tên"}
                      {...register("name")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComInput
                      type="numbers"
                      label={"Số điện thoại"}
                      placeholder={"Vui lòng nhập số điện thoại"}
                      {...register("phone")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComInput
                      type="numbers"
                      label={"Số CMND hoặc CCCD "}
                      placeholder={"Vui lòng nhập số CMND hoặc CCCD "}
                      {...register("phone")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComDatePicker
                      label="Chọn khoảng thời gian"
                      required
                      format="DD-MM-YYYY"
                     
                      disabledDate={disabledDate}
                      {...register("days")}
                      // Các props khác của RangePicker
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComRangePicker
                      label="Chọn khoảng thời gian"
                      required
                      format="DD-MM-YYYY"
                      onChangeValue={(e, data) => {
                        setValue("day1", data[0]);
                        setValue("day2", data[1]);
                      }}
                      disabledDate={disabledDate}
                      {...register("day")}
                      // Các props khác của RangePicker
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
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
