import { createSignal } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import styles

const Calendar = () => {
  const [events, setEvents] = createSignal([]);
  const [view, setView] = createSignal('month'); // Default view is month

  // Handle date click to add an event
  const handleDateClick = (slotInfo) => {
    const title = prompt('Enter event title:');
    const category = prompt('Enter event category:');
    const priority = prompt('Enter event priority (Low, Medium, High):');
    const beginTime = prompt('Enter event begin time (HH:mm):');
    const endTime = prompt('Enter event end time (HH:mm):');

    if (title && beginTime && endTime) {
      setEvents([
        ...events(),
        {
          start: new Date(slotInfo.start),
          end: new Date(slotInfo.start),
          title,
          category,
          priority,
          beginTime,
          endTime,
        },
      ]);
    }
  };

  // Handle event click to remove the event
  const handleEventClick = (event) => {
    const isConfirmed = window.confirm(`Do you want to remove the event "${event.title}"?`);
    if (isConfirmed) {
      setEvents(events().filter((e) => e !== event));
    }
  };

  // Handle view change
  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div>
      <h2>Calendar View</h2>
      {/* Render react-big-calendar with events and configuration */}
      <BigCalendar
        events={events()}
        selectable
        defaultView={view()}
        onView={(newView) => handleViewChange(newView)}
        onSelectSlot={(slotInfo) => handleDateClick(slotInfo)}
        onSelectEvent={(event) => handleEventClick(event)}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: getEventColor(event.priority),
          },
        })}
      />
    </div>
  );
};

// Function to get event color based on priority
const getEventColor = (priority) => {
  switch (priority.toLowerCase()) {
    case 'low':
      return 'lightgreen';
    case 'medium':
      return 'orange';
    case 'high':
      return 'tomato';
    default:
      return 'lightblue';
  }
};

export default Calendar;
