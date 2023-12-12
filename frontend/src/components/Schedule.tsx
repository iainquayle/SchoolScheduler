import { createSignal, For, Show, Setter } from 'solid-js'
import { Modal, setActiveModal, NO_MODAL } from "./Modal";
import { SlotData, SlotElement } from './Slot';
import { setUserID, setPassword, isAdmin } from "../api/Authentication";
import { CONSTANTS } from "../api/Constants";

import "./Schedule.css";
import "./Shared.css";

interface ScheduleProps {
  setAdminPage: Setter<boolean>
}


export default function Schedule( props: ScheduleProps ) {
  //this will be needed for reactivity
  const [schedule, setSchedule] = createSignal<SlotData[]>([
    new SlotData("test", new Date(), new Date()),
    new SlotData("test2", new Date(), new Date()),
    new SlotData("test3", new Date(), new Date()),
  ]);

          //TODO: make bunch of modal components, will be chaos otherwise
  return (
    <>
      <div class="page" style="grid-template-columns: 1fr 2fr;">
        <div class="column sidebar">
          <Show when={isAdmin()}>
            <div class="column-element sidebar-element" onclick={() => {setActiveModal(NO_MODAL); props.setAdminPage(true);}}>Access Admin Tools</div>
          </Show>
          <div class="column-element sidebar-element">Add Assessment</div>
          <div class="column-element sidebar-element">Add Class</div>
          <div class="column-element sidebar-element">Add Reserved Slot</div>
          <div class="column-element sidebar-element">Edit Classes</div>
          <div class="column-element sidebar-element">Change Institution</div>
          <div class="column-element sidebar-element" onclick={() => {setActiveModal(NO_MODAL); setPassword(""); setUserID(CONSTANTS.null_id)}} >Logout</div>
        </div>
        <div class="column list">
          <For each={schedule()}>
            {(slot) => <SlotElement data={slot} />}
          </For>
        </div>
      </div>
    </>
  )
}

