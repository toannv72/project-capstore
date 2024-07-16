import React, { useEffect, useState } from "react";
import ComButton from "../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "../../../Notification/Notification";
import ComTextArea from "./../../../Components/ComInput/ComTextArea";
import ComNumber from "./../../../Components/ComInput/ComNumber";
import { putData } from "../../../api/api";
import { firebaseImg } from "../../../upImgFirebase/firebaseImg";
import ComUpImgOne from "../../../Components/ComUpImg/ComUpImgOne";
import { MonyNumber } from "../../../Components/MonyNumber/MonyNumber";

export default function EditNursingPackage({
  selectedData,
  tableRef,
  onClose,
}) {
  const [image, setImages] = useState([]);
  const [mony, setMony] = useState(selectedData.price);
  const [limit, setLimit] = useState(selectedData.registrationLimit);
  const [capacitys, setCapacitys] = useState(selectedData.capacity);
  const { notificationApi } = useNotification();
  // console.log(selectedData);
  useEffect(() => {
    setMony(selectedData.price);
    setLimit(selectedData.registrationLimit);
    setCapacitys(selectedData.capacity);
  }, [selectedData]);
  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhập tên gói"),
    description: yup.string().required("Vui lòng nhập chi tiết gói"),
    price: yup
      .string()
      .typeError("Vui lòng nhập giá tiền")
      .required("Vui lòng nhập giá tiền"),
    capacity: yup
      .number()
      .max(20, "vui lòng nhập nhỏ hơn 20 người")
      .min(1, "vui lòng nhập lớn hơn 1 người")
      .required("Vui lòng nhập số lượng ")
      .typeError("Vui lòng nhập số lượng "),
    numberOfNurses: yup
      .number()
      .max(20, "vui lòng nhập nhỏ hơn 20 người")
      .min(1, "vui lòng nhập lớn hơn 1 người")
      .required("Vui lòng nhập số lượng ")
      .typeError("Vui lòng nhập số lượng "),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    values: selectedData,
  });
  const { handleSubmit, register, setFocus, watch, setValue, setError } =
    methods;

  const onChange = (data) => {
    const selectedImages = data;
    setImages(selectedImages);
  };

  const onSubmit = (data) => {
    const change = MonyNumber(
      data.price,
      (message) => setError("price", { message }), // Đặt lỗi nếu có
      () => setFocus("price") // Đặt focus vào trường price nếu có lỗi
    );
    console.log(data);
    if (change !== null) {
      firebaseImg(image).then((dataImg) => {
        if (dataImg) {
          const dataPut = {
            ...data,
            price: change,
            imageUrl: dataImg,
          };
          putData(`/nursing-package`, selectedData.id, dataPut)
            .then((e) => {
              notificationApi(
                "success",
                "cập nhật thành công",
                "đã cập nhật gói dịch vụ thành công!"
              );
              tableRef();
              onClose();
            })
            .catch((error) => {
              console.log(error);
              notificationApi(
                "error",
                "Cập nhật không thành công",
                "Cập nhật gói dịch vụ không thành công!"
              );
            });
        } else {
          const dataPut = {
            ...data,
            price: change,
            imageUrl: selectedData.imageUrl,
          };
          putData(`/nursing-package`, selectedData.id, dataPut)
            .then((e) => {
              notificationApi(
                "success",
                "cập nhật thành công",
                "đã cập nhật gói dịch vụ thành công!"
              );
              tableRef();
              onClose();
            })
            .catch((error) => {
              console.log(error);
              notificationApi(
                "error",
                "Cập nhật không thành công",
                "Cập nhật gói dịch vụ không thành công!"
              );
            });
        }

        onClose();
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Cập nhật gói dưỡng lão
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
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComNumber
                      // type="text"
                      label={"Số lượng người một phòng "}
                      min={0}
                      placeholder={"Vui lòng nhập số lượng"}
                      defaultValue={capacitys}
                      value={capacitys}
                      onChangeValue={(e, value) => {
                        setValue(e, value, { shouldValidate: true });
                        setCapacitys(value);
                      }}
                      {...register("capacity")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComNumber
                      // type="text"
                      label={"Số lượng điều dưỡng "}
                      placeholder={"Vui lòng nhập số lượng"}
                      min={0}
                      defaultValue={limit}
                      value={limit}
                      onChangeValue={(e, value) => {
                        setValue(e, value, { shouldValidate: true });
                        setLimit(value);
                      }}
                      {...register("numberOfNurses")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComNumber
                      type="text"
                      money
                      defaultValue={mony}
                      value={mony}
                      onChangeValue={(e, value) => {
                        setValue(e, value, { shouldValidate: true });
                        setMony(value);
                      }}
                      label={"Số tiền"}
                      placeholder={"Vui lòng nhập số tiền"}
                      {...register("price")}
                      required
                    />
                  </div>
                </div>
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
                    <ComUpImgOne
                      onChange={onChange}
                      numberImg={1}
                      label={"Hình ảnh gói"}
                      required
                      imgUrl={selectedData.imageUrl}
                      multiple={false}
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
                Cập nhật
              </ComButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
