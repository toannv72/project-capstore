import React, { Fragment, useEffect, useState } from "react";
import * as yup from "yup";
import { CloseOutlined, MoreOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import doctor from "../../assets/doctor.png";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ComInput from "../../Components/ComInput/ComInput";
import ComUpImgOne from "../../Components/ComUpImg/ComUpImgOne";
import ComButton from "../../Components/ComButton/ComButton";
import { firebaseImg } from "../../upImgFirebase/firebaseImg";
import ComDatePicker from "../../Components/ComDatePicker/ComDatePicker";
import { Menu, Transition } from "@headlessui/react";
import { getData, putData } from "../../api/api";
import { addressRegex, phoneNumberRegex } from "../../regexPatterns";
import { useNotification } from "../../Notification/Notification";
const sortOptions = [{ name: "Cập nhật thông tin", type: "edit" }];
export default function ProfilePage() {
  const [image, setImages] = useState(null);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const { notificationApi } = useNotification();
  const [formData, setFormData] = useState(null);
  const [profile, setProfile] = useState(null);
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
    // phoneNumber: yup
    //   .string()
    //   .required("Vui lòng nhập đủ số điện thoại")
    //   .matches(phoneNumberRegex, "Vui lòng nhập số điện thoại hợp lệ"),
    email: yup
      .string()
      .trim()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập địa chỉ email"),
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
    if (image) {
      firebaseImg(image).then((dataImg) => {
        const dataPut = { ...formData, avatarUrl: dataImg };
        console.log("1111", dataPut);
        putData(`/users`, "profile", dataPut)
          .then((e) => {
            notificationApi("success", "Cập nhật thành công", "Đã cập nhật");
            setTimeout(() => {}, 100);
            setIsConfirmationModalVisible(false);
            setIsEditing(false);
            getAPI();
          })
          .catch((e) => {
            if (e.status === 409) {
              setError("phoneNumber", {
                message: "Đã có số điện thoại này",
              });
              setFocus("phoneNumber");
            }
          });
      });
    } else {
      const dataPut = {
        ...formData,
        avatarUrl: methods.getValues("avatarUrl"),
      };
      console.log(dataPut);
      putData(`/users`, "profile", dataPut)
        .then((e) => {
          notificationApi("success", "Cập nhật thành công", "Đã cập nhật");
          setTimeout(() => {}, 100);
          setIsConfirmationModalVisible(false);
          setIsEditing(false);
          getAPI();
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
  };

  const handleCancelUpdate = () => {
    setIsConfirmationModalVisible(false);
    scrollToTop();
  };
  const onChange = (data) => {
    const selectedImages = data;

    // Tạo một mảng chứa đối tượng 'originFileObj' của các tệp đã chọn
    // const newImages = selectedImages.map((file) => file.originFileObj);
    // Cập nhật trạng thái 'image' bằng danh sách tệp mới
    console.log(selectedImages);
    setImages(selectedImages);
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
      scrollToTop();
    }
  };
  const getAPI = () => {
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
  };
  useEffect(() => {
    getAPI();
  }, [reset, setValue]);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="flex flex-col gap-2 justify-center items-center py-3">
        <div className="lg:w-4/5 xl:w-1/2 border border-fade pt-6 px-10 pb-8 rounded-md ">
          {isEditing ? (
            <div className="flex justify-between">
              <div className="flex-grow"></div>
              <div className="text-base font-semibold sm:ml-7">
                Cập nhật thông tin
              </div>
              <div className="flex-grow flex justify-end">
                <CloseOutlined
                  onClick={() => {
                    setIsEditing(false);
                    setValue("address", profile.address);
                    setValue("dateOfBirth", profile.dateOfBirth);
                    setValue("phoneNumber", profile.phoneNumber);
                    setValue("email", profile.email);
                    scrollToTop();
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-between">
              <div className="flex-grow"></div>
              <div className="text-base font-semibold sm:ml-7">
                Thông tin cá nhân
              </div>
              <div className="flex-grow flex justify-end">
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="group inline-flex items-center justify-center font-medium p-1 text-gray-700 hover:text-gray-900">
                    <MoreOutlined className="text-xl" />
                  </Menu.Button>

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
              </div>
            </div>
          )}
          <FormProvider {...methods}>
            <form
              className="mx-auto mt-2 max-w-xl"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="overflow-y-auto p-2">
                <div className="flex justify-center items-center w-full">
                  {!isEditing ? (
                    <img
                      className="h-25 w-25 rounded-full border border-gray-400"
                      src={methods.getValues("avatarUrl")}
                      alt=""
                    />
                  ) : (
                    <div className="flex flex-col sm:justify-center gap-2 sm:items-center">
                      <ComUpImgOne
                        imgUrl={methods.getValues("avatarUrl")}
                        onChange={onChange}
                      />
                      <span className="text-xs text-gray-400">
                        Bấm vào ảnh để thay đổi ảnh đại diện
                      </span>
                    </div>
                  )}
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
                        disabled={isEditing}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <div className="mt-2.5">
                      <ComInput
                        placeholder="Nhập số CMND/CCCD"
                        label="CMND/CCCD"
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
                  <div className="flex flex-col lg:flex-row md:justify-between text-center mt-3 gap-4">
                    <div className="lg:order-2">
                      <ComButton htmlType="submit" type="primary">
                        Cập nhật
                      </ComButton>
                    </div>
                    <div className="lg:order-1">
                      <ComButton
                        className="bg-slate-200 border-slate-100"
                        onClick={() => {
                          setIsEditing(false);
                          setValue("address", profile.address);
                          setValue("dateOfBirth", profile.dateOfBirth);
                          setValue("phoneNumber", profile.phoneNumber);
                          setValue("email", profile.email);
                          scrollToTop();
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
    </>
  );
}
