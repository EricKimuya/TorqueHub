import EventCard from "../components/EventCard";

const events = [
  {
    id: 1,
    name: "TorqueHub Drift Night",
    date: "20 August 2026",
    venue: "Kasarani Stadium"
  },
  {
    id: 2,
    name: "Nairobi Drag Event",
    date: "15 September 2026",
    venue: "Jamhuri Grounds"
  }
];

function Home() {
  return (
    <div>
      <h1>Upcoming Events</h1>

      {events.map(event => (
        <EventCard
          key={event.id}
          event={event}
        />
      ))}
    </div>
  );
}

export default Home;