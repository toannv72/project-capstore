import React, { useState } from "react";
import * as yup from "yup";
import { LogoutOutlined } from "@ant-design/icons";
import { Modal, Radio, Space } from "antd";
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
export default function ProfilePage() {
  const [image, setImages] = useState([]);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const inputMessenger = yup.object({
    // fullname: yup.string().required("Vui lòng nhập họ và tên"),
    address: yup.string().required("Vui lòng nhập địa chỉ"),
    // cccd: yup.string().required("Vui lòng nhập cccd/cmnd"),
    // birth: yup.string().required("Vui lòng nhập ngày sinh"),
    phone: yup.string().required("Vui lòng nhập số điện thoại"),
    mail: yup.string().required("Vui lòng nhập địa chỉ email"),
  });
  const methods = useForm({
    resolver: yupResolver(inputMessenger),
    values: {
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
  const { handleSubmit, register, setValue } = methods;
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
  const onChangeGender = (e) => {
    console.log("radio checked", e.target.value);
    setValue("gender", e.target.value);
  };
  const disabledDate = (current) => {
    const yearsAgo120 = moment().subtract(120, "years");
    const yearsLater120 = moment().add(120, "years");

    return current && (current < yearsAgo120 || current > yearsLater120);
  };
  return (
    <div className="flex flex-col space-y-5 font-montserrat mb-1">
      <div className="bg-fade flex justify-between p-3 rounded-md">
        <div className="font-bold text-base">Cài đặt người dùng</div>
        <Space
          size="small"
          className="flex cursor-pointer text-red-600 text-base hidden"
        >
          <div onClick={() => handLogout()}>Đăng xuất</div>
          <LogoutOutlined />
        </Space>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-fade p-3 rounded-md col-span-2">
          <div>Thông tin người dùng</div>
          <FormProvider {...methods}>
            <form
              className="grid grid-cols-6 gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-span-6">
                <ComUpImgOne onChange={onChange} required />
              </div>

              <div className="col-span-3">
                <ComInput
                  placeholder="Nhập họ và tên"
                  label="Họ và tên"
                  type="text"
                  // maxLength={10}
                  {...register("fullname")}
                  required
                  disabled
                />
              </div>
              <div className="col-span-3">
                <div className="text-paragraph font-bold mb-6 md:mb-6 lg:mb-3 destop:mb-6 2xl:mb-6">
                  Giới tính
                </div>
                <Radio.Group
                  onChange={onChangeGender}
                  value={methods.watch("gender")}
                  disabled
                >
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              </div>
              <div className="col-span-3">
                <ComDatePicker
                  label="Ngày sinh"
                  required
                  format="DD-MM-YYYY"
                  disabledDate={disabledDate}
                  {...register("birth")}
                  disabled
                />
              </div>
              <div className="col-span-3">
                <ComInput
                  placeholder="Nhập số điện thoại"
                  label="Số điện thoại"
                  type="numbers"
                  maxLength={10}
                  {...register("phone")}
                />
              </div>
              <div className="col-span-3">
                <ComInput
                  placeholder="Nhập email"
                  label="Email"
                  type="text"
                  {...register("mail")}
                />
              </div>
              <div className="col-span-3">
                <ComInput
                  placeholder="Nhập số Cccd/Cmnd"
                  label="Cccd"
                  type="numbers"
                  maxLength={12}
                  {...register("cccd")}
                  disabled
                />
              </div>
              <div className="col-span-6">
                <ComInput
                  placeholder="Nhập địa chỉ"
                  label="Địa chỉ"
                  type="text"
                  {...register("address")}
                />
              </div>
              <div className="col-start-2 sm:col-start-3 md:col-start-3 col-span-2">
                <ComButton htmlType="submit" type="primary">
                  Cập nhật
                </ComButton>
              </div>
            </form>
          </FormProvider>
        </div>
        <div className="flex flex-col justify-between bg-fade p-3 rounded-md col-span-1">
          <div>
            <div className="text-center border-b-4 border-white text-base font-semibold">
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
