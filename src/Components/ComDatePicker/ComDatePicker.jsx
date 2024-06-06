import React, { forwardRef } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { useFormContext } from "react-hook-form";
import { FieldError } from "../FieldError/FieldError";
import { v4 as uuidv4 } from "uuid";
import { isEmpty } from "lodash"; // Chỉ import isEmpty
import dayjs from "dayjs";

const ComDatePicker = forwardRef(
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
    const inputId = uuidv4(); // Sử dụng uuidv4 để tạo ID duy nhất

    const handleChange = (date, dateString) => {
      if (isEmpty(dateString)) {
        setValue(name, null); // Đặt giá trị về null khi trống
      } else {
        setValue(name, dateString);
      }
      onChangeValue?.(name, dateString);
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
            <DatePicker
              ref={ref}
              id={inputId}
              size="large"
              value={props.value}
              defaultValue={dayjs(valueWatch)}
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

export default ComDatePicker;
