import React, { useEffect, useState } from "react";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import { ComLink } from "./../../../Components/ComLink/ComLink";
import { useLocation } from "react-router-dom";
import { getData } from "../../../api/api";
import ErrorPage from "../../404/ErrorPage";

export default function DetailElder({ selectedData }) {
  const [data, setData] = useState({});
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setErrorApi] = useState(false);
  console.log(location);
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
    return (
      <>
        Người già này hiện không có
      </>
    );
  }
  return (
    <div>
      <div className="p-4 bg-white ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Chi tiết người người lớn tuổi
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
              <td className="px-4 py-2 text-gray-600 font-medium">Thời hạn:</td>
              <td className="px-4 py-2">
                <ComDateConverter>{data.dateOfBirth}</ComDateConverter>
              </td>
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
      </div>
    </div>
  );
}
