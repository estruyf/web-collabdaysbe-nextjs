export interface Agenda {
  title: string;
  sessions: Session[];
}

export interface Session {
  start: string;
  end: string;
  speaker: string;
  title: string;
  description: string;
  url: string;
}