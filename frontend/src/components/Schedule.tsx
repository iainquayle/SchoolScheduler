import { createSignal, For } from 'solid-js'
import { Modal, setActiveModal, NO_MODAL } from "./Modal";
import { SlotData, SlotElement } from './Slot';

import { AuthenticationData, NULL_ID } from "./Authentication";

import "./Schedule.css";


enum ScheduleModal {
  ADD_ASSESSMENT,
  ADD_CLASS,
  ADD_RESERVED_SLOT,
  EDIT_CLASS,
  CHANGE_INSTITUTION,
}

interface ScheduleProps {
  authData: AuthenticationData;
}

export default function Schedule( props: ScheduleProps ) {
  const [schedule, setSchedule] = createSignal<SlotData[]>([
    new SlotData("test", new Date(), new Date()),
    new SlotData("test2", new Date(), new Date()),
    new SlotData("test3", new Date(), new Date()),
  ]);


  return (
    <>
      <div class="schedule">
        <div class="schedule-column schedule-sidebar">
          <div class="schedule-sidebar-element">Add Assessment</div>
          <div class="schedule-sidebar-element">Add Class</div>
          <div class="schedule-sidebar-element">Add Reserved Slot</div>
          <div class="schedule-sidebar-element">Edit Classes</div>
          <div class="schedule-sidebar-element">Change Institution</div>
          <div class="schedule-sidebar-element" onclick={() => {props.authData.setPassword(""); props.authData.setID(NULL_ID)}} >Logout</div>
        </div>
        <div class="schedule-column schedule-list">
          <For each={schedule()}>
            {(slot) => <SlotElement data={slot} />}
          </For>
        </div>
      </div>
    </>
  )
}

