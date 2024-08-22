import React, { useEffect, useState } from "react";
import ComButton from "../../../Components/ComButton/ComButton";
import ComUpImg from "../../../Components/ComUpImg/ComUpImg";
import { getData, postData, putData } from "../../../api/api";
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
import { firebaseImg } from "../../../upImgFirebase/firebaseImg";
import ComUpImgOne from "../../../Components/ComUpImg/ComUpImgOne";
import { MonyNumber } from "../../../Components/MonyNumber/MonyNumber";
import { handleErrors } from "../../../Components/errorUtils/errorUtils";

export default function EditOneTime({ onClose, dataValue }) {
  const [image, setImages] = useState(null);
  const { notificationApi } = useNotification();
  const [selectedCategorie, setSelectedCategorie] = useState();
  const [mony, setMony] = useState(dataValue.price);
  const [registrationLimit, setregistrationLimit] = useState(
    dataValue.registrationLimit
  );
  const [category, setCategory] = useState([]);
  const [endDate, setEndDate] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhập tên dịch vụ"),
    eventDate: yup.string().required("Vui lòng nhập thời gian"),
    price: yup
      .string()
      .typeError("Vui lòng nhập giá tiền")
      .required("Vui lòng nhập giá tiền"),
    endRegistrationDate: yup.string().required("Vui lòng nhập thời gian"),
    servicePackageCategoryId: yup
      .string()
      .required("Vui lòng chọn thể loại dịch vụ"),
    description: yup.string().required("Vui lòng nhập tên dịch vụ"),
    registrationLimit: yup
      .number()
      .typeError("Vui lòng nhập số lượng")
      .required("Vui lòng nhập số lượng")
      .integer("Vui lòng nhập số nguyên")
      .min(
        dataValue?.totalOrder,
        `Vui lòng nhập lớn hơn hoặc bằng ${dataValue?.totalOrder}`
      ),
  });
  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    values: dataValue,
  });

  console.log("====================================");
  console.log(dataValue);
  console.log("====================================");
  const {
    handleSubmit,
    register,
    setFocus,
    watch,
    setValue,
    setError,
    trigger,
  } = methods;
  const disabledDate3Day6m = (current) => {
    const daysLater3 = moment().add(3, "days");
    const monthsLater6 = moment().add(6, "months");
    return current && (current < daysLater3 || current > monthsLater6);
  };
  const disabledDateEnd = (current) => {
    const daysLater3 = moment().add(3, "days");
    const fixedFutureDate = moment(watch("eventDate"), "YYYY-MM-DD");
    return current && (current < daysLater3 || current > fixedFutureDate);
  };

  useEffect(() => {
    setEndDate((e) => !e);
    setValue("endRegistrationDate", null);
  }, [watch("eventDate")]);

  const onChange = (data) => {
    const selectedImages = data;
    setImages(selectedImages);
  };
  useEffect(() => {
    getData("/service-package-categories?State=Active")
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
  useEffect(() => {
    setMony(dataValue.price);
    setregistrationLimit(dataValue.registrationLimit);
    setTimeout(() => {
      setValue("endRegistrationDate", dataValue.endRegistrationDate);
    }, 100);
  }, [dataValue]);
  const handleChange = (e, value) => {
    console.log(value);
    setSelectedCategorie(value);
    if (value.length === 0) {
      setValue("servicePackageCategoryId", null, { shouldValidate: true });
    } else {
      setValue("servicePackageCategoryId", value, { shouldValidate: true });
    }
  };
  useEffect(() => {
    setSelectedCategorie(dataValue?.servicePackageCategoryId);
  }, [dataValue, category]);
  const onSubmit = (data) => {
    setDisabled(true);
    const change = MonyNumber(
      data.price,
      (message) => setError("price", { message }), // Đặt lỗi nếu có
      () => setFocus("price") // Đặt focus vào trường price nếu có lỗi
    );
    if (change !== null) {
      if (image) {
        firebaseImg(image).then((dataImg) => {
          console.log("ảnh nè : ", dataImg);
          const dataPost = {
            ...data,
            imageUrl: dataImg,
            price: change,
            // servicePackageDates: [{ date: data.date}],
          };
          putData(`/service-package`, dataValue.id, dataPost)
            .then((e) => {
              notificationApi(
                "success",
                "Cập nhật thành công",
                "Cập nhật gói dịch vụ thành công!"
              );
              onClose();
              setDisabled(false);
            })
            .catch((error) => {
              console.log(error);
              handleErrors(error, setError, setFocus);
              setDisabled(false);
              notificationApi(
                "error",
                "Cập nhật không thành công",
                "Cập nhật gói dịch vụ không thành công!"
              );
              onClose();
            });
        });
      } else {
        firebaseImg(image).then((dataImg) => {
          console.log("ảnh nè : ", dataImg);
          const dataPost = {
            ...data,
            imageUrl: dataValue.imageUrl,
            price: change,
            // servicePackageDates: [{ date: data.date}],
          };
          putData(`/service-package`, dataValue.id, dataPost)
            .then((e) => {
              notificationApi(
                "success",
                "Cập nhật thành công",
                "Cập nhật gói dịch vụ thành công!"
              );
              setDisabled(false);
              onClose();
            })
            .catch((error) => {
              setDisabled(false);
              console.log(error);
              notificationApi(
                "error",
                "Cập nhật không thành công",
                "Cập nhật gói dịch vụ không thành công!"
              );
            });
          onClose();
        });
      }
    } else {
      setDisabled(false);
    }
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
                      label={"Tên dịch vụ"}
                      placeholder={"Tên dịch vụ"}
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
                      defaultValue={mony}
                      // min={1000}
                      value={mony}
                      onChangeValue={(e, value) => {
                        setValue(e, value, { shouldValidate: true });
                        setMony(value);
                      }}
                      min={1000}
                      label={"Số tiền"}
                      placeholder={"Vui lòng nhập số tiền"}
                      {...register("price")}
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
                      value={selectedCategorie}
                      onChangeValue={handleChange}
                      filterOption={(inputValue, option) =>
                        option.label
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      }
                      showSearch
                      seach
                      mode="default"
                      options={category}
                      required
                      {...register("servicePackageCategoryId")}
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComDatePicker
                      label="Chọn khoảng thời gian diễn ra"
                      required
                      disabledDate={disabledDate3Day6m}
                      {...register("eventDate")}
                      open={false}
                      inputReadOnly
                      disabled
                      // disabled={dataValue?.totalOrder === 0 ? false : true}
                      // Các props khác của RangePicker
                    />
                  </div>
                </div>
                {endDate || (
                  <div className="sm:col-span-1">
                    <div className="mt-2.5">
                      <ComDatePicker
                        label="Thời gian kết thúc đăng ký"
                        disabledDate={disabledDateEnd}
                        {...register("endRegistrationDate")}
                        open={false}
                        required
                        disabled
                        inputReadOnly
                      />
                    </div>
                  </div>
                )}
                {!endDate || (
                  <div className="sm:col-span-1">
                    <div className="mt-2.5">
                      <ComDatePicker
                        label="Thời gian kết thúc đăng ký"
                        disabledDate={disabledDateEnd}
                        {...register("endRegistrationDate")}
                        required
                        disabled
                        open={false}
                        inputReadOnly
                      />
                    </div>
                  </div>
                )}

                {checkbox || (
                  <div className="sm:col-span-2">
                    <div className="mt-2.5">
                      <ComNumber
                        type="text"
                        onChangeValue={(e, data) => {
                          setValue("number", data);
                          setregistrationLimit(data);
                        }}
                        defaultValue={registrationLimit}
                        min={1}
                        value={registrationLimit}
                        // max={10000}
                        label={`Số lượng người có thể tham gia (Đã đăng ký ${dataValue?.totalOrder} người)`}
                        placeholder={"Vui lòng nhập số lượng có thể tham gia"}
                        {...register("registrationLimit")}
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
                      placeholder={"Vui lòng nhập chi tiết "}
                      {...register("description")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComUpImgOne
                      onChange={onChange}
                      multiple={false}
                      imgUrl={dataValue.imageUrl}
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
                disabled={disabled}
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
