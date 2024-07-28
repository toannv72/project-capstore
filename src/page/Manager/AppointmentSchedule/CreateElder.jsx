import React, { useEffect, useState } from "react";
import ComButton from "./../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "./../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseImgs } from "../../../upImgFirebase/firebaseImgs";
import ComUpImg from "./../../../Components/ComUpImg/ComUpImg";
import { useNotification } from "./../../../Notification/Notification";
import { getData, postData } from "../../../api/api";
import ComUpImgOne from "./../../../Components/ComUpImg/ComUpImgOne";
import { firebaseImg } from "./../../../upImgFirebase/firebaseImg";
import ComDatePicker from "../../../Components/ComDatePicker/ComDatePicker";
import {
  DateOfBirth,
  DateOfContract,
  DateOfLastDay,
} from "../../../Components/ComDateDisabled/DateOfBirth";
import ComSelect from "../../../Components/ComInput/ComSelect";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import {
  addressRegex,
  cccdRegex,
  nameRegex,
  weightRegex,
} from "./../../../regexPatterns";
import { handleErrors } from "../../../Components/errorUtils/errorUtils";
import moment from "moment";

export default function CreateElder({ onClose, tableRef, userID }) {
  const [image, setImages] = useState(null);
  const [image1, setImages1] = useState([]);
  const { notificationApi } = useNotification();
  const [dataUser, setDataUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [dataRoom, setDataRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState();
  const [selectedPackage, setSelectedPackage] = useState();
  const [dataPackage, setDataPackage] = useState([]);
  const [endDate, setEndDate] = useState(false);
  const [startDate, setStartDate] = useState(false);

  const CreateProductMessenger = yup.object({
    name: yup
      .string()
      .matches(
        nameRegex,
        "Vui lòng nhập tên hợp lệ (chỉ chứa chữ cái và dấu cách)"
      )
      .required("Vui lòng nhập tên")
      .min(2, "Tên quá ngắn, vui lòng nhập tối thiểu 2 ký tự")
      .max(50, "Tên quá dài, vui lòng nhập tối đa 50 ký tự"),
    // phoneNumber: yup.string().required("Vui lòng nhập đủ họ và tên"),
    dateOfBirth: yup.string().required("Vui lòng nhập đủ ngày tháng năm sinh"),
    nursingPackageId: yup.string().required("Vui lòng chọn gói"),
    roomId: yup.string().required("Vui lòng chọn phòng"),
    userId: yup.string().required("Vui lòng chọn người thân"),
    gender: yup.string().required("Vui lòng chọn chọn giới tính"),
    time: yup.string(),
    cccd: yup
      .string()
      .matches(
        cccdRegex,
        "Vui lòng nhập đúng số CMND hoặc CCCD (9 hoặc 12 chữ số)"
      )
      .required("Vui lòng nhập đủ số CMND hoặc CCCD"),
    address: yup
      .string()
      .matches(addressRegex, "Vui lòng nhập địa chỉ hợp lệ")
      .required("Vui lòng nhập địa chỉ")
      .min(5, "Địa chỉ quá ngắn, vui lòng nhập tối thiểu 5 ký tự")
      .max(100, "Địa chỉ quá dài, vui lòng nhập tối đa 100 ký tự"),
    // notes: yup.string().required("Vui lòng nhập ghi chú"),
    medicalRecord: yup.object({
      bloodType: yup.string().required("Vui lòng nhập nhóm máu"),
      weight: yup
        .string()
        .typeError("Vui lòng nhập cân nặng")
        .required("Vui lòng nhập cân nặng")
        .matches(weightRegex, "Cân nặng phải là số")
        .test(
          "min",
          "Cân nặng phải lớn hơn hoặc bằng 0",
          (value) => parseFloat(value) >= 0
        )
        .test(
          "max",
          "Cân nặng phải nhỏ hơn hoặc bằng 220",
          (value) => parseFloat(value) <= 220
        ),
      height: yup
        .string()
        .typeError("Vui lòng nhập chiều cao")
        .required("Vui lòng nhập chiều cao")
        .test(
          "min",
          "Chiều cao phải lớn hơn hoặc bằng 0 cm",
          (value) => parseFloat(value) >= 0
        )
        .test(
          "max",
          "Chiều cao phải nhỏ hơn hoặc bằng 200 cm",
          (value) => parseFloat(value) <= 200
        ),
      // underlyingDisease: yup.string().required("Vui lòng nhập đủ bệnh lý"),
      // note: yup.string().required("Vui lòng nhập ghi chú"),
    }),
    // trường hợp đồng
    contract: yup.object({
      name: yup.string().required("Vui lòng nhập số hợp đồng"),
      signingDate: yup.string().required("Vui lòng nhập ngày ký hợp đồng"),
      startDate: yup.string().required("Vui lòng nhập ngày bắt đầu hợp đồng"),
      endDate: yup.string().required("Vui lòng nhập ngày kết thúc hợp đồng"),
      // content: yup.string().required("Vui lòng nhập nội dung hợp đồng"),
      // imageUrl: yup
      //   .string()
      //   .url("Vui lòng nhập URL hợp lệ")
      //   .required("Vui lòng nhập URL hình ảnh"),
      // notes: yup.string().required("Vui lòng nhập ghi chú"),
      // description: yup.string().required("Vui lòng nhập mô tả"),
    }),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
  });
  const { handleSubmit, register, setFocus, watch, setValue, setError } =
    methods;
  function convertUrlsToObjects(urls) {
    return urls.map((url) => ({ imageUrl: url }));
  }
  useEffect(() => {
    setValue("userId", userID?.user?.id);
    setValue("nursingPackageId", userID?.nursingPackage?.id);
    setSelectedUser(userID?.user?.id);
    setSelectedPackage(userID?.nursingPackage?.id);
    handleChange2(1, userID?.nursingPackage?.id);
  }, [userID]);
  console.log(userID);
  const disabledDateEnd = (current) => {
    const oneMonths = moment().add(0, "months");
    const tenYearsLater = moment().add(10, "years");
    const startDate = watch("contract.startDate");
    const fixedFutureDate = startDate
      ? moment(startDate).add(1, "months")
      : null;
    return (
      current &&
      (current > tenYearsLater ||
        (fixedFutureDate && current < fixedFutureDate))
    );
  };
  const disabledDateStart = (current) => {
    const oneMonths = moment().add(0, "months");

    const tenYearsLater = moment().add(10, "years");
    const startDate = watch("contract.signingDate");
    const fixedFutureDate = startDate
      ? moment(startDate).add(0, "months")
      : null;
    return (
      current &&
      (current > tenYearsLater ||
        (fixedFutureDate && current < fixedFutureDate))
    );
  };
  useEffect(() => {
    setEndDate((e) => !e);
    setValue("contract.endDate", null);
    setTimeout(() => {
      handleDurationChange(watch("time"));
    }, 100);
  }, [watch("contract.startDate")]);

  useEffect(() => {
    setStartDate((e) => !e);
    setValue("contract.startDate", null);
  }, [watch("contract.signingDate")]);

  const handleDurationChange = (value) => {
    setValue("time", value);
    if (watch("contract.startDate")) {
      const startDate = new Date(watch("contract.startDate"));
      let endDate;

      switch (value) {
        case "0.5":
          endDate = new Date(startDate.setMonth(startDate.getMonth() + 6));
          break;
        case "1":
          endDate = new Date(
            startDate.setFullYear(startDate.getFullYear() + 1)
          );
          break;
        case "2":
          endDate = new Date(
            startDate.setFullYear(startDate.getFullYear() + 2)
          );
          break;
        case "3":
          endDate = new Date(
            startDate.setFullYear(startDate.getFullYear() + 3)
          );
          break;
        case "5":
          endDate = new Date(
            startDate.setFullYear(startDate.getFullYear() + 5)
          );
          break;
        case "10":
          endDate = new Date(
            startDate.setFullYear(startDate.getFullYear() + 10)
          );
          break;
        default:
          endDate = null;
      }

      if (endDate) {
        setValue("contract.endDate", endDate.toISOString().split("T")[0]);
      }
    }
  };

  const onSubmit = (data) => {
    console.log(1111, image);
    if (!image) {
      return notificationApi(
        "error",
        "Vui lòng chọn ảnh",
        "Vui lòng chọn hình ảnh người cao tuổi "
      );
    }
    if (Array.isArray(image1) && image1.length === 0) {
      notificationApi(
        "error",
        "Vui lòng chọn ảnh",
        "Vui lòng chọn hình ảnh hợp đồng "
      );
    } else {
      firebaseImgs(image1).then((dataImg1) => {
        console.log(dataImg1);
        setValue("contract.images", convertUrlsToObjects(dataImg1));
        firebaseImg(image).then((dataImg) => {
          postData("/elders", {
            ...data,
            imageUrl: dataImg,
          })
            .then((e) => {
              notificationApi("success", "tạo thành công", "đã tạo");
              setTimeout(() => {}, 100);
              onClose();
            })
            .catch((error) => {
              console.log(error);
              handleErrors(error, setError, setFocus);
              notificationApi("error", "tạo không thành công", "đã tạo");
            });
        });
      });
    }
  };

  useEffect(() => {
    reloadData();
  }, []);
  const handleChange = (e, value) => {
    // setSelectedUser(value);
    if (value.length === 0) {
      setValue("userId", null, { shouldValidate: true });
    } else {
      setValue("userId", value, { shouldValidate: true });
    }
  };
  const handleChangeRoom = (e, value) => {
    setSelectedRoom(value);
    if (value.length === 0) {
      setValue("roomId", null, { shouldValidate: true });
    } else {
      setValue("roomId", value, { shouldValidate: true });
    }
  };
  const handleChange2 = (e, value) => {
    setSelectedPackage(value);
    setSelectedRoom(null);
    setValue("roomId", null);
    getData(`/room?NursingPackageId=${value}`)
      .then((e) => {
        console.log(e?.data?.contends);
        const dataForSelect = e?.data?.contends.map((item) => ({
          value: item.id,
          label: `Phòng:${item.name}
          Khu:${item.name}
          Số giường trống:${item.totalBed - item.totalElder}`,
          disabled: item.totalBed - item.totalElder === 0,
        }));
        setDataRoom(dataForSelect);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
    if (value.length === 0) {
      setValue("nursingPackageId", null, { shouldValidate: true });
    } else {
      setValue("nursingPackageId", value, { shouldValidate: true });
    }
  };
  const reloadData = () => {
    getData("/users?SortDir=Desc")
      .then((e) => {
        const dataForSelect = e?.data?.contends.map((item) => ({
          value: item.id,
          label: `Tên: ${item.fullName} 
          Số Đt: ${item.phoneNumber} 
          CCCD: ${item.cccd}`,
        }));
        setDataUser(dataForSelect);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
    getData(`/room?NursingPackageId=${selectedPackage}`)
      .then((e) => {
        console.log(e?.data?.contends);
        const dataForSelect = e?.data?.contends.map((item) => ({
          value: item.id,
          label: `Phòng:${item.name}
          Khu:${item.name}
          Số giường trống:${item.totalBed - item.totalElder}`,
        }));
        setDataRoom(dataForSelect);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
    getData("/nursing-package")
      .then((e) => {
        const dataForSelects = e?.data?.contends.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setDataPackage(dataForSelects);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };
  const onChange = (data) => {
    const selectedImages = data;
    console.log([selectedImages]);
    setImages(selectedImages);
  };

  const onChange1 = (data) => {
    const selectedImages = data;
    const newImages = selectedImages.map((file) => file.originFileObj);
    setImages1(newImages);
  };

  return (
    <div>
      <div className="p-4 bg-white ">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Tạo mới người cao tuổi
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-2 max-w-xl "
          >
            <div className=" p-2">
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
                      label={"Số CMND hoặc CCCD "}
                      placeholder={"Vui lòng nhập số CMND hoặc CCCD "}
                      {...register("cccd")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComDatePicker
                      type="numbers"
                      disabledDate={DateOfBirth}
                      label={"Ngày tháng năm sinh"}
                      placeholder={"Vui lòng nhập Ngày tháng năm sinh "}
                      {...register("dateOfBirth")}
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
                      label="Chọn giới tính"
                      placeholder="Giới tính"
                      onChangeValue={(e, value) => {
                        if (value.length === 0) {
                          setValue("gender", null, { shouldValidate: true });
                        } else {
                          setValue("gender", value, { shouldValidate: true });
                        }
                      }}
                      // value={selectedUser}
                      mode="default"
                      options={[
                        {
                          value: "Male",
                          label: `Nam`,
                        },
                        {
                          value: "Female",
                          label: `Nữ`,
                        },
                      ]}
                      required
                      {...register("gender")}
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
                      label="Chọn người thân"
                      placeholder="Người thân"
                      onChangeValue={handleChange}
                      value={selectedUser}
                      filterOption={(inputValue, option) =>
                        option.searchString
                          ?.toLowerCase()
                          ?.includes(inputValue?.toLowerCase())
                      }
                      // showSearch
                      mode="default"
                      open={false}
                      options={dataUser}
                      required
                      {...register("userId")}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComSelect
                      size={"large"}
                      style={{
                        width: "100%",
                      }}
                      label="Chọn gói cho hợp đồng"
                      placeholder="Gói"
                      onChangeValue={handleChange2}
                      value={selectedPackage}
                      // mode="tags"
                      mode="default"
                      options={dataPackage}
                      required
                      {...register("nursingPackageId")}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComSelect
                      size={"large"}
                      style={{
                        width: "100%",
                      }}
                      label="Chọn phòng"
                      placeholder="Phòng"
                      onChangeValue={handleChangeRoom}
                      showSearch
                      value={selectedRoom}
                      // mode="tags"
                      mode="default"
                      options={dataRoom}
                      required
                      {...register("roomId")}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComInput
                      type="text"
                      label={"Địa chỉ"}
                      placeholder={"Vui lòng nhập Địa chỉ"}
                      {...register("address")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <ComTextArea
                    label="Ghi chú người cao tuổi"
                    placeholder="Vui lòng nhập ghi chú"
                    rows={5}
                    {...register("notes")}
                    // required
                  />
                </div>
                <div className="sm:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Thông tin hợp đồng
                  </h3>
                </div>
                <div className="sm:col-span-2">
                  <ComInput
                    type="text"
                    label="Mã hợp đồng"
                    placeholder="Vui lòng nhập mã hợp đồng"
                    {...register("contract.name")}
                    required
                  />
                </div>
                <div className="sm:col-span-1">
                  <ComDatePicker
                    label="Ngày ký hợp đồng"
                    type="numbers"
                    disabledDate={DateOfLastDay}
                    name={"contract.signingDate"}
                    placeholder="Vui lòng nhập ngày ký hợp đồng"
                    {...register("contract.signingDate")}
                    required
                  />
                </div>
                <div className="sm:col-span-1">
                  <ComSelect
                    size={"large"}
                    style={{
                      width: "100%",
                    }}
                    label="Thời hạn hợp đồng"
                    placeholder="Thời hạn"
                    onChangeValue={(e, value) => {
                      handleDurationChange(value);
                    }}
                    // value={selectedUser}
                    mode="default"
                    options={[
                      {
                        value: "0.5",
                        label: `6 tháng`,
                      },
                      {
                        value: "1",
                        label: `1 năm`,
                      },
                      {
                        value: "2",
                        label: `2 năm`,
                      },
                      {
                        value: "3",
                        label: `3 năm`,
                      },
                      {
                        value: "5",
                        label: `5 năm`,
                      },
                      {
                        value: "10",
                        label: `10 năm`,
                      },
                    ]}
                    // required
                    {...register("time")}
                  />
                </div>
                {startDate || (
                  <div className="sm:col-span-1">
                    <ComDatePicker
                      label="Ngày bắt đầu hợp đồng"
                      disabledDate={disabledDateStart}
                      name="contract"
                      placeholder="Vui lòng nhập ngày bắt đầu hợp đồng"
                      {...register("contract.startDate")}
                      required
                    />
                  </div>
                )}
                {!startDate || (
                  <div className="sm:col-span-1">
                    <ComDatePicker
                      label="Ngày bắt đầu hợp đồng"
                      disabledDate={disabledDateStart}
                      name="contract"
                      placeholder="Vui lòng nhập ngày bắt đầu hợp đồng"
                      {...register("contract.startDate")}
                      required
                    />
                  </div>
                )}
                {!endDate || (
                  <div className="sm:col-span-1">
                    <ComDatePicker
                      label="Ngày kết thúc hợp đồng"
                      disabledDate={disabledDateEnd}
                      name="contract"
                      placeholder="Vui lòng nhập ngày kết thúc hợp đồng"
                      {...register("contract.endDate")}
                      required
                    />
                  </div>
                )}
                {endDate || (
                  <div className="sm:col-span-1">
                    <ComDatePicker
                      label="Ngày kết thúc hợp đồng"
                      disabledDate={disabledDateEnd}
                      name="contract"
                      placeholder="Vui lòng nhập ngày kết thúc hợp đồng"
                      {...register("contract.endDate")}
                      required
                    />
                  </div>
                )}
                <div className="sm:col-span-2">
                  <ComTextArea
                    type="text"
                    label="Nội dung hợp đồng"
                    rows={5}
                    name="contract"
                    placeholder="Vui lòng nhập nội dung hợp đồng"
                    {...register("contract.content")}
                    // required
                  />
                </div>
                <div className="sm:col-span-2">
                  <ComUpImg
                    onChange={onChange1}
                    label={"Hình ảnh hợp đồng"}
                    required
                  />
                </div>
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  Hồ sơ người cao tuổi
                </h3>

                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComSelect
                      size={"large"}
                      type="text"
                      label={"Nhóm máu"}
                      style={{
                        width: "100%",
                      }}
                      onChangeValue={(e, value) => {
                        if (value.length === 0) {
                          setValue("medicalRecord.bloodType", null, {
                            shouldValidate: true,
                          });
                        } else {
                          setValue("medicalRecord.bloodType", value, {
                            shouldValidate: true,
                          });
                        }
                      }}
                      mode="default"
                      options={[
                        {
                          value: "Chưa có",
                          label: `Chưa có`,
                        },
                        {
                          value: "A",
                          label: `A`,
                        },
                        {
                          value: "B",
                          label: `B`,
                        },
                        {
                          value: "AB",
                          label: `AB`,
                        },
                        {
                          value: "O",
                          label: `O`,
                        },
                      ]}
                      placeholder={"Vui lòng chọn nhóm máu"}
                      {...register("medicalRecord.bloodType")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComInput
                      type="numberFloat"
                      label={"Cân nặng(KG)"}
                      placeholder={"Vui lòng nhập Cân nặng"}
                      {...register("medicalRecord.weight")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComInput
                      type="numberFloat"
                      label={"Chiều cao(Cm)"}
                      placeholder={"Vui lòng nhập Chiều cao"}
                      {...register("medicalRecord.height")}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComTextArea
                      type="text"
                      label={"Bệnh lý trước đó"}
                      placeholder={"Vui lòng nhập Bệnh lý"}
                      rows={5}
                      {...register("medicalRecord.underlyingDisease")}
                      // required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComTextArea
                      type="text"
                      label={"Ghi chú"}
                      placeholder={"Vui lòng nhập Ghi chú"}
                      rows={5}
                      {...register("medicalRecord.note")}
                      // required
                    />
                  </div>
                </div>
              </div>
            </div>
            <ComUpImgOne
              onChange={onChange}
              label={"Hình ảnh người cao tuổi"}
              required
            />
            <div className="mt-10">
              <ComButton
                htmlType="submit"
                type="primary"
                className="block w-full rounded-md bg-[#0F296D]  text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0F296D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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