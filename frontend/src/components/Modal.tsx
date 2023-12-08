import { Show } from 'solid-js';
import "./Modal.css";

export const NO_MODAL = "no-modal";

export function Modal(props: { children: any, title: string, modalType: any, activeModal: any, setActiveModal: any}) {

  const closeModal = () => {
    props.setActiveModal(NO_MODAL);
  };

  //TODO: not sure why span not inlining, should be default too, will switch to grid probably
  return (
    <>
      <Show when={props.modalType === props.activeModal()}>
        <div class="modal">
          <div class="modal-content">
            <span class="modal-title-bar" style="display: inline;"> 
              <div class="modal-title">{props.title}</div>
              <button onClick={closeModal} style="padding: 0px;">Close</button>
            </span>
            {props.children}
          </div>
        </div>
      </Show>
    </>
  );
}
