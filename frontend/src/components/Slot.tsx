import "./Slot.css";

export class SlotData {
  title: string;
  startDatetime: Date;
  endDatetime: Date;

  constructor(title: string, startDatetime: Date, endDatetime: Date) {
    this.title = title;
    this.startDatetime = startDatetime;
    this.endDatetime = endDatetime;
  }
  static compareStartDatetime(a: SlotData, b: SlotData) {
    if (a.startDatetime < b.startDatetime) {
      return -1;
    } else if (a.startDatetime > b.startDatetime) {
      return 1;
    } else {
      return 0;
    }
  }
  static compareEndDatetime(a: SlotData, b: SlotData) {
    if (a.endDatetime < b.endDatetime) {
      return -1;
    } else if (a.endDatetime > b.endDatetime) {
      return 1;
    } else {
      return 0;
    }
  }
}

interface SlotDisplayProps {
  data: SlotData;
}

export function SlotElement( props: SlotDisplayProps ) {
  return (
    <>
      <div type="button" class="slot-element">
        <div>{props.data.title}</div>
        <div>{props.data.startDatetime.toLocaleString()}</div>
        <div>{props.data.endDatetime.toLocaleString()}</div>
      </div>
    </>
  )
}
