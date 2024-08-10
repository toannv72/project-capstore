import React, { useEffect, useState } from "react";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import { ComLink } from "./../../../Components/ComLink/ComLink";
import { useLocation } from "react-router-dom";
import { getData } from "../../../api/api";
import ErrorPage from "../../404/ErrorPage";
import ComButton from "../../../Components/ComButton/ComButton";

export default function DetailElder({ selectedData, isOpenEdit, onClose }) {
  const [data, setData] = useState({});
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setErrorApi] = useState(false);
  console.log(selectedData);
  useEffect(() => {
    setData(selectedData);

    getData(`/elders/${selectedData?.id}`)
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
  }, [selectedData]);
  console.log(111, data);
  function getRoleFromPath(pathname) {
    const parts = pathname.split("/");
    return parts[1];
  }

  if (error) {
    return <>Người già này hiện không có</>;
  }
  return (
    <div>
      <div className="p-4 bg-white ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Chi tiết người người cao tuổi
        </h2>
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Họ và tên:
              </td>
              <td className="px-4 py-2">{data.name}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Ngày tháng năm sinh:
              </td>
              <td className="px-4 py-2">
                <ComDateConverter>{data.dateOfBirth}</ComDateConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Phòng:</td>
              <td className="px-4 py-2">{data.room?.name}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Loại phòng:
              </td>
              <td className="px-4 py-2">{data.room?.type}</td>
            </tr>

            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Ngày có hiệu lực:
              </td>
              <td className="px-4 py-2">
                <ComDateConverter>
                  {data.contractsInUse?.startDate}
                </ComDateConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Ngày hết hạn hợp đồng:
              </td>
              <td className="px-4 py-2">
                <ComDateConverter>
                  {data.contractsInUse?.endDate}
                </ComDateConverter>
              </td>
            </tr>
            {/* Thêm các dòng khác cho thông tin chi tiết */}
          </tbody>
        </table>
        <div className="flex items-center justify-center">
          <ComLink
            to={`/${getRoleFromPath(location.pathname)}/elder/${
              selectedData?.id
            }`}
          >
            Xem thêm
          </ComLink>
        </div>
        {isOpenEdit ? (
          <div className="mt-10">
            <ComButton
              onClick={() => {
                onClose();
                isOpenEdit();
              }}
              type="primary"
              className="block w-full rounded-md bg-[#0F296D]  text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0F296D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cập nhật
            </ComButton>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
