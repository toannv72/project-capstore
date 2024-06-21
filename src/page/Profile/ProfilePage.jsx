import React, { Fragment, useEffect, useState } from "react";
import * as yup from "yup";
import { CloseOutlined, MoreOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import doctor from "../../assets/doctor.png";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ComInput from "../../Components/ComInput/ComInput";
import ComUpImgOne from "../../Components/ComUpImg/ComUpImgOne";
import ComButton from "../../Components/ComButton/ComButton";
import { firebaseImg } from "../../upImgFirebase/firebaseImg";
import ComDatePicker from "../../Components/ComDatePicker/ComDatePicker";
import moment from "moment";
import { Menu, Transition } from "@headlessui/react";
import { getData, putData } from "../../api/api";
import { addressRegex, phoneNumberRegex } from "../../regexPatterns";
import { useNotification } from "../../Notification/Notification";
const sortOptions = [{ name: "Cập nhật thông tin", type: "edit" }];
export default function ProfilePage() {
  const [image, setImages] = useState([]);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const { notificationApi } = useNotification();

  const [formData, setFormData] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const inputMessenger = yup.object({
    // fullname: yup.string().required("Vui lòng nhập họ và tên"),
    address: yup
      .string()
      .matches(addressRegex, "Vui lòng nhập địa chỉ hợp lệ")
      .required("Vui lòng nhập địa chỉ")
      .min(5, "Địa chỉ quá ngắn, vui lòng nhập tối thiểu 5 ký tự")
      .max(100, "Địa chỉ quá dài, vui lòng nhập tối đa 100 ký tự"),
    // cccd: yup.string().required("Vui lòng nhập cccd/cmnd"),
    // birth: yup.string().required("Vui lòng nhập ngày sinh"),
    phoneNumber: yup
      .string()
      .required("Vui lòng nhập đủ số điện thoại")
      .matches(phoneNumberRegex, "Vui lòng nhập số điện thoại hợp lệ"),
    email: yup.string().required("Vui lòng nhập địa chỉ email"),
  });
  const [initialValues, setInitialValues] = useState({
    address: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
  });
  const methods = useForm({
    resolver: yupResolver(inputMessenger),
    defaultValues: profile || {
      avatarUrl: "",
      fullName: "",
      address: "",
      cccd: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      gender: "",
    },
  });
  const { handleSubmit, register, setValue, reset, setError, setFocus } =
    methods;
  const onSubmit = (data) => {
    setFormData(data);
    setIsConfirmationModalVisible(true);
  };
  const handleConfirmUpdate = () => {
    firebaseImg(image).then((dataImg) => {
      if (dataImg) {
        const dataPut = { ...formData, avatarUrl: dataImg };
        putData(`/users`, "profile", dataPut)
          .then((e) => {
            notificationApi("success", "Chỉnh sửa thành công", "đã sửa");
            setTimeout(() => {}, 100);
            setIsConfirmationModalVisible(false);
            setIsEditing(false);
          })
          .catch((e) => {
            if (e.status === 409) {
              setError("phoneNumber", {
                message: "Đã có số điện thoại này",
              });
              setFocus("phoneNumber");
            }
          });
      } else {
        const dataPut = {
          ...formData,
          avatarUrl: methods.getValues("avatarUrl"),
        };
        putData(`/users`, "profile", dataPut)
          .then((e) => {
            notificationApi("success", "Chỉnh sửa thành công", "đã sửa");
            setTimeout(() => {}, 100);
            setIsConfirmationModalVisible(false);
            setIsEditing(false);
          })
          .catch((e) => {
            if (e.status === 409) {
              setError("phoneNumber", {
                message: "Đã có số điện thoại này",
              });
              setFocus("phoneNumber");
            }
          });
      }
      // Hide the confirmation modal after update
    });
  };

  const handleCancelUpdate = () => {
    setIsConfirmationModalVisible(false);
  };
  const handLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("use");
    setTimeout(() => {
      navigate("/login");
    }, 0);
  };
  const onChange = (data) => {
    const selectedImages = data;

    // Tạo một mảng chứa đối tượng 'originFileObj' của các tệp đã chọn
    // const newImages = selectedImages.map((file) => file.originFileObj);
    // Cập nhật trạng thái 'image' bằng danh sách tệp mới
    console.log([selectedImages]);
    setImages([selectedImages]);
    // setFileList(data);
  };

  const handSend = (option) => {
    if (option === "edit") {
      setIsEditing(true);
      reset();
      setInitialValues({
        // Store initial values
        address: methods.getValues("address"),
        birth: methods.getValues("dateOfBirth"),
        phone: methods.getValues("phoneNumber"),
        mail: methods.getValues("email"),
      });
    }
  };
  useEffect(() => {
    getData("/users/profile")
      .then((response) => {
        setProfile(response?.data);
        if (response?.data) {
          reset(response?.data);
          setValue("avatarUrl", response.data.avatarUrl);
        }
      })
      .catch((er) => {
        console.error("Error fetching items:", er);
      });
  }, [reset, setValue]);
  return (
    <div className="flex flex-col space-y-5 font-montserrat mb-1">
      <div className="grid grid-cols-3 gap-4">
        <div className="grid col-span-2 gap-4">
          <div className="p-3 rounded-md border border-fade">
            <div className="font-bold text-base">Cài đặt người dùng</div>
          </div>
          <div className="border border-fade p-3 rounded-md ">
            <div className="flex justify-between">
              <div></div>
              <div className="text-xl font-semibold">Thông tin người dùng</div>
              {isEditing ? (
                <CloseOutlined
                  onClick={() => {
                    setIsEditing(false);
                    setValue("address", initialValues.address);
                    setValue("dateOfBirth", initialValues.dateOfBirth);
                    setValue("phoneNumber", initialValues.phoneNumber);
                    setValue("email", initialValues.email);
                  }}
                />
              ) : (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      <MoreOutlined />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 w-40 origin-top-right rounded-lg bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none border-b-slate-300 border">
                      <div>
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            <div
                              onClick={() => handSend(option.type)}
                              className="block px-4 py-2 text-sm cursor-pointer text-gray-500 hover:bg-gray-200 hover:text-gray-900 hover:rounded-lg"
                            >
                              {option.name}
                            </div>
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>

            <FormProvider {...methods}>
              <form
                className="mx-auto mt-2 max-w-xl"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className=" overflow-y-auto p-2">
                  <div
                    className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
                    // style={{ height: "65vh" }}
                  >
                    <div className="">
                      {!isEditing ? (
                        <img
                          className="h-25 w-25 rounded-full border border-gray-400"
                          src={methods.getValues("avatarUrl")}
                          alt=""
                        />
                      ) : (
                        <ComUpImgOne
                          imgUrl={methods.getValues("avatarUrl")}
                          onChange={onChange}
                          required
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
                    // style={{ height: "65vh" }}
                  >
                    <div className="sm:col-span-1">
                      <div className="mt-2.5">
                        <ComInput
                          placeholder="Nhập họ và tên"
                          label="Họ và tên"
                          type="text"
                          // maxLength={10}
                          {...register("fullName")}
                          disabled={isEditing}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <div className="mt-2.5">
                        <ComDatePicker
                          label="Ngày sinh"
                          {...register("dateOfBirth")}
                          disabled={isEditing}
                          inputReadOnly={!isEditing}
                          open={isEditing}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="mt-2.5">
                        <ComInput
                          placeholder="Nhập email"
                          label="Email"
                          type="text"
                          {...register("email")}
                          readOnly={!isEditing}
                          required={isEditing}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-1">
                      <div className="mt-2.5">
                        <ComInput
                          placeholder="Nhập số điện thoại"
                          label="Số điện thoại"
                          type="numbers"
                          maxLength={10}
                          {...register("phoneNumber")}
                          readOnly={!isEditing}
                          required={isEditing}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <div className="mt-2.5">
                        <ComInput
                          placeholder="Nhập số Cccd/Cmnd"
                          label="Cccd"
                          type="numbers"
                          maxLength={12}
                          {...register("cccd")}
                          disabled={isEditing}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="mt-2.5">
                        <ComInput
                          placeholder="Nhập địa chỉ"
                          label="Địa chỉ"
                          type="text"
                          {...register("address")}
                          readOnly={!isEditing}
                          required={isEditing}
                        />
                      </div>
                    </div>
                  </div>
                  {!isEditing ? (
                    <div></div>
                  ) : (
                    <div className="flex flex-col md:flex-row md:justify-between text-center mt-3 gap-4">
                      <div className="md:order-2">
                        <ComButton htmlType="submit" type="primary">
                          Cập nhật
                        </ComButton>
                      </div>
                      <div className="md:order-1">
                        <ComButton
                          className="bg-gray-300"
                          onClick={() => {
                            setIsEditing(false);
                            setValue("address", initialValues.address);
                            setValue("dateOfBirth", initialValues.dateOfBirth);
                            setValue("phoneNumber", initialValues.phoneNumber);
                            setValue("email", initialValues.email);
                          }}
                        >
                          Hủy
                        </ComButton>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
        <div className="flex flex-col justify-between border border-fade p-3 rounded-md col-span-1">
          <div>
            <div className="text-center border-b-2 border-gray-300 text-base font-semibold">
              Xin chào! Gia Thành
            </div>
            <div className="text-base text-center text-gray-500">
              Cống hiến hết mình
            </div>
          </div>
          <img src={doctor} alt="" className="h-fit" />
        </div>
      </div>
      <Modal
        title="Xác nhận cập nhật"
        open={isConfirmationModalVisible}
        onOk={handleConfirmUpdate}
        onCancel={handleCancelUpdate}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn cập nhật thông tin không?</p>
      </Modal>
    </div>
  );
}
