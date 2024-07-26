import React, { useEffect, useState } from "react";
import ComButton from "./../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "./../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseImgs } from "../../../upImgFirebase/firebaseImgs";
import ComUpImg from "./../../../Components/ComUpImg/ComUpImg";
import { useNotification } from "./../../../Notification/Notification";
import ComRangePicker from "../../../Components/ComRangePicker/ComRangePicker";
import moment from "moment";
import ComDatePicker from "../../../Components/ComDatePicker/ComDatePicker";
import { handleErrors } from "../../../Components/errorUtils/errorUtils";
import { getData, postData } from "../../../api/api";
import ComSelect from "../../../Components/ComInput/ComSelect";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import { DateOfLastDay } from "../../../Components/ComDateDisabled/DateOfBirth";

export default function ContractExtension({ onClose, selectedUser }) {
  const [image, setImages] = useState([]);
  const { notificationApi } = useNotification();
  const [dataRoom, setDataRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState();
  const [selectedPackage, setSelectedPackage] = useState();
  const [selectedElders, setSelectedElders] = useState();
  const [selectedUsers, setSelectedUsers] = useState();

  const [dataPackage, setDataPackage] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataElders, setDataElders] = useState([]);
  const [endDate, setEndDate] = useState(false);

  const disabledDate = (current) => {
    const yearsAgo120 = moment().subtract(120, "years");
    const yearsLater120 = moment().add(120, "years");
    return current && (current < yearsAgo120 || current > yearsLater120);
  };
  const CreateProductMessenger = yup.object({
    userId: yup.string().required("Vui lòng chọn người đăng ký"),
    elderId: yup.string().required("Vui lòng chọn người thân"),
    nursingPackageId: yup.string().required("Vui lòng chọn gói dưỡng lão"),

    name: yup.string().required("Vui lòng nhập tên hợp đồng"),
    signingDate: yup.string().required("Vui lòng nhập ngày ký hợp đồng"),
    startDate: yup.string().required("Vui lòng nhập ngày bắt đầu hợp đồng"),
    endDate: yup.string().required("Vui lòng nhập ngày kết thúc hợp đồng"),
    content: yup.string().required("Vui lòng nhập nội dung hợp đồng"),
    notes: yup.string().required("Vui lòng nhập ghi chú"),
    description: yup.string().required("Vui lòng nhập mô tả"),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    values: selectedUser,
  });
  const { handleSubmit, register, setFocus, watch, setError, setValue } =
    methods;
  function convertUrlsToObjects(urls) {
    return urls.map((url) => ({ imageUrl: url }));
  }
  const onSubmit = (data) => {
    console.log(111111, data);

    if (Array.isArray(image) && image.length === 0) {
      notificationApi(
        "error",
        "Vui lòng chọn ảnh",
        "Vui lòng chọn hình ảnh hợp đồng "
      );
    } else {
      firebaseImgs(image).then((dataImg1) => {
        console.log(dataImg1);
        setValue("images", convertUrlsToObjects(dataImg1));

        postData("/contract", {
          ...data,
          images:convertUrlsToObjects(dataImg1)
        })
          .then((e) => {
            notificationApi("success", "tạo thành công", "đã tạo");

            onClose();
          })
          .catch((error) => {
            console.log(error);
            handleErrors(error, setError, setFocus);
            notificationApi("error", "tạo không thành công", "đã tạo");
          });
      });
    }
  };
  const getCurrentDateFormatted = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Thêm 1 vì getMonth() trả về tháng từ 0-11
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // tải lại thông tin khi chọn hợp đồng khác
  useEffect(() => {
    reloadData();
    setSelectedUsers(selectedUser.user.id);
    setSelectedElders(selectedUser.elder.id);
    setSelectedPackage(selectedUser.nursingPackage.id);
    const endDate = moment(selectedUser.endDate)
      .add(1, "days")
      .format("YYYY-MM-DD");
    setValue("startDate", endDate, {
      shouldValidate: false,
    });
    const today = getCurrentDateFormatted();
    setValue("signingDate", today, {
      shouldValidate: false,
    });
    setValue("elderId", selectedUser.elder.id, {
      shouldValidate: false,
    });
    setValue("userId", selectedUser.user.id, {
      shouldValidate: false,
    });
     setValue("nursingPackageId", selectedUser.nursingPackage.id, {
       shouldValidate: false,
     });
     setValue("roomId", selectedUser.elder.roomId, {
       shouldValidate: false,
     });
      setValue("images", []);
  }, [selectedUser]);

  const DateOfContract = (current) => {
    const rangeYears = 10;

    const minDate = moment().subtract(rangeYears, "years");
    const maxDate = moment().add(rangeYears, "years");

    const blockStartDate = moment(selectedUser.startDate);
    const blockEndDate = moment(selectedUser.endDate);

    return (
      current &&
      (current < minDate ||
        current > maxDate ||
        (current >= blockStartDate && current <= blockEndDate))
    );
  };

  const disabledDateEnd = (current) => {
    const daysLater30 = moment().add(30, "days");
    const tenYearsLater = moment().add(10, "years");
    const startDate = watch("startDate");
    const fixedFutureDate = startDate
      ? moment(startDate).add(30, "days")
      : null;

    return (
      current &&
      (current < daysLater30 ||
        current > tenYearsLater ||
        (fixedFutureDate && current < fixedFutureDate))
    );
  };
  useEffect(() => {
    setEndDate((e) => !e);
    setValue("endDate", null);
  }, [watch("startDate")]);
  const reloadData = () => {
    getData("/users?SortDir=Desc")
      .then((e) => {
        const dataForSelect = e?.data?.contends.map((item) => ({
          value: item.id,
          label: `Tên: ${item.fullName} 
          Số Đt: ${item.phoneNumber} 
          CCCD: ${item.cccd}`,
        }));
        setDataUser(dataForSelect);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
    getData(`/room?NursingPackageId=${selectedPackage}`)
      .then((e) => {
        console.log(e?.data?.contends);
        const dataForSelect = e?.data?.contends.map((item) => ({
          value: item.id,
          label: `Khu:${item.name}/Phòng:${item.name}`,
        }));
        setDataRoom(dataForSelect);
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
    getData(`elders?UserId=${selectedUser.user.id}`).then((e) => {
      const dataForSelect = e?.data?.contends.map((item) => ({
        value: item.id,
        label: `Tên cụ: ${item.name} 
          CCCD: ${item.cccd}`,
      }));
      setDataElders(dataForSelect);
    });
  };
  const handleChange = (e, value) => {
    setSelectedUsers(value);
    setDataElders([]);
    setSelectedElders(null);
    setValue("elderId", null, { shouldValidate: false });
    if (value.length === 0) {
      setValue("userId", null, { shouldValidate: true });
    } else {
      getData(`elders?UserId=${value}`).then((e) => {
        const dataForSelect = e?.data?.contends.map((item) => ({
          value: item.id,
          label: `Tên cụ: ${item.name} 
          CCCD: ${item.cccd}`,
        }));
        setDataElders(dataForSelect);
      });
      setValue("userId", value, { shouldValidate: true });
    }
  };
  const handleChangeElders = (e, value) => {
    setSelectedElders(value);
    if (value.length === 0) {
      setValue("elderId", null, { shouldValidate: true });
    } else {
      setValue("elderId", value, { shouldValidate: true });
    }
  };
  const onChange = (data) => {
    const selectedImages = data;
    const newImages = selectedImages.map((file) => file.originFileObj);
    setImages(newImages);
  };
  const handleChangeRoom = (e, value) => {
    setSelectedRoom(value);
    if (value.length === 0) {
      setValue("roomId", null, { shouldValidate: true });
    } else {
      setValue("roomId", value, { shouldValidate: true });
    }
  };
  const handleChange2 = (e, value) => {
    setSelectedPackage(value);
    setSelectedRoom(null);
    setValue("roomId", null);
    getData(`/room?NursingPackageId=${value}`)
      .then((e) => {
        console.log(e?.data?.contends);
        const dataForSelect = e?.data?.contends.map((item) => ({
          value: item.id,
          label: `Khu:${item.name}/Phòng:${item.name}`,
        }));
        setDataRoom(dataForSelect);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
    if (value.length === 0) {
      setValue("nursingPackageId", null, { shouldValidate: true });
    } else {
      setValue("nursingPackageId", value, { shouldValidate: true });
    }
  };
  return (
    <div>
      <div className="p-4 bg-white ">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Gia hạn hợp đồng mới
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-2 max-w-xl "
          >
            <div className=" p-2">
              <div
                className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
                // style={{ height: "65vh" }}
              >
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComSelect
                      size={"large"}
                      style={{
                        width: "100%",
                      }}
                      label="Người đăng ký"
                      placeholder="Người đăng ký"
                      onChangeValue={handleChange}
                      value={selectedUsers}
                      readOnly
                      filterOption={(inputValue, option) =>
                        option.searchString
                          ?.toLowerCase()
                          ?.includes(inputValue?.toLowerCase())
                      }
                      showSearch
                      disabled
                      mode="default"
                      options={dataUser}
                      required
                      {...register("userId")}
                    />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <div className="mt-2.5">
                    <ComSelect
                      size={"large"}
                      style={{
                        width: "100%",
                      }}
                      label="Chọn người thân"
                      placeholder="Người thân"
                      onChangeValue={handleChangeElders}
                      value={selectedElders}
                      filterOption={(inputValue, option) =>
                        option.searchString
                          ?.toLowerCase()
                          ?.includes(inputValue?.toLowerCase())
                      }
                      showSearch
                      disabled
                      mode="default"
                      options={dataElders}
                      required
                      {...register("elderId")}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Thông tin hợp đồng
                  </h3>
                </div>
                <div className="sm:col-span-2">
                  <ComInput
                    type="text"
                    label="Tên hợp đồng"
                    placeholder="Vui lòng nhập tên hợp đồng"
                    {...register("name")}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <ComSelect
                      size={"large"}
                      style={{
                        width: "100%",
                      }}
                      label="Chọn gói cho hợp đồng"
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
                    <ComSelect
                      size={"large"}
                      style={{
                        width: "100%",
                      }}
                      label="Chọn phòng"
                      placeholder="Phòng"
                      onChangeValue={handleChangeRoom}
                      showSearch
                      value={selectedRoom}
                      // mode="tags"
                      mode="default"
                      options={dataRoom}
                      required
                      {...register("roomId")}
                    />
                  </div>
                </div> */}
                <div className="sm:col-span-2">
                  <ComDatePicker
                    label="Ngày ký hợp đồng"
                    type="numbers"
                    disabledDate={DateOfLastDay}
                    name={"signingDate"}
                    placeholder="Vui lòng nhập ngày ký hợp đồng"
                    {...register("signingDate")}
                    required
                  />
                </div>
                <div className="sm:col-span-1">
                  <ComDatePicker
                    label="Ngày bắt đầu hợp đồng"
                    disabledDate={DateOfContract}
                    name="contract"
                    placeholder="Vui lòng nhập ngày bắt đầu hợp đồng"
                    {...register("startDate")}
                    required
                  />
                </div>
                {!endDate || (
                  <div className="sm:col-span-1">
                    <ComDatePicker
                      label="Ngày kết thúc hợp đồng"
                      disabledDate={disabledDateEnd}
                      name="contract"
                      placeholder="Vui lòng nhập ngày kết thúc hợp đồng"
                      {...register("endDate")}
                      required
                    />
                  </div>
                )}
                {endDate || (
                  <div className="sm:col-span-1">
                    <ComDatePicker
                      label="Ngày kết thúc hợp đồng"
                      disabledDate={disabledDateEnd}
                      name="contract"
                      placeholder="Vui lòng nhập ngày kết thúc hợp đồng"
                      {...register("endDate")}
                      required
                    />
                  </div>
                )}
                <div className="sm:col-span-2">
                  <ComTextArea
                    type="text"
                    label="Nội dung hợp đồng"
                    rows={5}
                    name="contract"
                    placeholder="Vui lòng nhập nội dung hợp đồng"
                    {...register("content")}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <ComUpImg
                    onChange={onChange}
                    label={"Hình ảnh hợp đồng"}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <ComTextArea
                    label="Ghi chú hợp đồng"
                    placeholder="Vui lòng nhập ghi chú"
                    rows={5}
                    name="contract"
                    {...register("notes")}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <ComTextArea
                    label="Mô tả hợp đồng"
                    placeholder="Vui lòng nhập mô tả"
                    rows={5}
                    name="contract"
                    {...register("description")}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <ComButton
                htmlType="submit"
                type="primary"
                className="block w-full rounded-md bg-[#0F296D]  text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0F296D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Tạo mới
              </ComButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
