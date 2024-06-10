
import TableActivityCalendar from "./TableActivityCalendar";
import ComButton from "../../../Components/ComButton/ComButton";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateActivityCalendar from "./CreateActivityCalendar";

export default function ActivityCalendar() {
  const modal = useModalState();
  return (
    <>
      <div className="grid grid-cols-3 gap-4 pb-2"></div>
      <div className="flex items-end pb-2">
        <ComButton onClick={modal.handleOpen}>Tạo mới</ComButton>
      </div>
      <TableActivityCalendar />
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
        <CreateActivityCalendar
          isOpen={modal?.isModalOpen}
          onClose={modal?.handleClose}
        />
      </ComModal>
    </>
  );
}
