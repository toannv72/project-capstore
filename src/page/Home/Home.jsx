import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import * as yup from "yup";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Contact from "./Contact";
import { FormProvider, useForm } from 'react-hook-form';
import { useNotification } from './../../Notification/Notification';
import { addressRegex, emailRegex, nameRegex, phoneNumberRegex } from './../../regexPatterns';
import { yupResolver } from "@hookform/resolvers/yup";
import { postData } from "../../api/api";
import ComInput from "../../Components/ComInput/ComInput";
import ComTextArea from "../../Components/ComInput/ComTextArea";
const Home = () => {
  const [open, setOpen] = useState(true);
    const { notificationApi } = useNotification();
    const [disabled, setDisabled] = useState(false);
    const CreateProductMessenger = yup.object({
      fullName: yup
        .string()
        .matches(
          nameRegex,
          "Vui lòng nhập tên hợp lệ (chỉ chứa chữ cái và dấu cách)"
        )
        .required("Vui lòng nhập tên")
        .min(2, "Tên quá ngắn, vui lòng nhập tối thiểu 2 ký tự")
        .max(50, "Tên quá dài, vui lòng nhập tối đa 50 ký tự"),
      phoneNumber: yup
        .string()
        .required("Vui lòng nhập đủ số điện thoại")
        .matches(phoneNumberRegex, "Vui lòng nhập số điện thoại hợp lệ"),
      email: yup
        .string()
        .matches(emailRegex, "Vui lòng nhập địa chỉ email hợp lệ")
        .required("Vui lòng nhập đầy đủ email"),
      title: yup.string().required("Vui lòng nhập đầy đủ email"),
      description: yup.string().required("Vui lòng nhập đầy đủ nội dung"),
      address: yup
        .string()
        .matches(addressRegex, "Vui lòng nhập địa chỉ hợp lệ")
        .required("Vui lòng nhập địa chỉ")
        .min(5, "Địa chỉ quá ngắn, vui lòng nhập tối thiểu 5 ký tự")
        .max(100, "Địa chỉ quá dài, vui lòng nhập tối đa 100 ký tự"),
      users: yup.array().of(
        yup.object({
          id: yup.string(),
        })
      ),
    });
    const focusFrom = () => {
      setFocus("fullName");
    };
    const methods = useForm({
      resolver: yupResolver(CreateProductMessenger),
      values: {
        users: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          },
        ],
      },
    });
    const {
      handleSubmit,
      register,
      setFocus,
      watch,
      setValue,
      setError,
      reset,
    } = methods;
    const onSubmit = (data) => {
      setDisabled(true);
      postData("/potential-customer", {
        ...data,
      }).then((e) => {
        notificationApi("success", "tạo thành công", "đã tạo");
        reset();
      });
    };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1180) {
        setOpen(true);
      } else {
        // setOpen(false);
      }
    };
    // Lắng nghe sự kiện thay đổi kích thước cửa sổ
    window.addEventListener("resize", handleResize);
    // Gọi handleResize khi component được mount để đảm bảo trạng thái đúng
    handleResize();
    // Cleanup listener khi component bị unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div className="my-large-component">
      <div className="wrapped-styles">
        <div className="home-container">
          <div id="container" className="main">
            <Header focusFrom={focusFrom} />
            <Content focusFrom={focusFrom} />
            <div className="isolate bg-white px-6 py-8 sm:py-8 lg:px-8">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />
              </div>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Gửi hỗ trợ
                </h2>
              </div>
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mx-auto mt-16 max-w-xl sm:mt-20"
                >
                  <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <div className="mt-2.5">
                        <ComInput
                          required
                          label={"Họ và Tên"}
                          placeholder={"Vui lòng nhập Họ và Tên"}
                          {...register("fullName")}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <div className="mt-2.5">
                        <ComInput
                          required
                          label={"Địa chỉ gmail"}
                          placeholder={"Vui lòng nhập Địa chỉ gmail"}
                          {...register("email")}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="relative mt-2.5">
                        <ComInput
                          required
                          label={"Số điện thoại"}
                          placeholder={"Vui lòng nhập Số điện thoại"}
                          {...register("phoneNumber")}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="relative mt-2.5">
                        <ComInput
                          required
                          label={"Địa chỉ "}
                          placeholder={"Vui lòng nhập Địa chỉ"}
                          {...register("address")}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="relative mt-2.5">
                        <ComInput
                          required
                          label={"Chủ đề "}
                          placeholder={"Vui lòng nhập Chủ đề"}
                          {...register("title")}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="mt-2.5">
                        <ComTextArea
                          label="Nội dung"
                          placeholder="Vui lòng nhập Nội dung"
                          rows={5}
                          name="contract"
                          {...register("description")}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10">
                    <button
                      type="submit"
                      className="block w-full rounded-md bg-[#0F296D] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0F296D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Gửi
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
