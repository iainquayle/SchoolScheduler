import { createSignal, For, Show } from 'solid-js'
import { Modal, setActiveModal, NO_MODAL } from "./Modal";
import { SlotData, SlotElement } from './Slot';

import { setUserid, setPassword, isAdmin, NULL_ID } from "./Authentication";

import "./Schedule.css";


export default function Schedule( ) {
  //this will be needed for reactivity
  const [schedule, setSchedule] = createSignal<SlotData[]>([
    new SlotData("test", new Date(), new Date()),
    new SlotData("test2", new Date(), new Date()),
    new SlotData("test3", new Date(), new Date()),
  ]);


          //TODO: make bunch of modal components, will be chaos otherwise
  return (
    <>
      <div class="schedule">
        <div class="schedule-column schedule-sidebar">
          <Show when={isAdmin()}>
            <div class="schedule-sidebar-element">Access Admin Tools</div>
          </Show>
          <div class="schedule-sidebar-element">Add Assessment</div>
          <div class="schedule-sidebar-element">Add Class</div>
          <div class="schedule-sidebar-element">Add Reserved Slot</div>
          <div class="schedule-sidebar-element">Edit Classes</div>
          <div class="schedule-sidebar-element">Change Institution</div>
          <div class="schedule-sidebar-element" onclick={() => {setActiveModal(NO_MODAL); setPassword(""); setUserid(NULL_ID)}} >Logout</div>
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

