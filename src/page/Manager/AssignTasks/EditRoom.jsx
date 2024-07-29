import React, { useEffect, useState } from "react";
import ComButton from "./../../../Components/ComButton/ComButton";
import {
  FormProvider,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import ComInput from "./../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "./../../../Notification/Notification";
import { getData, putData } from "../../../api/api";
import ComSelect from "./../../../Components/ComInput/ComSelect";
import ComDatePicker from "../../../Components/ComDatePicker/ComDatePicker";
import dayjs from "dayjs";
import { handleErrors } from "../../../Components/errorUtils/errorUtils";

export default function EditRoom({ dataSelect, onClose, getDataApi }) {
  const [dataBlock, setDataBlock] = useState([]);
  const [dataPackage, setDataPackage] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const { notificationApi } = useNotification();

    const [disabled, setDisabled] = useState(false);
const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhập tên phòng").trim(),
    date: yup.string().required("Vui lòng chọn tháng"),
    blockId: yup.number().required("Vui chọn khu"),
    nursingPackageId: yup.number().required("Vui chọn gói dưỡng lão "),
    nurseSchedules: yup.array().of(
      yup.object({
        shiftWorkerName: yup.string().required("Vui lòng nhập tên điều dưỡng"),
        userNurseSchedules: yup
          .array()
          .of(
            yup.object({
              userId: yup.string().required("Vui lòng chọn người dùng"),
            })
          )
          .min(1, "Vui lòng thêm ít nhất 1 người dùng")
          .max(3, "Chỉ được thêm tối đa 3 người dùng"),
      })
    ),
    // .length(4, "Phải có đúng 4 ca trực"),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    defaultValues: {
      ...dataSelect,
      nurseSchedules: dataSelect.nurseSchedules || [
        {
          shiftWorkerName: "Employee_01",
          userNurseSchedules: [{}],
        },
        { shiftWorkerName: "Employee_02", userNurseSchedules: [{}], },
        { shiftWorkerName: "Employee_03", userNurseSchedules: [{}], },
        { shiftWorkerName: "Employee_04", userNurseSchedules: [{}], },
      ],
    },
  });
  const {
    handleSubmit,
    register,
    control,
    setFocus,
    setValue,
    setError,
    watch,
  } = methods;
  const { fields } = useFieldArray({
    control,
    name: "nurseSchedules",
  });

  useEffect(() => {
    setValue("nursingPackageId", dataSelect?.nursingPackageId);
    setValue("blockId", dataSelect?.blockId);
  }, [dataSelect, setValue]);

  const onSubmit = (data) => {
setDisabled(true);
    console.log(data);
    putData(`/room`, data?.id, data)
      .then((e) => {
        notificationApi("success", "Cập nhật thành công", "Đã cập nhật phòng!");
        getDataApi();
        onClose();setDisabled(false);
      })
      .catch((error) => {
        handleErrors(error, setError, setFocus);
        notificationApi(
          "error",
          "Cập nhật không thành công",
          "Cập nhật không thành công phòng!"
        );setDisabled(false);
        if (error?.response?.data?.status === 409) {
          setError("name", {
            message: "Đã có phòng này rồi",
          });
        }
      });
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("month");
  };

  useEffect(() => {
    getData("/users?SortDir=Desc")
      .then((e) => {
        const dataForSelect = e?.data?.contends.map((item) => ({
          value: item.id,
          label: `Tên: ${item.fullName} Số Đt: ${item.phoneNumber} CCCD: ${item.cccd}`,
        }));
        setDataUser(dataForSelect);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });

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

  return (
    <div>
      <div className=" bg-white ">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl ">
            <div className=" overflow-y-auto p-4">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComInput
                      type="text"
                      label={"Phòng"}
                      placeholder={"Tên phòng"}
                      {...register("name")}
                      readOnly
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComSelect
                      size={"large"}
                      style={{ width: "100%" }}
                      label="Khu"
                      placeholder="Khu"
                      onChange={(value) => setValue("blockId", value)}
                      value={watch("blockId")}
                      open={false}
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
                      style={{ width: "100%" }}
                      label="Gói dưỡng lão"
                      placeholder="Gói"
                      open={false}
                      onChange={(value) => setValue("nursingPackageId", value)}
                      value={watch("nursingPackageId")}
                      options={dataPackage}
                      required
                      {...register("nursingPackageId")}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComDatePicker
                      label="Tháng xếp lịch"
                      type="numbers"
                      name={"date"}
                      placeholder="Vui lòng nhập Tháng xếp lịch"
                      picker="month"
                      format={"MM-YYYY"}
                      onChangeValue={(name, date) => {
                        const [year, month] = date.split("-");

                        setValue("careMonth", month);
                        setValue("careYear", year);
                      }}
                      disabledDate={disabledDate}
                      {...register("date")}
                      required
                    />
                  </div>
                </div>
              </div>
              {fields.map((item, index) => (
                <div key={item.id} className="border p-4 mt-4">
                  <label className="text-paragraph font-bold">
                    {`Ca trực ${index + 1}`}
                  </label>
                  {/* <div className="sm:col-span-2">
                    <div className="mt-2.5">
                      <ComInput
                        type="text"
                        label={`Ca trực ${index + 1}`}
                        placeholder={`Tên điều dưỡng ${index + 1}`}
                        {...register(`nurseSchedules.${index}.shiftWorkerName`)}
                        readOnly
                        required
                      />
                    </div>
                  </div> */}
                  <div className="sm:col-span-2">
                    {item.userNurseSchedules.map((user, userIndex) => (
                      <div key={userIndex} className="mt-2.5">
                        <ComSelect
                          size={"large"}
                          style={{ width: "100%" }}
                          label="Y tá"
                          placeholder="Y tá"
                          onChangeValue={(name, value) => setValue(name, value)}
                          value={watch(
                            `nurseSchedules.${index}.userNurseSchedules.${userIndex}.userId`
                          )}
                          options={dataUser}
                          required
                          {...register(
                            `nurseSchedules.${index}.userNurseSchedules.${userIndex}.userId`
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 ">
              <ComButton
                htmlType="submit"
                disabled={disabled}
                type="primary"
                className="block w-full rounded-md bg-[#0F296D] text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0F296D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
