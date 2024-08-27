import { useEffect, useState } from "react";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import ComWeekConverter from "../../../Components/ComWeekConverter/ComWeekConverter";
import { Image } from "antd";
import ComTypePackageConverter from "../../../Components/ComTypePackageConverter/ComTypePackageConverter";
import { getData } from "../../../api/api";

const DetailServicePackage = ({ isOpen, onClose, selectedData }) => {
  const [data, setData] = useState({});

  if (!selectedData) return null;

  function formatCurrency(number) {
    // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
    if (typeof number === "number") {
      return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }
  }

  const showTypePackageDay = (type, data) => {
    switch (type) {
      case "OneDay":
        return (
          <div>
            Ngày diễn ra:
            <br />
            <ComDateConverter>{data.eventDate}</ComDateConverter>
            <br />
            Ngày kết thúc đăng ký:
            <br />
            <ComDateConverter>{data.endRegistrationDate}</ComDateConverter>
          </div>
        );
      case "MultipleDays":
        return (
          <div>
            Ngày diễn ra hàng tháng:
            <br />
            <div className="flex flex-wrap">
              {data?.servicePackageDates?.map((e, index) => (
                <h1 key={index}> {e.repetitionDay},</h1>
              ))}
            </div>
          </div>
        );
      case "WeeklyDays":
        return (
          <div>
            Thứ diễn ra:
            <br />
            <div className="flex flex-wrap">
              {data?.servicePackageDates?.map((e, index) => (
                <div key={index} className="flex flex-wrap">
                  <div>
                    <ComWeekConverter>{e.dayOfWeek}</ComWeekConverter>
                  </div>
                  ,
                </div>
              ))}
            </div>
          </div>
        );
      case "AnyDay":
        return "Mọi ngày";
      default:
        return " "; // Giá trị mặc định nếu không khớp
    }
  };

  return (
    <div className="p-4 bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Chi tiết dịch vụ
      </h2>
      <table className="w-full">
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-2 text-gray-600 font-medium w-40">
              Tên dịch vụ:
            </td>
            <td className="px-4 py-2">{selectedData.name}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 text-gray-600 font-medium">
              Ảnh dịch vụ:
            </td>
            <td className="px-4 py-2">
              <Image
                width={100}
                src={selectedData.imageUrl}
                alt={selectedData.name}
                preview={{ mask: "Xem ảnh" }}
              />
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 text-gray-600 font-medium">Giá tiền:</td>
            <td className="px-4 py-2">{formatCurrency(selectedData.price)}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 text-gray-600 font-medium">
              Thể loại dịch vụ:
            </td>
            <td className="px-4 py-2">
              {selectedData?.servicePackageCategory?.name}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 text-gray-600 font-medium">
              Dạng dịch vụ:
            </td>
            <td className="px-4 py-2">
              <ComTypePackageConverter>
                {selectedData.type}
              </ComTypePackageConverter>
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 text-gray-600 font-medium">
              Thời gian diễn ra:
            </td>
            <td className="px-4 py-2">
              {showTypePackageDay(selectedData.type, selectedData)}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 text-gray-600 font-medium">
              Giới hạn người đăng ký:
            </td>
            <td className="px-4 py-2">
              {selectedData.registrationLimit === 0
                ? "Không có"
                : selectedData.registrationLimit}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 text-gray-600 font-medium">
              Thông tin bổ sung:
            </td>
            <td className="px-4 py-2">{selectedData.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailServicePackage;
