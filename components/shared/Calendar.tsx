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

interface CalendarProps {
  session: Session | null;
  events: Event[];
}

function Calendar({ session, events }: CalendarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.date);

    setIsModalOpen(true);
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
            />
          </div>
        </div>
      </section>
      {isModalOpen && (
        <EventModal
          session={session}
          onClose={handleCloseModal}
          selectedDate={selectedDate}
        />
      )}
    </>
  );
}

export default Calendar;
