"use client";
import {
  createEvent,
  deleteEvent,
  getEventInfo,
  updateEvent,
} from "@/lib/actions/event.actions";
import { EventClickArg } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  default as DateClickArg,
  default as FullCalendar,
} from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Event } from "@prisma/client";
import { Session } from "next-auth";
import Image from "next/image";
import { useState } from "react";
import EventModal from "../modals/EventModal";

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
      title: "Title",
      description: "Description",
      date: arg.date,
      allDay: false,
      label: "Create",
      action: createEvent,
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
          action: updateEvent,
        });
        setSelectedDate(editEvent.start);
        setIsModalOpen(true);
      }
      console.log(eventData);
    } catch (error: any) {
      console.error("Error fetching event:", error.message);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveEvent = async (eventId: string) => {
    try {
      await deleteEvent({
        data: {
          id: eventId,
        },
        session,
      });
      console.log("Event deleted successfully");
    } catch (error: any) {
      console.error("Error deleting event:", error.message);
    }
  };

  const renderEventContent = (eventInfo: any) => {
    return (
      <>
        <div className=" flex justify-between items-center">
          <div className="truncate max-w-[80%]">{eventInfo.event.title}</div>

          <div>
            <button
              className="bg-primary"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveEvent(eventInfo.event.id);
              }}
            >
              <Image
                src="/assets/delete.svg"
                alt="Trash"
                width={14}
                height={14}
                className="cursor-pointer object-contain"
              />
            </button>
          </div>
        </div>
      </>
    );
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
              eventContent={renderEventContent}
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
