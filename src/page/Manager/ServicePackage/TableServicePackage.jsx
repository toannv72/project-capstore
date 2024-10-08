import React from "react";
import { useEffect, useState } from "react";
import { Image, Table, Tooltip, Typography } from "antd";
import ComTable from "../../../Components/ComTable/ComTable";
import useColumnSearch from "../../../Components/ComTable/utils";
import ComModal from "../../../Components/ComModal/ComModal";
import { getData } from "../../../api/api";
import { useTableState } from "../../../hooks/useTableState";
import { useModalState } from "../../../hooks/useModalState";
import CreateServicePackage from "./CreateServicePackage";
import ComButton from "../../../Components/ComButton/ComButton";
import ComMenuButonTable from "../../../Components/ComMenuButonTable/ComMenuButonTable";
import ComTypePackageConverter from "../../../Components/ComTypePackageConverter/ComTypePackageConverter";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import ComWeekConverter from "../../../Components/ComWeekConverter/ComWeekConverter";
import EditServicePackage from "./EditServicePackage";
import ComConfirmDeleteModal from "../../../Components/ComConfirmDeleteModal/ComConfirmDeleteModal";
import { useNotification } from "../../../Notification/Notification";
import DetailServicePackage from "./DetailServicePackage";
export default function TableServicePackage() {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modal = useModalState();
  const modalDetail = useModalState();
  const modalDetailService = useModalState();
  const [selectedData, setSelectedData] = useState(null);
  console.log(selectedData);
  const { notificationApi } = useNotification();
  const {
    getColumnSearchProps,
    getColumnPriceRangeProps,
    getUniqueValues,
    getColumnFilterProps,
  } = useColumnSearch();

  function formatCurrency(number) {
    // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
    if (typeof number === "number") {
      return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }
  }
  console.log(data);
  const uniquePackageCategoryValues = getUniqueValues(
    data,
    "servicePackageCategory.name"
  );

  const columns = [
    {
      title: "Tên dịch vụ",
      width: 150,
      fixed: "left",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
      ...getColumnSearchProps("name", "Tên dịch vụ"),
    },
    {
      title: "Ảnh dịch vụ",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 150,
      fixed: "left",
      render: (_, record) => (
        <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
          <Image
            maskClassName="w-full h-full object-cover object-center lg:h-full lg:w-full "
            src={record?.imageUrl}
            alt={record?.imageUrl}
            preview={{ mask: "Xem ảnh" }}
          />
        </div>
      ),
    },
    {
      title: "Giá Tiền",
      width: 150,
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      ...getColumnPriceRangeProps("price", "Giá Tiền"),
      render: (_, record) => (
        <div>
          <h1>{formatCurrency(record.price)}</h1>
        </div>
      ),
    },
    {
      title: "Số lượng đã đăng ký",
      width: 120,
      dataIndex: "totalOrder",
      key: "totalOrder",
      sorter: (a, b) => a.totalOrder - b.totalOrder,
      // ...getColumnPriceRangeProps("price", "Giá Tiền"),
     
    },
    {
      title: "Thể loại dịch vụ",
      width: 120,
      dataIndex: "servicePackageCategory",
      key: "servicePackageCategory",
      sorter: (a, b) =>
        a?.servicePackageCategory?.name?.localeCompare(
          b?.servicePackageCategory?.name
        ),
      ...getColumnFilterProps(
        "servicePackageCategory.name",
        "Thể loại",
        uniquePackageCategoryValues
      ),
      render: (_, record) => (
        <div>
          <h1>{record.servicePackageCategory.name}</h1>
        </div>
      ),
      // ...getColumnSearchProps("servicePackageCategory.name", "Tên dịch vụ"),
    },
    {
      title: "Dạng dịch vụ",
      width: 100,
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "Một ngày", value: "OneDay" },
        { text: "Theo ngày", value: "MultipleDays" },
        { text: "Theo tuần", value: "WeeklyDays" },
        { text: "Mọi ngày", value: "AnyDay" },
      ],
      onFilter: (value, record) => record.type === value,
      sorter: (a, b) => a?.type?.localeCompare(b?.servicePackageCategory?.name),
      render: (data) => (
        <div>
          <ComTypePackageConverter>{data}</ComTypePackageConverter>
        </div>
      ),
    },
    {
      title: "Thời gian diễn ra",
      width: 150,
      dataIndex: "type",
      key: "types",
      render: (data, record) => <div>{showTypePackageDay(data, record)}</div>,
    },
    {
      title: "Giới hạn người đăng ký",
      width: 100,
      dataIndex: "registrationLimit",
      key: "registrationLimit",
      sorter: (a, b) => a?.registrationLimit - b?.registrationLimit,
      render: (data) => (
        <div>
          <h1>{data === 0 ? "Không có" : data}</h1>
        </div>
      ),
    },

    {
      title: "Thông tin bổ sung",
      dataIndex: "description",
      key: "description",
      width: 300,
      ...getColumnSearchProps("description", "chi tiết"),

      ellipsis: {
        showTitle: false,
      },
      render: (record) => (
        <Tooltip placement="topLeft" title={record}>
          {record}
        </Tooltip>
      ),
    },
    {
      title: "Thao tác",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div className="flex items-center flex-col">
          <ComMenuButonTable
            record={record}
            showModalDetails={() => {
              modalDetailService.handleOpen();
              setSelectedData(record);
            }}
            showModalEdit={() => {
              modalDetail.handleOpen();
              setSelectedData(record);
            }}
            showModalDelete={() => {
              ComConfirmDeleteModal(
                `/service-package`,
                record.id,
                `Bạn có chắc chắn muốn xóa?`,
                reloadData,
                notificationSuccess,
                notificationError,
                "put"
              );
            }}
            // extraMenuItems={extraMenuItems}
            // excludeDefaultItems={["details"]}
          />
        </div>
      ),
    },
  ];
  const notificationSuccess = () => {
    notificationApi("success", "Đã xóa", "Đã xóa dịch vụ không thành công!");
  };
  const notificationError = () => {
    notificationApi("error", "Không thành công ", "Không thành công");
  };
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
              {data?.servicePackageDates.map((e, index) => (
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
              {data?.servicePackageDates.map((e, index) => (
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
  useEffect(() => {
    setTimeout(() => {
      reloadData();
    }, 100);
  }, [modalDetail?.isModalOpen, modal?.isModalOpen]);
  const reloadData = () => {
    table.handleOpenLoading();
    getData("/service-package?State=Active&SortDir=Desc")
      .then((e) => {
        setData(e?.data?.contends);
        table.handleCloseLoading();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };
  return (
    <div>
      <div className="flex justify-end pb-2">
        <div>
          <ComButton onClick={modal.handleOpen}>Tạo mới dịch vụ</ComButton>
        </div>
      </div>
      <ComModal
        width={800}
        isOpen={modal?.isModalOpen}
        onClose={modal?.handleClose}
      >
        <CreateServicePackage
          isOpen={modal?.isModalOpen}
          onClose={modal?.handleClose}
        />
      </ComModal>
      <ComTable
        // expandable={{
        //   expandedRowRender,
        //   defaultExpandedRowKeys: ["0"],
        // }}
        y={"50vh"}
        columns={columns}
        dataSource={data}
        loading={table.loading}
      />
      <ComModal
        isOpen={modalDetail?.isModalOpen}
        onClose={modalDetail?.handleClose}
        width={800}
      >
        <EditServicePackage
          isOpen={modalDetail?.isModalOpen}
          onClose={modalDetail?.handleClose}
          type={selectedData?.type}
          selectedData={selectedData}
        />
      </ComModal>
      {/* chi tiêt  */}
      <ComModal
        isOpen={modalDetailService?.isModalOpen}
        onClose={modalDetailService?.handleClose}
        width={800}
      >
        <DetailServicePackage
          isOpen={modalDetailService?.isModalOpen}
          onClose={modalDetailService?.handleClose}
          selectedData={selectedData}
        />
      </ComModal>
    </div>
  );
}
