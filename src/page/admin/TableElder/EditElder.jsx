import React, { useEffect, useState } from "react";
import ComButton from "./../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "./../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseImgs } from "../../../upImgFirebase/firebaseImgs";
import ComUpImg from "./../../../Components/ComUpImg/ComUpImg";
import { useNotification } from "./../../../Notification/Notification";
import {
  addressRegex,
  cccdRegex,
  nameRegex,
  weightRegex,
} from "../../../regexPatterns";
import ComUpImgOne from "../../../Components/ComUpImg/ComUpImgOne";
import ComDatePicker from "../../../Components/ComDatePicker/ComDatePicker";
import ComSelect from "../../../Components/ComInput/ComSelect";
import { DateOfBirth } from "../../../Components/ComDateDisabled/DateOfBirth";
import { getData, putData } from "../../../api/api";
import ComNumber from "../../../Components/ComInput/ComNumber";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import { firebaseImg } from "../../../upImgFirebase/firebaseImg";
import { handleErrors } from "../../../Components/errorUtils/errorUtils";

export default function EditElder({ selectedData, onClose, tableRef }) {
  const [image, setImages] = useState(null);
  const { notificationApi } = useNotification();
  const [selectedUser, setSelectedUser] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [selectedGender, setSelectedGender] = useState();
  const [dataRoom, setDataRoom] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState();
  const [dataPackage, setDataPackage] = useState([]);

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
    // Hồ sơ người cao tuổi
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
      underlyingDisease: yup.string().required("Vui lòng nhập đủ bệnh lý"),
      note: yup.string().required("Vui lòng nhập ghi chú"),
    }),
  });

  useEffect(() => {
    setSelectedUser(selectedData?.userId);
    setSelectedRoom(selectedData?.roomId);
    setSelectedGender(selectedData?.gender);
  }, [selectedData]);

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    values: {
      ...selectedData,
      nursingPackageId: selectedData?.contractsInUse?.nursingPackage?.id,
    },
  });
  console.log(selectedData);
  const { handleSubmit, register, setFocus, watch, setValue, setError } =
    methods;

  const onSubmit = (data) => {
    if (image) {
      firebaseImg(image).then((dataImg) => {
        const dataPut = { ...data, imageUrl: dataImg };
        console.log(111111,dataPut);
        putData(`/elders`, selectedData.id, dataPut)
          .then((e) => {
            notificationApi("success", "Chỉnh sửa thành công", "đã sửa");
            setTimeout(() => {}, 100);
            tableRef();
            onClose();
          })
          .catch((error) => {
            console.log(error);
            notificationApi(
              "error",
              "Chỉnh sửa không thành công ",
              "Chỉnh sửa"
            );
            handleErrors(error, setError, setFocus);
          });
      });
    } else {
      const dataPut = { ...data, imageUrl: selectedData.imageUrl };
      console.log(22222222,dataPut);
      putData(`/elders`, selectedData.id, dataPut)
        .then((e) => {
          notificationApi("success", "Chỉnh sửa thành công", "đã sửa");
          setTimeout(() => {}, 100);
          tableRef();
          onClose();
        })
        .catch((error) => {
          console.log(error);
          notificationApi("error", "Chỉnh sửa không thành công ", "Chỉnh sửa");
          handleErrors(error, setError, setFocus);
          if (error.status === 409) {
            setError("phoneNumber", {
              message: "Đã có số điện thoại này",
            });
            setFocus("phoneNumber");
          }
        });
    }
  };

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
  useEffect(() => {
    reloadData();
  }, [selectedData]);

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
    getData(
      `/room?NursingPackageId=${selectedData?.contractsInUse?.nursingPackage?.id}`
    )
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
  };
  const onChange = (data) => {
    const selectedImages = data;
    console.log([selectedImages]);
    setImages(selectedImages);
  };
  return (
    <div>
      <div className="p-4 bg-white ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Chỉnh sửa thông tin người cao tuổi
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
                      showSearch
                      mode="default"
                      options={dataUser}
                      required
                      {...register("userId")}
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
                      // value={selectedGender}
                      value={watch("gender")}
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

                {/* tạo bệnh án  */}
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  Hồ sơ người cao tuổi
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
            <ComUpImgOne
              imgUrl={selectedData?.imageUrl}
              onChange={onChange}
              label={"Hình ảnh"}
            />
            <div className="mt-10">
              <ComButton
                htmlType="submit"
                type="primary"
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
