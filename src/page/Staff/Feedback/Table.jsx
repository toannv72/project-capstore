import React, { useEffect, useState } from "react";
import ComTable from "../../../Components/ComTable/ComTable";
import { Typography } from "antd";
import useColumnSearch from "../../../Components/ComTable/utils";
import { useModalState } from "../../../hooks/useModalState";
import { useTableState } from "../../../hooks/useTableState";
import ComModal from "../../../Components/ComModal/ComModal";
import { getData } from "./../../../api/api";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import ComMenuButonTable from "./../../../Components/ComMenuButonTable/ComMenuButonTable";

const Table = () => {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modalDetail = useModalState();
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const { getColumnSearchProps, getColumnApprox } = useColumnSearch();

  const showModal = (record) => {
    modalDetail.handleOpen();
    setSelectedFeedback(record);
  };
  const ratingFilters = [
    { text: "Rất hài lòng", value: "VerySatisfied" },
    { text: "Bình thường", value: "Neutral" },
    { text: "Không hài lòng", value: "Unsatisfied" },
  ];
  const rating = (rating) => {
    switch (rating) {
      case "VerySatisfied":
        return "Rất hài lòng";
      case "Neutral":
        return "Bình thường";
      case "Unsatisfied":
        return "Không hài lòng";
      default:
        return rating;
    }
  };
  const columns = [
    {
      title: "Người đánh giá",
      dataIndex: "user.fullName",
      width: 40,
      key: "user.fullName",
      fixed: "left",
      sorter: (a, b) => a.name?.fullName?.localeCompare(b.name?.fullName),
      ...getColumnSearchProps("user.fullName", "Họ và tên"),
      render: (text, record) => (
        <Typography.Link onClick={() => showModal(record)}>
          {record.user.fullName}
        </Typography.Link>
      ),
    },
    {
      title: "Dịch vụ",
      width: 50,
      dataIndex: "orderDetail.servicePackage.name",
      key: "orderDetail.servicePackage.name",
      sorter: (a, b) =>
        a?.orderDetail?.servicePackage?.name?.localeCompare(
          b?.orderDetail?.servicePackage?.name
        ),
      ...getColumnSearchProps("orderDetail.servicePackage.name", "Dịch vụ"),
    },
    {
      title: "Ngày thực hiện",
      width: 50,
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      ...getColumnApprox("createdAt", "Ngày thực hiện"),
      render: (text, record) => (
        <ComDateConverter>{record?.createdAt}</ComDateConverter>
      ),
    },
    {
      title: "Đánh giá",
      width: 70,
      dataIndex: "ratings",
      key: "ratings",
      sorter: (a, b) => a?.ratings?.localeCompare(b?.ratings),
      filters: ratingFilters,
      onFilter: (value, record) => record.ratings === value,
      render: (rating) => {
        switch (rating) {
          case "VerySatisfied":
            return "Rất hài lòng";
          case "Neutral":
            return "Bình thường";
          case "Unsatisfied":
            return "Không hài lòng";
          default:
            return rating;
        }
      },
    },
    {
      title: "Chi tiết đánh giá",
      width: 70,
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a?.title?.localeCompare(b?.title),
      ...getColumnSearchProps("title", "Chi tiết đánh giá"),
    },
    {
      title: "Thao tác",
      key: "operation",
      fixed: "right",
      width: 20,
      render: (_, record) => (
        <div className="flex items-center flex-col">
          <ComMenuButonTable
            record={record}
            showModalDetails={() => showModal(record)}
            // showModalEdit={() => modal?.handleOpen(record)}
            excludeDefaultItems={["delete", "edit"]}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getData("/feedback?SortDir=Desc")
      .then((e) => {
        setData(e?.data?.contends);
        table.handleCloseLoading();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);
  console.log("====================================");
  console.log(selectedFeedback);
  console.log("====================================");
  return (
    <div>
      <ComTable columns={columns} dataSource={data} loading={table.loading} />
      <ComModal
        isOpen={modalDetail?.isModalOpen}
        onClose={modalDetail?.handleClose}
        width={"50%"}
      >
        {selectedFeedback && (
          <div className="p-4 bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Chi tiết đánh giá
            </h2>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-medium">
                    Người đánh giá:
                  </td>
                  <td className="px-4 py-2">
                    {selectedFeedback.user.fullName}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-medium">
                    Người sử dụng dịch vụ:
                  </td>
                  <td className="px-4 py-2">
                    {selectedFeedback.orderDetail.elder.name}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-medium">
                    Dịch vụ:
                  </td>
                  <td className="px-4 py-2">
                    {selectedFeedback.orderDetail.servicePackage.name}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-medium">
                    Ngày thực hiện:
                  </td>
                  <td className="px-4 py-2">
                    <ComDateConverter>
                      {selectedFeedback.createdAt}
                    </ComDateConverter>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-medium">
                    Đánh giá:
                  </td>
                  <td className="px-4 py-2">
                    {rating(selectedFeedback.ratings)}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-medium">
                    Chi tiết đánh giá:
                  </td>
                  <td className="px-4 py-2">{selectedFeedback.title}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-medium">
                    Nội dung:
                  </td>
                  <td className="px-4 py-2">{selectedFeedback.content}</td>
                </tr>
                {/* <!-- Thông tin người thực hiện dịch vụ --> */}

                {selectedFeedback?.orderDetail?.orderDates.map((e, i) => (
                  <React.Fragment key={i}>
               
                      <tr className="border-b">
                        <td className="px-4 py-2 text-gray-600 font-medium w-1/3">
                          Người thực hiện dịch vụ:
                        </td>
                        <td className="px-4 py-2 w-2/3">
                          {e.user?.fullName || "Chưa có "}
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-950">
                        <td className="px-4 py-2 text-gray-600 font-medium w-1/3">
                          Thời gian thực hiện:
                        </td>
                        <td className="px-4 py-2 w-2/3">
                          <ComDateConverter>{e?.completedAt}</ComDateConverter>
                        </td>
                      </tr>
               
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ComModal>
    </div>
  );
};

export default Table;
