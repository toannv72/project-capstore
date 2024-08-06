/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import { getData } from "../../../api/api";
import { useHref, useParams } from "react-router-dom";
import ComGenderConverter from "../../../Components/ComGenderConverter/ComGenderConverter";
import ComCccdOrCmndConverter from "../../../Components/ComCccdOrCmndConverter/ComCccdOrCmndConverter";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "../../../Components/ComInput/ComInput";
import ComDatePicker from "../../../Components/ComDatePicker/ComDatePicker";
import * as yup from "yup";
import { weightRegex } from "../../../regexPatterns";
import { yupResolver } from "@hookform/resolvers/yup";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import ChartFour from "./ChartFour";
import { Skeleton } from "antd";
import ErrorPage from "../../404/ErrorPage";
import TableContract from "./TableContract";
import ComPhoneConverter from "../../../Components/ComPhoneConverter/ComPhoneConverter";
import { TableHealth } from "../../Manager/Health/TableHealth";

export default function DetailElderPage() {
  const { id } = useParams();
  const CreateProductMessenger = yup.object({
    medicalRecord: yup.object({
      bloodType: yup.string().required("Vui lòng nhập nhóm máu"),
      weight: yup
        .string()
        .typeError("Vui lòng nhập cân nặng")
        .required("Vui lòng nhập cân nặng")
        .matches(weightRegex, "Cân nặng phải là số")
        .test(
          "min",
          "Cân nặng phải lớn hơn hoặc bằng 0",
          (value) => parseFloat(value) >= 0
        )
        .test(
          "max",
          "Cân nặng phải nhỏ hơn hoặc bằng 220",
          (value) => parseFloat(value) <= 220
        ),
      height: yup
        .string()
        .typeError("Vui lòng nhập chiều cao")
        .required("Vui lòng nhập chiều cao")
        .test(
          "min",
          "Chiều cao phải lớn hơn hoặc bằng 0 cm",
          (value) => parseFloat(value) >= 0
        )
        .test(
          "max",
          "Chiều cao phải nhỏ hơn hoặc bằng 200 cm",
          (value) => parseFloat(value) <= 200
        ),
      underlyingDisease: yup.string().required("Vui lòng nhập đủ bệnh lý"),
      note: yup.string().required("Vui lòng nhập ghi chú"),
    }),
    // trường hợp đồng
    contractsInUse: yup.object({
      name: yup.string().required("Vui lòng nhập số hợp đồng"),
      signingDate: yup.string().required("Vui lòng nhập ngày ký hợp đồng"),
      startDate: yup.string().required("Vui lòng nhập ngày bắt đầu hợp đồng"),
      endDate: yup.string().required("Vui lòng nhập ngày kết thúc hợp đồng"),
      content: yup.string().required("Vui lòng nhập nội dung hợp đồng"),
      // imageUrl: yup
      //   .string()
      //   .url("Vui lòng nhập URL hợp lệ")
      //   .required("Vui lòng nhập URL hình ảnh"),
      notes: yup.string().required("Vui lòng nhập ghi chú"),
      description: yup.string().required("Vui lòng nhập mô tả"),
    }),
  });
  const [loading, setLoading] = useState(true);
  const [error, setErrorApi] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    reloadData();
  }, [id]);
  console.log(data);

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    values: data,
  });
  const { handleSubmit, register, setFocus, watch, setValue, setError } =
    methods;
  const reloadData = () => {
    getData(`/elders/${id}`)
      .then((e) => {
        setData(e?.data);
      })
      .catch((error) => {
        setErrorApi(true);
        console.error("Error fetching items:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Skeleton active />;
  }
  if (error) {
    return <ErrorPage statusCode={"404"} />;
  }
  return (
    <>
      <div className="grid px-4 pt-6 grid-cols-3 xl:gap-4  ">
        <div className=" col-span-3  ">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-1   sm:p-6  ">
            <h3 class="mb-1 text-xl font-bold text-gray-900  ">
              Thông tin người cao tuổi
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-2 col-span-3 2xl:col-span-3 gap-4">
          <div class="col-span-2 p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:col-span-1   sm:p-3 ">
            <div class="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
              <img
                class="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0 object-cover"
                src={data?.imageUrl}
                alt={data?.name}
              />

              <div>
                <h3 class="mb-1 text-xl font-bold text-gray-900  ">
                  Cụ: {data?.name}
                </h3>
                <div class="text-sm text-gray-500  ">
                  Năm sinh:{" "}
                  <ComDateConverter>{data?.dateOfBirth}</ComDateConverter>
                </div>
                <div class="text-sm text-gray-500  ">
                  CMND hoặc CCCD:{" "}
                  <ComCccdOrCmndConverter>{data?.cccd}</ComCccdOrCmndConverter>
                </div>
                <div class="text-sm text-gray-500  ">
                  Giới tính:{" "}
                  <ComGenderConverter>{data?.gender}</ComGenderConverter>
                </div>
                <div class="text-sm text-gray-500  ">
                  Phòng: {data?.room?.name}
                </div>
                <div class="mb-4 text-sm text-gray-500  ">
                  Gói đăng ký: {data?.room?.type}
                </div>
              </div>
            </div>
          </div>

          <div class=" col-span-2 p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:col-span-1   sm:p-3  ">
            <div class="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
              <img
                class="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0 object-cover"
                src={data?.user?.avatarUrl}
                alt={data?.user?.fullName}
              />

              <div>
                <h3 class="mb-1 text-xl font-bold text-gray-900  ">
                  Người thân: {data?.user?.fullName}
                </h3>
                <div class="text-sm text-gray-500  ">
                  Năm sinh:{" "}
                  <ComDateConverter>{data?.user?.dateOfBirth}</ComDateConverter>
                </div>
                <div class="text-sm text-gray-500  ">
                  Giới tính:{" "}
                  <ComGenderConverter>{data?.user?.gender}</ComGenderConverter>
                </div>
                <div class="text-sm text-gray-500  ">
                  Số điện thoại:{" "}
                  <ComPhoneConverter>
                    {data?.user?.phoneNumber}
                  </ComPhoneConverter>
                </div>
                <div class="text-sm text-gray-500  ">
                  CMND hoặc CCCD:{" "}
                  <ComCccdOrCmndConverter>
                    {data?.user?.cccd}
                  </ComCccdOrCmndConverter>
                </div>
                <div class="mb-4 text-sm text-gray-500  ">
                  Gmail: {data?.user?.email}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 2xl:col-span-3">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-6  ">
            <h3 class="mb-4 text-xl font-semibold  ">
              Chi tiết hợp đồng đang được sử dụng
            </h3>
            <FormProvider {...methods}>
              <form
                // onSubmit={handleSubmit(onSubmit)}
                className="mx-auto mt-2 max-w-xl "
              >
                <div className=" p-2">
                  <div
                    className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
                    // style={{ height: "65vh" }}
                  >
                    <div className="sm:col-span-1">
                      <ComInput
                        type="text"
                        label="Hợp đồng số"
                        placeholder="Vui lòng nhập số hợp đồng"
                        readOnly
                        {...register("contractsInUse.name")}
                        required
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <ComDatePicker
                        label="Ngày ký hợp đồng"
                        type="numbers"
                        name={"contractsInUse.signingDate"}
                        placeholder="Vui lòng nhập ngày ký hợp đồng"
                        open={false}
                        inputReadOnly
                        {...register("contractsInUse.signingDate")}
                        required
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <ComDatePicker
                        label="Ngày bắt đầu hợp đồng"
                        placeholder="Vui lòng nhập ngày bắt đầu hợp đồng"
                        // disabled
                        open={false}
                        inputReadOnly
                        {...register("contractsInUse.startDate")}
                        required
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <ComDatePicker
                        label="Ngày kết thúc hợp đồng"
                        placeholder="Vui lòng nhập ngày kết thúc hợp đồng"
                        open={false}
                        inputReadOnly
                        {...register("contractsInUse.endDate")}
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <ComTextArea
                        type="text"
                        label="Nội dung hợp đồng"
                        rows={5}
                        placeholder="Vui lòng nhập nội dung hợp đồng"
                        readOnly
                        {...register("contractsInUse.content")}
                        // required
                      />
                    </div>
                    {/* <div className="sm:col-span-2">
                    <ComInput
                      type="text"
                      label="URL hình ảnh"
                      placeholder="Vui lòng nhập URL hình ảnh"
                     readOnly 
                      {...register("contractsInUse.imageUrl")}
                      required
                    />
                  </div> */}

                    <div className="sm:col-span-2">
                      <ComTextArea
                        label="Ghi chú hợp đồng"
                        placeholder="Vui lòng nhập ghi chú"
                        rows={5}
                        readOnly
                        {...register("contractsInUse.notes")}
                        // required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <ComTextArea
                        label="Mô tả hợp đồng"
                        placeholder="Vui lòng nhập mô tả"
                        rows={5}
                        name="contractsInUse"
                        readOnly
                        {...register("contractsInUse.description")}
                        // required
                      />
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
        <div className=" col-span-3  ">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm    sm:p-6  ">
            <h3 class="mb-4 text-xl font-semibold  ">Thông tin sức khỏe</h3>
            <FormProvider {...methods}>
              <form
                // onSubmit={handleSubmit(onSubmit)}
                className="mx-auto mt-2 max-w-xl "
              >
                <div className=" p-2">
                  <div
                    className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
                    // style={{ height: "65vh" }}
                  >
                    <div className="sm:col-span-2">
                      <div className="mt-2.5">
                        <ComInput
                          type="text"
                          label={"Nhóm máu"}
                          showSearch
                          placeholder={"Vui lòng nhập Nhóm máu"}
                          readOnly
                          {...register("medicalRecord.bloodType")}
                          required
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-1">
                      <div className="mt-2.5">
                        <ComInput
                          type="numberFloat"
                          label={"Cân nặng(KG)"}
                          placeholder={"Vui lòng nhập Cân nặng"}
                          readOnly
                          {...register("medicalRecord.weight")}
                          required
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-1">
                      <div className="mt-2.5">
                        <ComInput
                          type="numberFloat"
                          label={"Chiều cao(Cm)"}
                          placeholder={"Vui lòng nhập Chiều cao"}
                          readOnly
                          {...register("medicalRecord.height")}
                          required
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="mt-2.5">
                        <ComTextArea
                          type="text"
                          label={"Bệnh lý trước đó"}
                          placeholder={"Vui lòng nhập Bệnh lý"}
                          rows={5}
                          readOnly
                          {...register("medicalRecord.underlyingDisease")}
                          required
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="mt-2.5">
                        <ComTextArea
                          type="text"
                          label={"Ghi chú"}
                          placeholder={"Vui lòng nhập Ghi chú"}
                          rows={5}
                          readOnly
                          {...register("medicalRecord.note")}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
        <div className=" col-span-3  ">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-1   sm:p-6  ">
            <h3 class="mb-1 text-xl font-bold text-gray-900   p-3">
              Thông tin hợp đồng
            </h3>
            <TableContract idElder={id} />
          </div>
        </div>
        <div className=" col-span-3  ">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-1   sm:p-6  ">
            <h3 class="mb-1 text-xl font-bold text-gray-900   p-3">
              Thông tin chỉ số đo được
            </h3>
            <TableHealth idElder={id} />
          </div>
        </div>
      </div>
    </>
  );
}
