import React from "react";
import { Menu, Dropdown, Button, Typography } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const { Link } = Typography;

const ComMenuButonTable = ({
  record,
  showModalDetails,
  showModalEdit,
  showModalDelete,
  extraMenuItems = [],
  excludeDefaultItems = [],
  order = [],
}) => {
  const defaultMenuItems = [
    {
      key: "details",
      label: "Chi tiết",
      onClick: () => showModalDetails(record),
      visible: !excludeDefaultItems.includes("details"),
    },
    {
      key: "edit",
      label: "Chỉnh sửa",
      onClick: () => showModalEdit(record),
      visible: !excludeDefaultItems.includes("edit"),
    },
    {
      key: "delete",
      label: "Xóa",
      onClick: () => showModalDelete(record),
      visible: !excludeDefaultItems.includes("delete"),
      style: { color: "red" },
    },
  ];

  const allMenuItems = [
    ...defaultMenuItems,
    ...extraMenuItems.map((item, index) => ({
      key: `extra-${index}`,
      label: item.label,
      onClick: item.onClick,
      visible: true,
      order:
        order.indexOf(item.label) !== -1
          ? order.indexOf(item.label)
          : defaultMenuItems.length + index,
    })),
  ].filter((item) => item.visible);

  allMenuItems.forEach((item) => {
    if (!item.order && item.order !== 0) {
      item.order =
        order.indexOf(item.key) !== -1
          ? order.indexOf(item.key)
          : allMenuItems.length;
    }
  });

  const sortedMenuItems = allMenuItems.sort((a, b) => a.order - b.order);

  const menu = (
    <Menu>
      {sortedMenuItems.map((item) => (
        <Menu.Item key={item.key} onClick={item.onClick} style={item.style}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button icon={<EllipsisOutlined />} />
    </Dropdown>
  );
};


export default ComMenuButonTable;
