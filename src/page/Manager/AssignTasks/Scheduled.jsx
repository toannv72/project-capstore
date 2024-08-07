import React, { useEffect, useState } from "react";
import ComButton from "./../../../Components/ComButton/ComButton";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import ComInput from "./../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "./../../../Notification/Notification";
import { getData, postData, putData } from "../../../api/api";
import ComSelect from "./../../../Components/ComInput/ComSelect";
import ComDatePicker from "../../../Components/ComDatePicker/ComDatePicker";
import dayjs from "dayjs";
import { handleErrors } from "../../../Components/errorUtils/errorUtils";
import { cloneDeep } from "lodash";
export default function Scheduled({ dataSelect, onClose, getDataApi }) {
  const [dataBlock, setDataBlock] = useState([]);
  const [dataPackage, setDataPackage] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [employeeType, setEmployeeType] = useState([]);
  const [employeeTypeID1, setEmployeeTypeID1] = useState("");
  const [employeeTypeID2, setEmployeeTypeID2] = useState("");
  const [employeeTypeID3, setEmployeeTypeID3] = useState("");
  const [selectedNurses, setSelectedNurses] = useState([]);
  const { notificationApi } = useNotification();
  const [disabled, setDisabled] = useState(false);
  console.log(dataSelect.nursingPackage?.numberOfNurses);
  console.log(employeeType);
  const CreateProductMessenger = yup.object({
    date: yup.string().required("Vui lòng chọn tháng"),
    careMonth: yup.number().required("Vui lòng chọn tháng chăm sóc"),
    careYear: yup.number().required("Vui lòng chọn năm chăm sóc"),
    rooms: yup.array().of(
      yup.object({
        id: yup.number().required("Vui lòng nhập ID phòng"),
      })
    ),
    employeeSchedules: yup.array().of(
      yup.object({
        userId: yup.string().required("Vui lòng nhập tên điều dưỡng"),
        employeeTypeId: yup.number().required("Vui lòng chọn loại nhân viên"),
      })
    ),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    values: {
      ...dataSelect,
      rooms: dataSelect.rooms || [{ id: dataSelect.id }],
      employeeSchedules: generateEmployeeSchedules(
        dataSelect.nursingPackage?.numberOfNurses,
        employeeTypeID1,
        employeeTypeID2,
        employeeTypeID3
      ),
      notes: dataSelect.notes || "string",
    },
  });
  // Hàm tạo mảng employeeSchedules
  function generateEmployeeSchedules(numberOfNurses, ...employeeTypeIds) {
    const schedules = [];
    const numEmployeeTypes = employeeTypeIds.length;

    for (let i = 0; i < numberOfNurses * numEmployeeTypes; i++) {
      const employeeTypeId = employeeTypeIds[i % numEmployeeTypes];
      schedules.push({
        employeeTypeId,
        userId: "", // Hoặc bạn có thể set một giá trị mặc định nào đó
      });
    }

    return cloneDeep(schedules); // Tránh tham chiếu trực tiếp
  }

  const {
    handleSubmit,
    register,
    control,
    setFocus,
    setValue,
    setError,
    watch,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "employeeSchedules",
  });

  useEffect(() => {
    setValue("nursingPackageId", dataSelect?.nursingPackageId);
    setValue("blockId", dataSelect?.blockId);
  }, [dataSelect, setValue]);

  const onSubmit = (data) => {
    setDisabled(true);
    console.log(data);
    postData(`/care-schedule`, data)
      .then((e) => {
        console.log(e);
        notificationApi("success", "Thành công", "Đã xếp lịch!");
        getDataApi();
        onClose();
        setDisabled(false);
      })
      .catch((error) => {
        handleErrors(error, setError, setFocus);
        notificationApi(
          "error",
          "Không thành công",
          "Xếp lịch không thành công !"
        );
        setDisabled(false);
      });
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("month");
  };

  useEffect(() => {
    getData(
      `users?RoleName=Nurse&CareMonth=${watch("careMonth")}&CareYear=${watch(
        "careYear"
      )}&Name=NV3`
    )
      .then((e) => {
        const dataForSelect = e?.data?.contends.map((item) => ({
          value: item.id,
          disabled: false,
          label: `Tên: ${item.fullName} 
          Số Đt: ${item.phoneNumber} 
          CCCD: ${item.cccd}`,
        }));
        setDataUser(dataForSelect);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, [watch("careMonth"), watch("careYear"), dataSelect]);

  useEffect(() => {
    setDataUser([]);
    setSelectedNurses([]);
    setValue("careMonth", null);
    setValue("careYear", null);
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
    getData("/employee-type")
      .then((e) => {
        setEmployeeType(e?.data?.contends);
        setEmployeeTypeID1(e?.data?.contends[0].id);
        setEmployeeTypeID2(e?.data?.contends[1].id);
        setEmployeeTypeID3(e?.data?.contends[2].id);
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
  }, [dataSelect]);

  const handleNurseSelect = (index, value) => {
    const newSelectedNurses = [...selectedNurses];
    // Tìm y tá đã chọn trước đó
    const prevNurseId = watch(`employeeSchedules.${index}.userId`);

    // Xóa y tá đã chọn trước đó (nếu có)
    const prevNurseIndex = newSelectedNurses.findIndex(
      (nurse) => nurse.value === prevNurseId
    );
    if (prevNurseIndex !== -1) {
      newSelectedNurses.splice(prevNurseIndex, 1);
    }

    // Thêm y tá mới vào selectedNurses (nếu có)
    const newNurse = dataUser.find((nurse) => nurse.value === value);
    if (newNurse && value !== "") {
      // Chỉ thêm nếu giá trị không rỗng
      newSelectedNurses.push(newNurse);
    }

    // Cập nhật trạng thái disabled của các y tá
    const newDataUser = dataUser.map((nurse) => ({
      ...nurse,
      disabled: newSelectedNurses.some(
        (selected) => selected.value === nurse.value
      ),
    }));

    // Cập nhật trạng thái
    setSelectedNurses(newSelectedNurses);
    setDataUser(newDataUser);
    setValue(`employeeSchedules.${index}.userId`, value);
  };

  return (
    <div>
      <div className="bg-white">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl">
            <div className="overflow-y-auto p-4">
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

              {fields
                .reduce((acc, item, index) => {
                  const shiftIndex = acc.findIndex(
                    (shift) => shift.employeeTypeId === item.employeeTypeId
                  );
                  if (shiftIndex === -1) {
                    acc.push({
                      employeeTypeId: item.employeeTypeId,
                      fields: [{ ...item, index }],
                    });
                  } else {
                    acc[shiftIndex].fields.push({ ...item, index });
                  }
                  return acc;
                }, [])
                .map((shift, shiftIndex) => (
                  <div key={shiftIndex} className="border p-4 mt-4">
                    <label className="text-paragraph font-bold">
                      {`Nhân viên nhóm ${shiftIndex + 1}`}
                    </label>
                    <div className="sm:col-span-2">
                      {shift.fields.map((item) => (
                        <div key={item.id} className="mt-2.5">
                          <ComSelect
                            size={"large"}
                            style={{ width: "100%" }}
                            label="Y tá"
                            showSearch
                            placeholder="Y tá"
                            onChangeValue={(name, value) => {
                              handleNurseSelect(item.index, value);
                              setValue(
                                `employeeSchedules.${item.index}.userId`,
                                value
                              );
                            }}
                            value={watch(
                              `employeeSchedules.${item.index}.userId`
                            )}
                            options={dataUser}
                            required
                            {...register(
                              `employeeSchedules.${item.index}.userId`
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-10">
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
