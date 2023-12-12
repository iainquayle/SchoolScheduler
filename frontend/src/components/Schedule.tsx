import { createSignal, For, Show, Setter } from 'solid-js'
import { Modal, setActiveModal, NO_MODAL } from "./Modal";
import { SlotData, SlotElement } from './Slot';
import { setUserID, setPassword, isAdmin } from "../api/Authentication";
import { CONSTANTS } from "../api/Constants";
import { followSchool } from '../api/User';

import "./Schedule.css";
import "./Shared.css";

enum ScheduleModal {
  ADD_ASSESSMENT = "add-assessment",
  ADD_CLASS = "add-class",
  ADD_RESERVED_SLOT = "add-reserved-slot",
  EDIT_CLASSES = "edit-classes",
  CHANGE_INSTITUTION = "change-institution",
}
const INSTITUTION_FORM = "institution-form";

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
          <div class="column-element sidebar-element" onclick={() => {setActiveModal(ScheduleModal.CHANGE_INSTITUTION)}}>Change Institution</div>
          <div class="column-element sidebar-element" onclick={() => {setActiveModal(NO_MODAL); setPassword(""); setUserID(CONSTANTS.null_id)}} >Logout</div>
        </div>
        <div class="column list">
          <For each={schedule()}>
            {(slot) => <SlotElement data={slot} />}
          </For>
        </div>
        <Modal title="Change Institution" modalType={ScheduleModal.CHANGE_INSTITUTION}>
          <form id={INSTITUTION_FORM}>
            <label for="school">Institution</label>
            <input type="text" name="school"/>
            <input type="button" onclick={ async () => {
              const form = document.getElementById(INSTITUTION_FORM) as HTMLFormElement;
              await followSchool(form.school.value);
              setActiveModal(NO_MODAL);
            }} value="Submit"/>
          </form>
        </Modal>
      </div>
    </>
  )
}

