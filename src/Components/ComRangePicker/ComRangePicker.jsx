import React, { forwardRef } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { useFormContext } from "react-hook-form";
import { FieldError } from "../FieldError/FieldError";
import { v4 } from "uuid";
import { isEmpty, isNaN } from "lodash";
const { RangePicker } = DatePicker;

const ComRangePicker = forwardRef(
  (
    {
      name,
      label,
      required,
      className,
      format = "DD/MM/YYYY",
      rules,

      onChangeValue,
      onChange,
      disabledDate = () => false,
      ...props
    },
    ref
  ) => {
    const {
      watch,
      formState: { errors },
      setValue,
    } = useFormContext();
    const valueWatch = watch(name);
        const error = errors[name];
        console.log('====================================');
        console.log(name);
        console.log('====================================');
    const inputId = v4();
    const handleChange = (dates, dateStrings) => {

      if (!dateStrings[0]) {
          setValue(name, []);
        } else {
          setValue(name, dateStrings);
          
      }
      onChangeValue?.(name, dateStrings);
      console.log(name);
      //   setValue(name, 1111);
    };

    const checkValue = (value) => {
      // Kiểm tra nếu value chưa được chọn hoặc không phải là một mảng
      if (!Array.isArray(value) || value.length !== 2) return false;

      // Kiểm tra xem các giá trị có thể chuyển thành Date object hợp lệ không
      const startDate = moment(value[0], format, true); // Sử dụng moment để phân tích ngày
      const endDate = moment(value[1], format, true);

      if (!startDate.isValid() || !endDate.isValid()) return false;

      // Kiểm tra xem ngày bắt đầu có sau ngày kết thúc không
      return startDate.isAfter(endDate);
    };
    return (
      <>
        <div className={`${className}`}>
          {label && (
            <div className="mb-4 flex justify-between">
              <label htmlFor={inputId} className="text-paragraph font-bold">
                {label}
                {required && (
                  <span className="text-paragraph font-bold text-error-7 text-red-500">
                    *
                  </span>
                )}
              </label>
            </div>
          )}
          <div className="grid">
            <RangePicker
              ref={ref}
              id={inputId}
              size="large"
              value={props.value}
              format={format}
              onChange={handleChange}
              status={error && "error"}
              disabledDate={disabledDate}
              {...props}
            />
            {error && (
              <FieldError className="text-red-500">
                {error.message?.toString()}
              </FieldError>
            )}
          </div>
        </div>
      </>
    );
  }
);

export default ComRangePicker;
