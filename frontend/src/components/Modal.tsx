// Modal.tsx
import { createSignal } from 'solid-js';

export default function Modal(props: { children: any, onClose: () => void }) {
  const [modalVisible, setModalVisible] = createSignal(true);

  const closeModal = () => {
    setModalVisible(false);
    props.onClose();
  };

  return (
    <>
      {modalVisible() && (
        <div class="modal">
          <div class="modal-content">
            <span class="close" onClick={closeModal}>&times;</span>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}
