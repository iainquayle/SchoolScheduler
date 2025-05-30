import { createSignal, Show } from 'solid-js';
import "./Modal.css";

export const NO_MODAL = "no-modal";
export const [activeModal, setActiveModal] = createSignal(NO_MODAL);

export function Modal(props: { children: any, title: string, modalType: string }) {

  const closeModal = () => {
    setActiveModal(NO_MODAL);
  };

  //TODO: not sure why span not inlining, should be default too, will switch to grid probably
  return (
    <>
      <Show when={props.modalType === activeModal()}>
        <div class="modal">
          <div class="modal-content">
            <span class="modal-header"> 
              <div class="modal-header-element">{props.title}</div>
              <div class="modal-header-element modal-exit" onClick={closeModal}>Close</div>
            </span>
            {props.children}
          </div>
        </div>
      </Show>
    </>
  );
}
