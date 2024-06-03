import React, { useState } from "react";
import ComButton from "../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseImgs } from "../../../upImgFirebase/firebaseImgs";
import ComUpImg from "../../../Components/ComUpImg/ComUpImg";
import { useNotification } from "../../../Notification/Notification";
import ComTextArea from "./../../../Components/ComInput/ComTextArea";
import ComNumber from "./../../../Components/ComInput/ComNumber";
import { postData } from "../../../api/api";
import { Radio } from "antd";
import CreateOneTime from "./CreateOneTime";
import CreateDaily from "./CreateDaily";

export default function CreateServicePackage({ isOpen, onClose }) {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const viewCreate = () => {
    switch (value) {
      case 1:
        return <CreateOneTime onClose={onClose} />;

      case 2:
        return <CreateDaily onClose={onClose} />;

      default:
        break;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Tạo gói dưỡng lão
      </h2>
      <Radio.Group onChange={onChange} value={value}>
        <div className="grid grid-cols-2 gap-2 p-4 items-center">
          <Radio value={1}>
            Dịch vụ 1 ngày duy nhất
          </Radio>
          <Radio  value={2}>
            Dịch vụ lập lại theo ngày
          </Radio>
          <Radio value={3}>
            Dịch vụ lập lại theo tuần
          </Radio>
          <Radio value={4}>
            Dịch vụ không giới hạn thời gian
          </Radio>
        </div>
      </Radio.Group>
      {viewCreate()}
    </div>
  );
}
