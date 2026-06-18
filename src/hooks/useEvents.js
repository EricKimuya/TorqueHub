import { useState, useEffect } from 'react';

/**
 * ── MOCKED — swap out when Flask API is ready ──────────────────────
 * Replace the mock data + timeout below with:
 *
 *   import api from '../api';
 *   const { data } = await api.get('/events');
 *   setEvents(data.events.map(transform));
 *
 * and delete the MOCK_EVENTS block entirely.
 */

const MOCK_EVENTS = [
  {
    id: '1',
    name: 'Night Drag Series — Round 4',
    date: '2025-06-14T20:00:00',
    venue: 'Nairobi Raceway, Karen',
    status: 'open',
    capacity: 200,
    soldCount: 144,
    hasSpectator: true,
    hasRacer: true,
    spectatorPrice: 500,
    racerPrice: 2500,
    description:
      'The biggest drag night of the season. Modified street cars, AWD monsters, and open class. 400m strip, live timing boards, food court.',
  },
  {
    id: '2',
    name: 'JDM Sunday Showdown',
    date: '2025-06-22T09:00:00',
    venue: 'KICC Grounds',
    status: 'open',
    capacity: 300,
    soldCount: 102,
    hasSpectator: true,
    hasRacer: false,
    spectatorPrice: 300,
    racerPrice: 0,
    description:
      'Static show + rolling exhibition. Japanese imports only. Judges awards, best engine bay, best stance.',
  },
  {
    id: '3',
    name: 'Independence Burnout Bash',
    date: '2025-07-04T18:00:00',
    venue: 'Mombasa Road Strip',
    status: 'limited',
    capacity: 80,
    soldCount: 71,
    hasSpectator: true,
    hasRacer: true,
    spectatorPrice: 400,
    racerPrice: 2500,
    description:
      'Tyre slaying competition. Smoke show categories: RWD street, modified, V8 open. Only 8 racer slots left.',
  },
  {
    id: '4',
    name: 'Track Day — Open Class',
    date: '2025-07-12T08:00:00',
    venue: 'Ngong Raceway',
    status: 'sold',
    capacity: 60,
    soldCount: 60,
    hasSpectator: true,
    hasRacer: true,
    spectatorPrice: 600,
    racerPrice: 3000,
    description:
      'Full circuit laps, hot lap sessions, amateur + pro splits. All sold out — join the waitlist.',
  },
  {
    id: '5',
    name: 'Drift Academy Open Day',
    date: '2025-07-19T10:00:00',
    venue: 'Athi River',
    status: 'open',
    capacity: 40,
    soldCount: 16,
    hasSpectator: true,
    hasRacer: true,
    spectatorPrice: 200,
    racerPrice: 1200,
    description:
      'Instructors on-site. Beginners welcome. Bring your rear-wheel-drive and learn to slide. Helmets provided.',
  },
  {
    id: '6',
    name: 'Supercar Sunday',
    date: '2025-07-27T11:00:00',
    venue: 'Two Rivers Mall',
    status: 'open',
    capacity: 500,
    soldCount: 90,
    hasSpectator: true,
    hasRacer: false,
    spectatorPrice: 0,
    racerPrice: 0,
    description:
      'Exotics, muscle, and hypercars on display. Lamborghini, Ferrari, Porsche owners — register your slot in the paddock.',
  },
  // Further ahead — these appear in the strip at the bottom
  {
    id: '7',
    name: 'Rally Sprint — Limuru Hills',
    date: '2025-08-02T07:00:00',
    venue: 'Limuru, Kiambu County',
    status: 'open',
    capacity: 50,
    soldCount: 10,
    hasSpectator: true,
    hasRacer: true,
    spectatorPrice: 500,
    racerPrice: 3000,
    description: 'Off-road sprint through the Limuru highlands. All classes welcome.',
  },
  {
    id: '8',
    name: 'Midnight Drag — JKIA Circuit',
    date: '2025-08-16T22:00:00',
    venue: 'Embakasi, Nairobi',
    status: 'open',
    capacity: 120,
    soldCount: 30,
    hasSpectator: true,
    hasRacer: true,
    spectatorPrice: 600,
    racerPrice: 1500,
    description: 'Midnight quarter-mile under floodlights. Street and modified classes.',
  },
  {
    id: '9',
    name: 'Season Finale — Ngong Raceway',
    date: '2025-08-30T09:00:00',
    venue: 'Ngong, Kajiado County',
    status: 'open',
    capacity: 150,
    soldCount: 20,
    hasSpectator: true,
    hasRacer: true,
    spectatorPrice: 800,
    racerPrice: 4000,
    description: 'End of season championship. Points finalists compete for the title.',
  },
];

// ─── Date formatting helper ──────────────────────────────────────────
const formatEventDate = (isoDate) => {
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-KE', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// ─── Price display helper ────────────────────────────────────────────
const formatPrice = (event) => {
  if (event.hasSpectator && event.hasRacer) {
    return {
      label: 'From',
      display: `KES ${event.spectatorPrice.toLocaleString()}`,
    };
  }
  if (event.hasRacer) {
    return { label: 'Racer entry', display: `KES ${event.racerPrice.toLocaleString()}` };
  }
  if (event.spectatorPrice === 0) {
    return { label: 'Spectator', display: 'Free' };
  }
  return { label: 'Spectator', display: `KES ${event.spectatorPrice.toLocaleString()}` };
};

// ─── Hook ────────────────────────────────────────────────────────────
const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate a network delay so loading skeletons are visible
    const timer = setTimeout(() => {
      const transformed = MOCK_EVENTS.map((e) => {
        const price = formatPrice(e);
        return {
          ...e,
          dateLabel: formatEventDate(e.date),
          priceLabel: price.label,
          priceDisplay: price.display,
        };
      });
      setEvents(transformed);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { events, loading, error };
};

export default useEvents;