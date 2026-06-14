import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div>
      <h3>{event.name}</h3>
      <p>{event.date}</p>
      <p>{event.venue}</p>

      <Link to={`/events/${event.id}`}>
        View Event
      </Link>
    </div>
  );
}

export default EventCard;