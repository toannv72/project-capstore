import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import ComInput from "../../../Components/ComInput/ComInput";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import ComDatePicker from "../../../Components/ComDatePicker/ComDatePicker";
import ComButton from "../../../Components/ComButton/ComButton";
import { putData } from "../../../api/api";
import { useNotification } from "../../../Notification/Notification";

export default function DetailPotentialCustomer({ onClose, selectedUser }) {
  const methods = useForm({
    values: selectedUser || {},
  });
  const { notificationApi } = useNotification();

  if (!selectedUser) {
    return (
      <div className="p-4 bg-white text-center">
        Không có dữ liệu người dùng
      </div>
    );
  }

  const userFields = [
    { label: "Họ và tên", key: "fullName", type: "text" },
    { label: "Số điện thoại", key: "phoneNumber", type: "numbers" },
    { label: "Email", key: "email", type: "email" },
    { label: "Chủ Đề", key: "title", type: "text" },
    { label: "Thời gian tạo", key: "createdAt", type: "date" },
    { label: "Địa chỉ", key: "address", type: "text" },
  ];
  const handleConfirm = () => {
    // call
    putData("/potential-customer", selectedUser?.id, {
      ...selectedUser,
      status: "Contacted",
    })
      .then((e) => {
        console.log(e);
        onClose();
        notificationApi(
          "success",
          "cập nhật thành công",
          "đã cập nhật phiếu đăng ký!"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="p-4 bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Chi tiết người dùng
      </h2>
      <div className="w-full bg-main h-1" />
      <div className="text-lg text-gray-300 text-center my-2">
        Thông tin khách hàng
      </div>
      <FormProvider {...methods}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {userFields.map((field) => {
            // Kiểm tra xem trường có phải là trường ngày tháng không
            if (field.type === "date") {
              return (
                <ComDatePicker // Sử dụng ComDatePicker cho trường ngày tháng
                  key={field.key}
                  label={field.label}
                  name={field.key}
                  inputReadOnly
                  open={false}
                  className="text-xs lg:text-base"
                  defaultValue={selectedUser[field.key]} // Đặt giá trị mặc định (nếu có)
                />
              );
            } else {
              // Sử dụng ComInput cho các trường khác
              return (
                <ComInput
                  key={field.key}
                  {...field}
                  name={field.key}
                  className="text-xs lg:text-base"
                  readOnly
                />
              );
            }
          })}

          <ComTextArea
            label="Mô tả"
            name="description"
            readOnly
            rows={4}
            className="col-span-full text-xs lg:text-base"
            value={selectedUser.description}
          />
        </div>
        <div className="mt-8 flex justify-center sm:justify-between">
          {" "}
          {/* Điều chỉnh layout cho nút */}
          {selectedUser.isChecked ? (
            <div onClick={() => onClose()}>
              <ComButton className="mx-auto">Xác nhận</ComButton>{" "}
            </div> // Nằm giữa khi isChecked là true
          ) : (
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div onClick={() => onClose()}>
                <ComButton className="lg:col-start-1">Xác nhận</ComButton>
              </div>
              <div onClick={() => handleConfirm()}>
                <ComButton className="lg:col-start-2">Đã phản hồi</ComButton>
              </div>
            </div>
          )}
        </div>
      </FormProvider>
    </div>
  );
}
