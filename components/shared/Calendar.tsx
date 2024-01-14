"use client";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Session } from "next-auth";
import { useState } from "react";
import EventModal from "../modals/EventModal";
import DateSelectArg from "@fullcalendar/react"
import DateClickArg from "@fullcalendar/react"
import { Event } from "@prisma/client";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { getEventInfo } from "@/lib/actions/event.actions";
import { createEvent } from "@/lib/actions/event.actions";

interface CalendarProps {
  session: Session | null;
  events: Event[]
}

interface EventProps {
  id: string | null;
  title: string;
  description: string;
  date: Date;
  allDay: boolean;
}

function Calendar({ session, events }: CalendarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventData, setEventData] = useState<EventProps | null>(null);

const handleDateClick = (arg: DateClickArg) => {
  setSelectedDate(arg.date);
  setEventData({
    id: null,
    title: "editEvent.title",
    description: "editEvent.description",
    date: arg.date,
    allDay: false,
  });
  setEventData(null);
  setIsModalOpen(true);
};


const handleEventClick = async ({ event }: EventClickArg) => {
  try {
    const editEvent = await getEventInfo({ eventId: event.id });
    if (editEvent) {
      setEventData({
        id: event.id,
        title: editEvent.title,
        description: editEvent.description || "",
        date: editEvent.start,
        allDay: editEvent.allDay,
      });
      setSelectedDate(editEvent.start)
      setIsModalOpen(true);
    }
    console.log(eventData)
    console.log(editEvent.start)
  } catch (error: any) {
    console.error("Error fetching event:", error.message);
  }
};

const handleCloseModal = () => {
  setIsModalOpen(false);
};
  return (
    <>
      <section>
        <div>
          <div className="text-base-semibold text-light-2 max-w-full bg-dark-2 p-4 rounded-lg">
            <h1 className="head-text text-left mb-1">Events</h1>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              timeZone="CET"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek",
              }}
              events={events.map(event => ({
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.start,
                allDay: event.allDay,
              }))}
              eventColor="#877EFF"
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              selectable
              
            />
          </div>
        </div>
      </section>
      {isModalOpen && (
        <EventModal
        session={session}
        onClose={handleCloseModal}
        selectedDate={selectedDate}
        eventData={eventData} />
      )}
    </>
  );
}

export default Calendar;
