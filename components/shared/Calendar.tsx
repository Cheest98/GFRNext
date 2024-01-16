"use client";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  default as DateClickArg,
  default as FullCalendar,
} from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Event } from "@prisma/client";
import { Session } from "next-auth";
import { useState } from "react";
import EventModal from "../modals/EventModal";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { createEvent, getEventInfo, updateEvent } from "@/lib/actions/event.actions";

interface CalendarProps {
  session: Session | null;
  events: Event[];
}

interface EventProps {
  id: string | null;
  title: string;
  description: string;
  date: Date;
  allDay: boolean;
  label: string;
  action: (data: any) => Promise<void>;
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
    label: "Create",
    action: createEvent
  });
  setIsModalOpen(true);
};

const handleEventClick = async ({ event }: EventClickArg) => {
  try {
    const editEvent = await getEventInfo({ eventId: event.id });
    setSelectedDate(editEvent.start);
    if (editEvent) {
      setEventData({
        id: editEvent.id,
        title: editEvent.title,
        description: editEvent.description || "",
        date: editEvent.start,
        allDay: editEvent.allDay,
        label: "Update",
        action: updateEvent
      });
      setSelectedDate(editEvent.start)
      setIsModalOpen(true);
    }
    console.log(eventData)
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
              events={events.map((event) => ({
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.start,
                allDay: event.allDay,
              }))}
              eventColor="#877EFF"
              dateClick={handleDateClick}
              eventClick={handleEventClick}
            />
          </div>
        </div>
      </section>
      {isModalOpen && (
        <EventModal
          session={session}
          onClose={handleCloseModal}
          selectedDate={selectedDate}
          eventInfo={eventData}
        />
      )}
    </>
  );
}

export default Calendar;
