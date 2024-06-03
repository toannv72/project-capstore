import React, { useEffect, useState } from "react";
import ComButton from "../../../Components/ComButton/ComButton";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "../../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseImgs } from "../../../upImgFirebase/firebaseImgs";
import ComUpImg from "../../../Components/ComUpImg/ComUpImg";
import { useNotification } from "../../../Notification/Notification";
import { getData, postData } from "../../../api/api";
import ComSelect from "../../../Components/ComInput/ComSelect";

export default function TableVisitation({ isOpen, onClose }) {
  const [dataBlock, setDataBlock] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState();

  const [image, setImages] = useState([]);
  const { notificationApi } = useNotification();

  const CreateProductMessenger = yup.object({
    name: yup.string().required("Vui lòng nhập tên phòng"),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const { handleSubmit, register, setFocus, watch, setValue } = methods;

  const onSubmit = (data) => {
    console.log(data);
    postData(`/room?blockId=${data?.blockId}`, data)
      .then((e) => {
        notificationApi("success", "tạo thành công", "đã tạo phòng!");
        onClose();
      })
      .catch((error) => {
        console.log(error);
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
                      label={"Tên"}
                      placeholder={"Tên"}
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
                    <ComInput
                      type="text"
                      label={"description"}
                      placeholder={"description"}
                      {...register("description")}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <ComButton
                htmlType="submit"
                type="primary"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
