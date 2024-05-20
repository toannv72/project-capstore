import React from "react";
import { Modal } from "antd";
function ComModal({ isOpen, onClose, children, title }) {
  return (
    <Modal
      title={title}
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
