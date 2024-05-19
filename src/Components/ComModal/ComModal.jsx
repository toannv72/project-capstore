import React from "react";
import { Modal } from "antd";
function ComModal({ isOpen, onClose, children }) {
  return (
    <Modal
      title="Chi tiết đơn hàng"
      open={isOpen}
      width={500}
      onCancel={onClose}
      footer={null}
    >
      {children}
    </Modal>
  );
}

export default ComModal;
