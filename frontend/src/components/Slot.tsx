
export class Slot {
  title: string;
  startDatetime: Date;
  endDatetime: Date;

  constructor( title: any, startDatetime: Date, endDatetime: Date ) {
    this.title = title;
    this.startDatetime = startDatetime;
    this.endDatetime = endDatetime;
  }
}

export function SlotElement( slot: any ) {
  //either make functionalality to complete task here, or make a call back to the parent to deal with it
  //could also just put it in the modal?? ya

  return (
    <>
      <div>
        <div>{slot.title}</div>
        <div>{slot.startDatetime.toString()}</div>
        <div>{slot.endDatetime.toString()}</div>
      </div>
    </>
  )
}
