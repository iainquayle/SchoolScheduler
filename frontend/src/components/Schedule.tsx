import { createSignal, For } from 'solid-js'
import { Modal, NO_MODAL } from "./Modal";
import { SlotData, SlotElement } from './Slot';

import { AuthenticationData, NULL_ID } from "./Authentication";

import "./Schedule.css";

//TODO:
//  make slot component
//  make assessment, class, and reserved slots components
//    perhaps slots only show title and date, when clicked, modal will have more info as well as the functionality to edit and delete
//  make modal for adding assessments, classes, and reserved slots
//  make modal for user to follow class and insituition
//  ...
//
//  also perhaps make some data class for passing around the auth info, just holds userid, password, and set functions so they can be cleared
//  dont really want to make some kind of auth coockie, so passing info will have to do

interface ScheduleProps {
  authData: AuthenticationData;
}

export default function Schedule( props: ScheduleProps ) {

  const temp_data = [
    new SlotData("test", new Date(), new Date()),
    new SlotData("test2", new Date(), new Date()),
    new SlotData("test3", new Date(), new Date()),
  ]


  return (
    <>
      <div class="schedule">
        <div class="schedule-column schedule-sidebar">
          <div class="schedule-sidebar-element">Add Assessment</div>
          <div class="schedule-sidebar-element">Add Class</div>
          <div class="schedule-sidebar-element">Add Reserved Slot</div>
          <div class="schedule-sidebar-element">Follow Class</div>
          <div class="schedule-sidebar-element">Follow Institution</div>
          <div class="schedule-sidebar-element" onclick={() => {props.authData.setPassword(""); props.authData.setID(NULL_ID)}} >Logout</div>
        </div>
        <div class="schedule-column schedule-list">
          <For each={temp_data}>
            {(slot) => <SlotElement data={slot} />}
          </For>
        </div>
      </div>
    </>
  )
}

