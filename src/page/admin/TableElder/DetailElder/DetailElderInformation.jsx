import React from "react";
import { Tabs } from "antd";
import DetailElderContract from "./DetailElderContract";
import DetailElderHealth from './DetailElderHealth';
import DetailElderContractList from "./DetailElderContractList";
import DetailElderHealthList from "./DetailElderHealthList";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Hợp đồng đang được sửa dụng",
    children: <DetailElderContract />,
  },
  {
    key: "2",
    label: "Thông tin sức khỏe",
    children: <DetailElderHealth />,
  },
  {
    key: "3",
    label: "Danh sách hợp đồng",
    children: <DetailElderContractList />,
  },
  {
    key: "4",
    label: "Danh sách chỉ số đo",
    children: <DetailElderHealthList />,
  },
];
const DetailElderInformation = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);
export default DetailElderInformation;
