// Modal.tsx
import { createSignal, Show } from 'solid-js';
import "./Modal.css";

//TODO: consider making some static modal selector, 
//passed into props is the modal id that it will switch on
//then no need to do show logic in anywhere other than the modal itself
//and, there will only ever be one active modal

//js makes this kind of hard to do, one option though is to pass in the get and set function being used   

//let activeModal = ""; 

export default function Modal(props: { children: any, onClose: () => void, title: string}) {
  const [modalVisible, setModalVisible] = createSignal(true);

  const closeModal = () => {
    setModalVisible(false);
    props.onClose();
  };

  //TODO: not sure why span not inlining, should be default too, will switch to grid probably
  return (
    <>
      <Show when={modalVisible()}>
        <div class="modal">
          <div class="modal-content">
            <span class="close" style="display: inline;"> 
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
