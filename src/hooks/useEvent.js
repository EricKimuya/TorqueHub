import { useState, useEffect } from 'react';

/**
 * ── MOCKED — swap out when Flask API is ready ──────────────────────
 * Replace the mock lookup + timeout below with:
 *
 *   import api from '../api';
 *   const { data } = await api.get(`/events/${id}`);
 *   setEvent(transform(data));
 *
 * Expected real backend response shape for GET /api/events/:id:
 * {
 *   id, name, date, venue, lat, lng, description, capacity,
 *   soldCount, status: 'open' | 'limited' | 'sold',
 *   hasSpectator, hasRacer, spectatorPrice, racerPrice,
 *   spectatorQuota, spectatorSold, racerQuota, racerSold,
 *   rules: string[], organizer: string,
 * }
 */

const MOCK_EVENT_DETAILS = {
  '1': {
    id: '1',
    name: 'Night Drag Series — Round 4',
    date: '2025-06-14T20:00:00',
    venue: 'Nairobi Raceway, Karen',
    lat: -1.3197,
    lng: 36.7076,
    status: 'open',
    capacity: 200,
    soldCount: 144,
    hasSpectator: true,
    hasRacer: true,
    spectatorPrice: 500,
    racerPrice: 2500,
    spectatorQuota: 150,
    spectatorSold: 98,
    racerQuota: 50,
    racerSold: 46,
    organizer: 'Nairobi Raceway Co.',
    description:
      'The biggest drag night of the season. Modified street cars, AWD monsters, and open class. 400m strip, live timing boards, food court on site. Gates open 6:30PM, first race 8:00PM sharp.',
    rules: [
      'Valid driving license required for all racer entries',
      'Roll cage mandatory for vehicles running under 11 seconds',
      'Helmets provided at gate for racer entries',
      'No alcohol on premises before racing concludes',
      'Vehicle scrutineering closes 7:30PM — arrive early',
    ],
  },
};

const FALLBACK_EVENT = {
  id: 'unknown',
  name: 'JDM Sunday Showdown',
  date: '2025-06-22T09:00:00',
  venue: 'KICC Grounds',
  lat: -1.2864,
  lng: 36.8172,
  status: 'open',
  capacity: 300,
  soldCount: 102,
  hasSpectator: true,
  hasRacer: false,
  spectatorPrice: 300,
  racerPrice: 0,
  spectatorQuota: 300,
  spectatorSold: 102,
  racerQuota: 0,
  racerSold: 0,
  organizer: 'TorqueHub Events',
  description:
    "Static show + rolling exhibition. Japanese imports only. Judges awards for best engine bay, best stance, and people's choice. Open to all JDM platforms.",
  rules: [
    'Vehicle must be Japanese-manufactured to enter show category',
    'No burnouts or revving in the display area',
    'Judging begins at 1:00PM',
  ],
};

const formatEventDate = (isoDate) => {
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-KE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const formatEventTime = (isoDate) => {
  const d = new Date(isoDate);
  return d.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' });
};

const useEvent = (id) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const raw = MOCK_EVENT_DETAILS[id] || FALLBACK_EVENT;
      setEvent({
        ...raw,
        dateLabel: formatEventDate(raw.date),
        timeLabel: formatEventTime(raw.date),
      });
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [id]);

  return { event, loading, error };
};

export default useEvent;