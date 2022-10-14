import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Agenda as IAgenda } from '../models';
import { Dropdown } from './Dropdown';

export interface IAgendaProps {
  agenda: IAgenda[];
  timeslot?: string;
  zoom?: number;
}

export interface TimeSlot {
  start: string;
  end: string;
}

export const Agenda: React.FunctionComponent<IAgendaProps> = ({agenda, timeslot, zoom}: React.PropsWithChildren<IAgendaProps>) => {
  const [ selectedTimeslot, setSelectedTimeslot ] = useState<TimeSlot | undefined>(undefined);
  
  const rooms = useMemo(() => {
    return agenda.map(s => s.title)
  }, [agenda]);

  const timeslots = useMemo(() => {
    const firstRoom = agenda.find(s => s.title.toLowerCase() !== "keynote");
    if (!firstRoom) {
      return [];
    }

    const allTimeslots = firstRoom.sessions.map(t => ({ start: t.start, end: t.end }));

    const keynote = agenda.find(s => s.title.toLowerCase() === "keynote");
    if (keynote && keynote.sessions.length > 0) {
      allTimeslots.unshift({ start: keynote.sessions[0].start, end: keynote.sessions[0].end });
    }

    return allTimeslots;
  }, [agenda]);

  const sessions = useMemo(() => {
    if (!selectedTimeslot) {
      return agenda;
    }

    return agenda.map(room => ({
      title: room.title,
      sessions: room.sessions.filter(s => s.start === selectedTimeslot.start && s.end === selectedTimeslot.end)
    }));
  }, [agenda, selectedTimeslot]);

  const updateTimeSlot = (timeslot: string) => {
    if (!timeslot || timeslot === "All") {
      setSelectedTimeslot(undefined);
      return;
    }

    const [start, end] = timeslot.split(" - ");
    setSelectedTimeslot({ start, end });
  };
  
  useEffect(() => {    
    if (timeslot && timeslots.length > 0) {
      const slot = timeslots.find(t => t.start === timeslot);
      if (slot) {
        setSelectedTimeslot(slot);
      }
    }
  }, [timeslot, setSelectedTimeslot, timeslots]);

  if (!agenda) {
    return null;
  }

  return (
    <main className={`mx-auto w-full lg:max-w-7xl px-4 sm:px-6 lg:px-8 text-base`}>
      {
        timeslots && timeslots.length > 0 && (
          <div className={`flex flex-col lg:flex-row items-center justify-center gap-4`}>
            <Dropdown 
              title={selectedTimeslot ? `${selectedTimeslot.start} - ${selectedTimeslot.end}` : `Filter by timeslot`} 
              items={["All", ...timeslots.map(t => `${t.start} - ${t.end}`)]}
              triggerSelected={updateTimeSlot} />
          </div>
        )
      }

      {
        sessions.map(room => (
          room.sessions.length > 0 && (
            <div key={room.title} className={`py-2 ${zoom !== 1 ? "mb-1" : "mb-2"}`}>
              <h2 className={`text-2xl font-semibold border-b border-gray-100 py-2 mb-2`}>{room.title}</h2>
              
              <div className={`mx-2`}>
                {
                  room.sessions.map(session => (
                    <div key={session.title} className={`flex flex-col items-center justify-between space-y-1 border-b border-gray-100 py-2 mb-2 last:border-0`}>
                      <h3 className={`font-semibold tracking-tight text-center ${zoom !== 1 ? "text-2xl" : ""}`}>
                        <a href={session.url} target="_blank" rel="noreferrer" className={`text-blue`}>{session.title}</a>
                      </h3>
                      <p className={`tracking-tight ${zoom !== 1 ? "text-xl" : "text-sm"}`}>{ session.speaker }</p>
                      <p className={`font-mono ${zoom !== 1 ? "text-xl" : "text-sm"}`}>{ session.start } - { session.end }</p>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        ))
      }
    </main>
  );
};