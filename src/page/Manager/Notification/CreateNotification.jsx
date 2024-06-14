import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import ComInput from "../../../Components/ComInput/ComInput";
import ComSelect from "../../../Components/ComInput/ComSelect";
import ComButton from "../../../Components/ComButton/ComButton";
import ComDatePicker from "../../../Components/ComDatePicker/ComDatePicker";
import moment from "moment";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import { useNotification } from "../../../Notification/Notification";
export default function CreateNotification() {
  const { notificationApi } = useNotification();
  const formMessenger = yup.object({
    // title: yup.string().required("Vui lòng nhập chủ đề"),
    // receiver: yup.string().required("Vui lòng chọn người nhận"),
    // date: yup.string().required("Vui lòng chọn thời gian"),
    // description: yup.string().required("Vui lòng nhập nội dung"),
  });
  const dataBlock = [
    {
      label: "Điều Dưỡng",
      value: "nurse",
    },
    {
      label: "Nhân viên",
      value: "staff",
    },
  ];
  const disabledDate = (current) => {
    const yearsAgo120 = moment().subtract(120, "years");
    const yearsLater120 = moment().add(120, "years");

    return current && (current < yearsAgo120 || current > yearsLater120);
  };
  const methods = useForm({
    resolver: yupResolver(formMessenger),
    defaultValues: {
      title: "",
      receiver: "",
      description: "",
    },
  });
  const { handleSubmit, register, setFocus, watch, setValue, reset } = methods;
  const onSubmit = (data) => {
    console.log(data);
    notificationApi(
      "success",
      "tạo thành công",
      "đã tạo gói dịch vụ thành công!"
    );
  };
  return (
    <>
      <div className="grid grid-cols-6 mt-14">
        <div className="col-start-2 col-span-4 bg-slate-100 rounded-md p-4 border border-gray-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
            Tạo thông báo
          </h2>
          <FormProvider {...methods}>
            <form
              className="grid grid-cols-6 gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-span-6">
                <ComInput
                  placeholder="Chủ đề của thông báo"
                  label="Chủ đề"
                  type="text"
                  // maxLength={10}
                  {...register("title")}
                  required
                />
              </div>
              <div className="col-span-3">
                <ComSelect
                  type="role"
                  size={"large"}
                  style={{
                    width: "100%",
                  }}
                  label="Người nhận"
                  placeholder="Chọn người nhận"
                  // mode="tags"
                  onChangeValue={(e, data) => setValue("receiver", data)}
                  mode="default"
                  options={dataBlock}
                  required
                  {...register("receiver")}
                />
              </div>
              <div className="col-span-3">
                <ComDatePicker
                  type="numbers"
                  disabledDate={disabledDate}
                   
                  label={"Ngày thực hiện"}
                  placeholder={"Vui lòng chọn ngày"}
                  {...register("date")}
                  required
                />
              </div>
              <div className="col-span-6">
                <ComTextArea
                  type="text"
                  rows={5}
                  label={"Nội dung thông báo"}
                  placeholder={"Vui lòng nhập nội dung"}
                  {...register("description")}
                  required
                />
              </div>
              <div className="col-start-3 col-span-2">
                <ComButton
                  htmlType="submit"
                  type="primary"
                  className="block w-full rounded-md bg-indigo-600  text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Tạo thông báo
                </ComButton>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
