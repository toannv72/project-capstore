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
import { disabledDate } from "../../../Components/ComDateDisabled";
import { DateOfBirth } from "../../../Components/ComDateDisabled/DateOfBirth";
import ComSelect from "../../../Components/ComInput/ComSelect";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import ComNumber from "./../../../Components/ComInput/ComNumber";
import {
  addressRegex,
  cccdRegex,
  nameRegex,
  weightRegex,
} from "./../../../regexPatterns";

export default function CreateElder({ onClose, tableRef }) {
  const [image, setImages] = useState({});
  const { notificationApi } = useNotification();
  const [dataUser, setDataUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [dataRoom, setDataRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState();
  // const cccdRegex = /^(?:\d{9}|\d{12})$/;
  // const addressRegex =
  //   /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯăằắẳẵặâầấẩẫậêềếểễệôồốổỗộơờớởỡợưứừửữựỳỵỷỹý0-9\s,.'-]+$/;

  // const nameRegex =
  //   /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯăằắẳẵặâầấẩẫậêềếểễệôồốổỗộơờớởỡợưứừửữựỳỵỷỹý\s]+$/;
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
    roomId: yup.string().required("Vui lòng chọn phòng"),
    userId: yup.string().required("Vui lòng chọn người thân"),
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
    medicalRecord: yup.object({
      bloodType: yup.string().required("Vui lòng nhập nhóm máu"),
      weight: yup
        .string()
        .typeError("Vui lòng nhập cân nặng")
        .required("Vui lòng nhập cân nặng")
        .matches(weightRegex, "Cân nặng phải là số")
        .test(
          "min",
          "Cân nặng phải lớn hơn 10",
          (value) => parseFloat(value) > 10
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
          "Chiều cao phải lớn hơn 20 cm",
          (value) => parseFloat(value) > 20
        )
        .test(
          "max",
          "Chiều cao phải nhỏ hơn hoặc bằng 200 cm",
          (value) => parseFloat(value) <= 200
        ),
      underlyingDisease: yup.string().required("Vui lòng nhập đủ bệnh lý"),
      note: yup.string().required("Vui lòng nhập ghi chú"),
    }),
    // trường hợp đồng
    contract: yup.object({
      name: yup.string().required("Vui lòng nhập tên hợp đồng"),
      signingDate: yup.string().required("Vui lòng nhập ngày ký hợp đồng"),
      startDate: yup.string().required("Vui lòng nhập ngày bắt đầu hợp đồng"),
      endDate: yup.string().required("Vui lòng nhập ngày kết thúc hợp đồng"),
      price: yup
        .number()
        .typeError("Vui lòng nhập giá")
        .required("Vui lòng nhập giá")
        .min(0, "Giá không hợp lệ"),
      content: yup.string().required("Vui lòng nhập nội dung hợp đồng"),
      imageUrl: yup
        .string()
        .url("Vui lòng nhập URL hợp lệ")
        .required("Vui lòng nhập URL hình ảnh"),
      notes: yup.string().required("Vui lòng nhập ghi chú"),
      description: yup.string().required("Vui lòng nhập mô tả"),
    }),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    values: {
      phoneNumber: "",
      height: 20,
      weight: 20,
    },
  });
  const { handleSubmit, register, setFocus, watch, setValue, setError } =
    methods;

  const onSubmit = (data) => {
    firebaseImg(image).then((dataImg) => {
      console.log("ảnh nè : ", {
        ...data,
        imageUrl: dataImg,
      });
      postData("/elders", {
        ...data,
        imageUrl: dataImg,
      })
        .then((e) => {
          notificationApi("success", "tạo thành công", "đã tạo");
          setTimeout(() => {
            if (tableRef.current) {
              // Kiểm tra xem ref đã được gắn chưa
              tableRef.current.reloadData();
            }
          }, 100);
          onClose();
        })
        .catch((e) => {
          console.log("====================================");
          console.log(e);
          if (e.status === 409) {
            setError("cccd", {
              message: "Đã có cccd này rồi",
            });
            setFocus("cccd");
          }
          console.log("====================================");
        });
    });
  };

  useEffect(() => {
    reloadData();
  }, []);
  const handleChange = (e, value) => {
    console.log(value);
    setSelectedUser(value);
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
  const reloadData = () => {
    getData("/users?SortDir=Desc")
      .then((e) => {
        const dataForSelect = e?.data?.contends.map((item) => ({
          value: item.id,
          label: item.fullName,
          searchString:
            item.fullName + item.address + item.dateOfBirth + item.cccd,
        }));
        setDataUser(dataForSelect);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
    getData("/room?SortDir=Desc")
      .then((e) => {
        console.log(e?.data?.contends);
        const dataForSelect = e?.data?.contends.map((item) => ({
          value: item.id,
          label: `Khu:${item.name}/Phòng:${item.name}`,
        }));
        setDataRoom(dataForSelect);
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
  return (
    <div>
      <div className="p-4 bg-white ">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Tạo mới người già
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
                {/* <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComInput
                      type="numbers"
                      label={"Số điện thoại"}
                      placeholder={"Vui lòng nhập số điện thoại"}
                      {...register("phoneNumber")}
                      required
                    />
                  </div>
                </div> */}
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
                <div className="sm:col-span-2">
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
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      }
                      showSearch
                      mode="default"
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Thông tin hợp đồng
                  </h3>
                </div>
                <div className="sm:col-span-2">
                  <ComInput
                    type="text"
                    label="Tên hợp đồng"
                    placeholder="Vui lòng nhập tên hợp đồng"
                    {...register("contract.name")}
                    required
                  />
                </div>
                <div className="sm:col-span-1">
                  <ComDatePicker
                    label="Ngày ký hợp đồng"
                    type="numbers"
                    name={"contract.signingDate"}
                    placeholder="Vui lòng nhập ngày ký hợp đồng"
                    {...register("contract.signingDate")}
                    required
                  />
                </div>
                <div className="sm:col-span-1">
                  <ComDatePicker
                    label="Ngày bắt đầu hợp đồng"
                    placeholder="Vui lòng nhập ngày bắt đầu hợp đồng"
                    {...register("contract.startDate")}
                    required
                  />
                </div>
                <div className="sm:col-span-1">
                  <ComDatePicker
                    label="Ngày kết thúc hợp đồng"
                    placeholder="Vui lòng nhập ngày kết thúc hợp đồng"
                    {...register("contract.endDate")}
                    required
                  />
                </div>
                <div className="sm:col-span-1">
                  <ComNumber
                    label="Giá hợp đồng"
                    placeholder="Vui lòng nhập giá"
                    {...register("contract.price")}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <ComInput
                    type="text"
                    label="Nội dung hợp đồng"
                    placeholder="Vui lòng nhập nội dung hợp đồng"
                    {...register("contract.content")}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <ComInput
                    type="text"
                    label="URL hình ảnh"
                    placeholder="Vui lòng nhập URL hình ảnh"
                    {...register("contract.imageUrl")}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <ComTextArea
                    label="Ghi chú hợp đồng"
                    placeholder="Vui lòng nhập ghi chú"
                    rows={5}
                    {...register("contract.notes")}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <ComTextArea
                    label="Mô tả hợp đồng"
                    placeholder="Vui lòng nhập mô tả"
                    rows={5}
                    name="contract"
                    {...register("contract.description")}
                    required
                  />
                </div>

                {/* tạo bệnh án  */}
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  Thông tin bệnh án
                </h3>
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
                  <div className="mt-2.5">
                    <ComInput
                      type="text"
                      label={"Nhóm máu"}
                      placeholder={"Vui lòng nhập Nhóm máu"}
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
                      required
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
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <ComUpImgOne onChange={onChange} label={"Hình ảnh"} />
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
