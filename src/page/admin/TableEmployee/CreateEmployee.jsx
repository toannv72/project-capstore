import React, { useState } from "react";
import ComButton from "./../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "./../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseImgs } from "../../../upImgFirebase/firebaseImgs";
import ComUpImg from "./../../../Components/ComUpImg/ComUpImg";
import { useNotification } from "./../../../Notification/Notification";
import ComSelect from "../../../Components/ComInput/ComSelect";
import ComDatePicker from "../../../Components/ComDatePicker/ComDatePicker";
import moment from "moment";

export default function CreateEmployee({ onClose }) {
  const [image, setImages] = useState([]);
  const { notificationApi } = useNotification();
  const dataBlock = [
    {
      label: "y tá",
      value: "y tá",
    },
    {
      label: "nhân viên",
      value: "nhân viên",
    },
  ];
  const CreateProductMessenger = yup.object({
    days: yup.string().required("Vui lòng nhập đủ họ và tên"),
    // phone: yup.string().required("Vui lòng nhập đủ họ và tên"),
  });
  const disabledDate = (current) => {
    const yearsAgo120 = moment().subtract(120, "years");
    const yearsLater120 = moment().add(120, "years");

    return current && (current < yearsAgo120 || current > yearsLater120);
  };
  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    defaultValues: {
      name: "",
      phone: "",
      role: "",
      days: "1-1-2000",
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
          Tạo tài khoản nhân viên
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
                      label={"Họ và Tên"}
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
                    <ComSelect
                      type="role"
                      size={"large"}
                      style={{
                        width: "100%",
                      }}
                      label="Chọn khu"
                      placeholder="Khu"
                      // mode="tags"
                      onChangeValue={(e, data) => setValue(e, data)}
                      mode="default"
                      options={dataBlock}
                      required
                      {...register("role")}
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComDatePicker
                      type="numbers"
                      disabledDate={disabledDate}
                      format="DD-MM-YYYY"
                      label={"Ngày tháng năm sinh"}
                      placeholder={"Vui lòng nhập Ngày tháng năm sinh "}
                      {...register("days")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComInput
                      type="text"
                      label={"Địa chỉ"}
                      placeholder={"Vui lòng nhập Địa chỉ"}
                      {...register("name")}
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
