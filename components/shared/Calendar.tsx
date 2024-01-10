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

const events = [
  { title: "Event 1", date: "2024-01-06" },
];

interface CalendarProps {
  session: Session | null;
}


function Calendar({ session }: CalendarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.date);
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
      />
      )}
    </>
  );
}

export default Calendar;
