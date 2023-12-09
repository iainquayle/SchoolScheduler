import { createSignal, For } from 'solid-js'
import { Modal, NO_MODAL } from "./Modal";
import { Slot, SlotElement } from './Slot';

//TODO:
//  make slot component
//  make assessment, class, and reserved slots components
//    perhaps slots only show title and date, when clicked, modal will have more info as well as the functionality to edit and delete
//  make modal for adding assessments, classes, and reserved slots
//  make modal for user to follow class and insituition
//  ...

export default function Schedule(userid: any, password: any) {

  const temp_data = [
    new Slot("test", new Date(), new Date()),
    new Slot("test", new Date(), new Date()),
    new Slot("test", new Date(), new Date()),
  ]

  return (
    <>
      <For each={temp_data}>
        {(slotItem) => (
          <SlotElement slot={slotItem}/>
        )}
      </For>
    </>
  )
}

