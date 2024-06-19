import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import ComButton from "../../../Components/ComButton/ComButton";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import ComInput from "../../../Components/ComInput/ComInput";
import ComDatePicker from "../../../Components/ComDatePicker/ComDatePicker";

const DetailFeedback = ({ onClose, selectedUser }) => {
  const methods = useForm({
    values: selectedUser || {},
  });

  if (!selectedUser) {
    return (
      <div className="p-4 bg-white text-center">
        Không có dữ liệu người dùng
      </div>
    );
  }

  const userFields = [
    { label: "Người đánh giá", key: "fullName", type: "text" },
    { label: "Người hưởng", key: "elderName", type: "text" },
    { label: "Số điện thoại", key: "phoneNumber", type: "numbers" },
    { label: "Phòng", key: "room", type: "text" },
    { label: "Dịch vụ", key: "service", type: "text" },
    { label: "Người thực hiện", key: "nurseName", type: "text" },
    { label: "Ngày thực hiện", key: "serviceDate", type: "date" },
    { label: "Đánh giá", key: "feedback", type: "text" },
    { label: "Ngày đánh giá", key: "date", type: "date" },
  ];
  return (
    <div className="p-4 bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Thông tin chi tiết
      </h2>
      <div className="w-full bg-main h-1" />
      <div className="text-lg text-gray-300 text-center my-2">
        Thông tin đánh giá
      </div>
      <FormProvider {...methods}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {userFields.map((field) => {
            if (field.type === "date") {
              return (
                <ComDatePicker
                  key={field.key}
                  label={field.label}
                  name={field.key}
                  inputReadOnly
                  open={false}
                  className="text-xs lg:text-base"
                  defaultValue={selectedUser[field.key]}
                />
              );
            } else {
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
        <div
          className="mt-8 flex justify-center sm:justify-between"
          onClick={() => onClose()}
        >
          <ComButton className="mx-auto">Xác nhận</ComButton>
        </div>
      </FormProvider>
    </div>
  );
};

export default DetailFeedback;
