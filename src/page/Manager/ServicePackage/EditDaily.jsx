import React, { useEffect, useState } from "react";
import { Checkbox, Col, Row, Typography } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ComButton from "../../../Components/ComButton/ComButton";
import ComUpImgOne from "../../../Components/ComUpImg/ComUpImgOne";
import { getData, postData, putData } from "../../../api/api";
import { firebaseImg } from "../../../upImgFirebase/firebaseImg";
import ComInput from "../../../Components/ComInput/ComInput";
import ComNumber from "../../../Components/ComInput/ComNumber";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import ComSelect from "../../../Components/ComInput/ComSelect";
import { useNotification } from "../../../Notification/Notification";
import { MonyNumber } from "../../../Components/MonyNumber/MonyNumber";

const { Title } = Typography;

export default function EditDaily({ onClose, dataValue }) {
  const [image, setImages] = useState(null);
  const { notificationApi } = useNotification();
  const [selectedCategorie, setSelectedCategorie] = useState();
  const [category, setCategory] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [mony, setMony] = useState(dataValue.price);
  const [disabled, setDisabled] = useState(false);
  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhập tên dịch vụ"),
    price: yup
      .string()
      .typeError("Vui lòng nhập giá tiền")
      .required("Vui lòng nhập giá tiền"),
    servicePackageCategoryId: yup
      .string()
      .required("Vui lòng chọn thể loại dịch vụ"),
    description: yup.string().required("Vui lòng nhập chi tiết dịch vụ"),
  });
  console.log(selectedDays);
  console.log(dataValue);
  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    values: dataValue,
  });

  const {
    handleSubmit,
    register,
    setFocus,
    watch,
    setValue,
    setError,
    trigger,
  } = methods;

  const onChange = (data) => {
    const selectedImages = data;
    setImages(selectedImages);
  };
  useEffect(() => {
    setSelectedCategorie(dataValue?.servicePackageCategoryId);
  }, [dataValue, category]);
  useEffect(() => {
    setMony(dataValue.price);
    const daysArray = dataValue?.servicePackageDates?.map((item) =>
      item?.repetitionDay?.toString()
    );
    setSelectedDays(daysArray);
  }, [dataValue]);
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

  const handleChange = (e, value) => {
    console.log(value);
    setSelectedCategorie(value);
    if (value.length === 0) {
      setValue("servicePackageCategoryId", null, { shouldValidate: true });
    } else {
      setValue("servicePackageCategoryId", value, { shouldValidate: true });
    }
  };

  const handleCheckboxChange = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };
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
          const servicePackageDates = selectedDays.map((day) => ({
            // occurrenceDay: `2001-02-${day}`,
            repetitionDay: day,
          }));
          const dataPost = {
            ...data,
            imageUrl: dataImg,
            price: change,
            type: "MultipleDays",
            servicePackageDates,
          };
          console.log(1111, dataPost);
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
        });
      } else {
        firebaseImg(image).then((dataImg) => {
          const servicePackageDates = selectedDays.map((day) => ({
            // occurrenceDay: `2001-02-${day}`,
            repetitionDay: day,
          }));
          const dataPost = {
            ...data,
            imageUrl: dataValue.imageUrl,
            price: change,
            type: "MultipleDays",
            servicePackageDates,
          };
          console.log(1111, dataPost);
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
        });
      }
    } else {
      setDisabled(false);
    }
  };

  return (
    <div>
      <div className="bg-white">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl">
            <div className="overflow-y-auto p-4">
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
                      defaultValue={mony}
                      value={mony}
                      onChangeValue={(e, value) => {
                        setValue(e, value, { shouldValidate: true });
                        setMony(value);
                      }}
                      money
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
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <Title level={3}>Chọn ngày trong tháng</Title>
                    <Row gutter={[8, 8]}>
                      {[...Array(31).keys()].map((day) => (
                        <Col span={3} key={day + 1}>
                          <Checkbox
                            checked={selectedDays.includes(
                              String(day + 1).padStart(2, "0")
                            )}
                            onChange={() =>
                              handleCheckboxChange(
                                String(day + 1).padStart(2, "0")
                              )
                            }
                            className="text-blue-600"
                            disabled
                          >
                            {String(day + 1).padStart(2, "0")}
                          </Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComTextArea
                      type="text"
                      rows={5}
                      label={"Chi tiết gói"}
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
                className="block w-full rounded-md bg-[#0F296D] text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0F296D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
