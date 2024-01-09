"use client";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Session } from "next-auth";
import { useState } from "react";
import EventModal from "../modals/EventModal";

const events = [
  { title: "Event 1", date: "2024-01-06" },
  // ...other events
];

interface CalendarProps {
  session: Session | null;
}

interface EventDetail {
  id?: string;
  title?: string;
  start: Date;
  end: Date;
}

function Calendar({ session }: CalendarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenClick = () => {
    setIsModalOpen(true);
  };

  const handleEventClick = () => {
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
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek",
              }}
              events={events}
              eventColor="#877EFF"
              dateClick={handleOpenClick}
              eventClick={handleEventClick}
            />
          </div>
        </div>
      </section>
      {isModalOpen && (
        <EventModal session={session} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default Calendar;
