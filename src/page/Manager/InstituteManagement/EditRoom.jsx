import React, { useEffect, useState } from "react";
import ComButton from "./../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "./../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "./../../../Notification/Notification";
import { getData, postData, putData } from "../../../api/api";
import ComSelect from "./../../../Components/ComInput/ComSelect";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import { handleErrors } from "../../../Components/errorUtils/errorUtils";
import { error } from "./../../../language/vn";

export default function EditRoom({ dataSelect, onClose, getDataApi }) {
  const [dataBlock, setDataBlock] = useState([]);
  const [dataPackage, setDataPackage] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState();
  const [selectedPackage, setSelectedPackage] = useState();
  const { notificationApi } = useNotification();

  const [disabled, setDisabled] = useState(false);
  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhập tên phòng").trim(),
    blockId: yup.number().required("Vui chọn khu"),
    nursingPackageId: yup.number().required("Vui chọn gói dưỡng lão "),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    values: dataSelect,
  });
  const { handleSubmit, register, setFocus, watch, setValue, setError } =
    methods;
  console.log(dataSelect);

  useEffect(() => {
    setSelectedPackage(dataSelect?.nursingPackageId);
    setSelectedBlock(dataSelect?.blockId);
    return () => {};
  }, [dataSelect]);
  const onSubmit = (data) => {
    setDisabled(true);
    console.log(11111111111, data);
    putData(`/room`, data?.id, data)
      .then((e) => {
        setDisabled(false);
        notificationApi("success", "cập nhật thành công", "đã cập nhật phòng!");
        getDataApi();
        onClose();
        setDisabled(false);
      })
      .catch((error) => {
        console.log(error);
        handleErrors(error, setError, setFocus);
        notificationApi(
          "error",
          "cập nhật không thành công",
          "cập nhật không thành công phòng!"
        );
        setDisabled(false);

        if (error?.response?.data?.status === 409) {
          setError("name", {
            message: "Đã có phòng này rồi",
          });
        }
      });
  };

  useEffect(() => {
    getData("/block")
      .then((e) => {
        const dataForSelect = e?.data?.contends.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setDataBlock(dataForSelect);
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
  }, []);

  const handleChange = (e, value) => {
    console.log(value);
    setSelectedBlock(value);
    if (value.length === 0) {
      setValue("blockId", null, { shouldValidate: true });
    } else {
      setValue("blockId", value, { shouldValidate: true });
    }
  };
  const handleChange2 = (e, value) => {
    console.log(value);
    setSelectedPackage(value);
    if (value.length === 0) {
      setValue("nursingPackageId", null, { shouldValidate: true });
    } else {
      setValue("nursingPackageId", value, { shouldValidate: true });
    }
  };
  return (
    <div>
      <div className=" bg-white ">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl ">
            <div className=" overflow-y-auto p-4">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComInput
                      type="text"
                      label={"Tên phòng"}
                      placeholder={"Tên phòng"}
                      {...register("name")}
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
                      label="Chọn khu"
                      placeholder="Khu"
                      onChangeValue={handleChange}
                      value={selectedBlock}
                      // mode="tags"
                      mode="default"
                      options={dataBlock}
                      required
                      {...register("blockId")}
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
                      label="Chọn gói cho phòng"
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
                {/* <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComTextArea
                      type="text"
                      rows={5}
                      label={"Chi tiết gói "}
                      placeholder={"Miêu tả"}
                      {...register("description")}
                      required
                    />
                  </div>
                </div> */}
              </div>
            </div>

            <div className="mt-10 ">
              <ComButton
                htmlType="submit"
                disabled={disabled}
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
