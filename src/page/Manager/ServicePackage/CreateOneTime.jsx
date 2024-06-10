import React, { useEffect, useRef, useState } from "react";
import ComButton from "../../../Components/ComButton/ComButton";
import ComUpImg from "../../../Components/ComUpImg/ComUpImg";
import { getData, postData } from "../../../api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { firebaseImgs } from "../../../upImgFirebase/firebaseImgs";
import * as yup from "yup";
import ComInput from "../../../Components/ComInput/ComInput";
import ComNumber from "../../../Components/ComInput/ComNumber";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import moment from "moment";
import ComDatePicker from "../../../Components/ComDatePicker/ComDatePicker";
import ComSelect from "../../../Components/ComInput/ComSelect";
import { useNotification } from "../../../Notification/Notification";
import { Checkbox } from "antd";

export default function CreateOneTime({ onClose }) {
  const [image, setImages] = useState([]);
  const { notificationApi } = useNotification();
  const [selectedBlock, setSelectedBlock] = useState();
  const [category, setCategory] = useState([]);
  const [endDate, setEndDate] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhập tên dịch vụ"),
    endDay: yup.string().required("Vui lòng nhập tên dịch vụ"),
  });
  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    defaultValues: {
      name: "",
      // days: "2024-06-18",
      // endDay: "2024-06-12",
      description: "",
    },
  });
  const { handleSubmit, register, setFocus, watch, setValue, reset, trigger } =
    methods;
  const disabledDate3Day6m = (current) => {
    const daysLater3 = moment().add(3, "days");
    const monthsLater6 = moment().add(6, "months");
    return current && (current < daysLater3 || current > monthsLater6);
  };
  const disabledDateEnd = (current) => {
    const daysLater3 = moment().add(3, "days");
    const fixedFutureDate = moment(watch("days"), "DD-MM-YYYY");
    return current && (current < daysLater3 || current > fixedFutureDate);
  };

  useEffect(() => {
    setEndDate((e) => !e);
    setValue("endDay", null);
  }, [watch("days")]);
  const onChange = (data) => {
    const selectedImages = data;
    const newImages = selectedImages.map((file) => file.originFileObj);
    setImages(newImages);
  };
  useEffect(() => {
    getData("/block")
      .then((e) => {
        const dataForSelect = e?.data?.contends.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setCategory(dataForSelect);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);
  const onSubmit = (data) => {
    console.log(data);
    firebaseImgs(image).then((dataImg) => {
      console.log("ảnh nè : ", dataImg);
      const dataPost = { ...data, imagePackage: dataImg[0] };
      postData(`/package-register`, dataPost)
        .then((e) => {
          notificationApi(
            "success",
            "tạo thành công",
            "đã tạo gói dịch vụ thành công!"
          );
          onClose();
        })
        .catch((error) => {
          notificationApi(
            "error",
            "tạo không thành công",
            "tạo gói dịch vụ không thành công!"
          );
        });
      onClose();
    });
  };

  return (
    <div>
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

                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComNumber
                      type="text"
                      money
                      onChangeValue={(e, data) => {
                        setValue("price", data);
                      }}
                      defaultValue={1000}
                      min={1000}
                      label={"Số tiền"}
                      placeholder={"Vui lòng nhập số tiền"}
                      {...register("price1")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComSelect
                      size={"large"}
                      style={{
                        width: "100%",
                      }}
                      label="Chọn thể loại"
                      placeholder="Thể loại"
                      value={selectedBlock}
                      // mode="tags"
                      mode="default"
                      options={category}
                      required
                      {...register("blockId")}
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComDatePicker
                      label="Chọn khoảng thời gian diễn ra"
                      required
                      format="DD-MM-YYYY"
                      disabledDate={disabledDate3Day6m}
                      {...register("days")}
                      // Các props khác của RangePicker
                    />
                  </div>
                </div>
                {endDate || (
                  <div className="sm:col-span-1">
                    <div className="mt-2.5">
                      <ComDatePicker
                        label="Thời gian kết thúc đăng ký"
                        format="DD-MM-YYYY"
                        disabledDate={disabledDateEnd}
                        {...register("endDay")}
                        required
                      />
                    </div>
                  </div>
                )}
                {!endDate || (
                  <div className="sm:col-span-1">
                    <div className="mt-2.5">
                      <ComDatePicker
                        label="Thời gian kết thúc đăng ký"
                        format="DD-MM-YYYY"
                        disabledDate={disabledDateEnd}
                        {...register("endDay")}
                        required
                      />
                    </div>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <Checkbox onChange={(e) => setCheckbox(e.target.checked)}>
                      Dịch vụ có giới hạn số người đăng ký
                    </Checkbox>
                  </div>
                </div>
                {!checkbox || (
                  <div className="sm:col-span-1">
                    <div className="mt-2.5">
                      <ComNumber
                        type="text"
                      
                        onChangeValue={(e, data) => {
                          setValue("number", data);
                        }}
                        defaultValue={1}
                        min={1}
                        max={10000}
                        label={"Số lượng người "}
                        placeholder={"Vui lòng nhập số lượng"}
                        {...register("number")}
                        required
                      />
                    </div>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComTextArea
                      type="text"
                      rows={5}
                      label={"Chi tiết gói "}
                      placeholder={"description"}
                      {...register("description")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComUpImg
                      onChange={onChange}
                      numberImg={1}
                      multiple={false}
                      label={"Hình ảnh"}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <ComButton
                htmlType="submit"
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
