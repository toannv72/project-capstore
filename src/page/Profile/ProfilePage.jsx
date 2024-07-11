import React, { Fragment, useState } from "react";
import * as yup from "yup";
import { CloseOutlined, LogoutOutlined, MoreOutlined } from "@ant-design/icons";
import { Modal, Space } from "antd";
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
const sortOptions = [{ name: "Chỉnh sửa", type: "edit" }];
export default function ProfilePage() {
  const [image, setImages] = useState([]);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const inputMessenger = yup.object({
    // fullname: yup.string().required("Vui lòng nhập họ và tên"),
    address: yup.string().required("Vui lòng nhập địa chỉ"),
    // cccd: yup.string().required("Vui lòng nhập cccd/cmnd"),
    // birth: yup.string().required("Vui lòng nhập ngày sinh"),
    phone: yup.string().required("Vui lòng nhập số điện thoại"),
    mail: yup
      .string()
      .trim()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập địa chỉ email"),
  });
  const [initialValues, setInitialValues] = useState({
    address: "",
    birth: "",
    phone: "",
    mail: "",
  });
  const methods = useForm({
    resolver: yupResolver(inputMessenger),
    defaultValues: {
      avatar: "",
      fullname: "",
      address: "",
      cccd: "",
      birth: "",
      phone: "",
      mail: "",
      gender: "",
    },
  });
  const { handleSubmit, register, setValue, reset } = methods;
  const onSubmit = (data) => {
    // firebaseImg(image[0]).then((e) => {
    //   setValue("avatar", e);
    //   console.log(1111, { ...data, avatar: e });
    // });
    setFormData(data);
    setIsConfirmationModalVisible(true);
  };
  const handleConfirmUpdate = () => {
    firebaseImg(image[0]).then((e) => {
      setValue("avatar", e);
      console.log(1111, { ...formData, avatar: e });

      // Hide the confirmation modal after update
      setIsConfirmationModalVisible(false);
      setIsEditing(false);
    });
  };

  const handleCancelUpdate = () => {
    setIsConfirmationModalVisible(false);
    reset();
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
  const disabledDate = (current) => {
    const yearsAgo120 = moment().subtract(120, "years");
    const yearsLater120 = moment().add(120, "years");

    return current && (current < yearsAgo120 || current > yearsLater120);
  };
  const handSend = (option) => {
    if (option === "edit") {
      setIsEditing(true);
      reset();
      setInitialValues({
        // Store initial values
        address: methods.getValues("address"),
        birth: methods.getValues("birth"),
        phone: methods.getValues("phone"),
        mail: methods.getValues("mail"),
      });
    }
  };
  console.log(isEditing);
  return (
    <div className="flex flex-col space-y-5 font-montserrat mb-1">
      <div className="grid grid-cols-3 gap-4">
        <div className="grid col-span-2 gap-4">
          <div className="p-3 rounded-md border border-fade">
            <div className="font-bold text-base">Cài đặt người dùng</div>
          </div>
          <div className="border border-fade p-3 rounded-md ">
            <div className="flex justify-between">
              <div>Thông tin người dùng</div>
              {isEditing ? (
                <CloseOutlined
                  onClick={() => {
                    setIsEditing(false);
                    setValue("address", initialValues.address);
                    setValue("birth", initialValues.birth);
                    setValue("phone", initialValues.phone);
                    setValue("mail", initialValues.mail);
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
                className="grid grid-cols-6 gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="col-span-6">
                  {!isEditing ? (
                    <img
                      className="h-25 w-25 rounded-full border border-gray-400"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  ) : (
                    <ComUpImgOne onChange={onChange} required />
                  )}
                </div>

                <div className="col-span-3">
                  <ComInput
                    placeholder="Nhập họ và tên"
                    label="Họ và tên"
                    type="text"
                    // maxLength={10}
                    {...register("fullname")}
                    required
                    disabled={isEditing}
                    readOnly={!isEditing}
                  />
                </div>

                <div className="col-span-3">
                  <ComDatePicker
                    label="Ngày sinh"
                    required
                    disabledDate={disabledDate}
                    {...register("birth")}
                    disabled={isEditing}
                    inputReadOnly={!isEditing}
                    open={isEditing}
                  />
                </div>
                <div className="col-span-3">
                  <ComInput
                    placeholder="Nhập số điện thoại"
                    label="Số điện thoại"
                    type="numbers"
                    maxLength={10}
                    {...register("phone")}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="col-span-3">
                  <ComInput
                    placeholder="Nhập email"
                    label="Email"
                    type="text"
                    {...register("mail")}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="col-span-3">
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
                <div className="col-span-6">
                  <ComInput
                    placeholder="Nhập địa chỉ"
                    label="Địa chỉ"
                    type="text"
                    {...register("address")}
                    readOnly={!isEditing}
                  />
                </div>
                {!isEditing ? (
                  <></>
                ) : (
                  <div className="col-start-2 sm:col-start-3 md:col-start-3 col-span-2">
                    <ComButton htmlType="submit" type="primary">
                      Cập nhật
                    </ComButton>
                  </div>
                )}
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
