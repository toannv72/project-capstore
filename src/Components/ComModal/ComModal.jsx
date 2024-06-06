import React from "react";
import { Modal } from "antd";
function ComModal({ isOpen, onClose, children, title, width }) {
  return (
    <Modal
      title={title}
      open={isOpen}
      width={width || 500}
      onCancel={onClose}
      footer={null}
    >
      <div className="">{children}</div>
    </Modal>
  );
}

export default ComModal;
