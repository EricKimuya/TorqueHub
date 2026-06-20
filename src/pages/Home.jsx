import React, { useState, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import useEvents from '../hooks/useEvents';

// Vite requires importing files from src/ as modules, not plain string paths.
// Swap "car-hero.mp4" for your actual filename if it's different.
import carHeroVideo from '../assets/BMW Video 2026-06-17 at 15.21.04.mp4';

// ─── Animations ─────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─── Layout ──────────────────────────────────────────────────────────
const Page = styled.div`
  min-height: 100vh;
`;

// ─── Hero ────────────────────────────────────────────────────────────
const Hero = styled.section`
  position: relative;
  overflow: hidden;
  padding: 80px 40px 60px;
  min-height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  /* Darkens the video so white/light text stays readable.
     Lighter overall, still slightly heavier near the bottom
     where the text/stats sit. */
  background: linear-gradient(
    180deg,
    rgba(10, 10, 10, 0.3) 0%,
    rgba(10, 10, 10, 0.45) 60%,
    rgba(10, 10, 10, 0.65) 100%
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
`;

const HeroTag = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 20px;
  animation: ${fadeUp} 0.5s 0.1s both;
`;

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(56px, 9vw, 100px);
  font-weight: 800;
  text-transform: uppercase;
  line-height: 0.92;
  letter-spacing: -0.01em;
  animation: ${fadeUp} 0.6s 0.2s both;

  .outline {
    -webkit-text-stroke: 1.5px ${({ theme }) => theme.colors.text};
    color: transparent;
  }

  .accent {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const HeroSub = styled.p`
  margin-top: 24px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 420px;
  line-height: 1.6;
  animation: ${fadeUp} 0.6s 0.35s both;
`;

const HeroStats = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 48px;
  animation: ${fadeUp} 0.6s 0.45s both;
`;

const Stat = styled.div`
  border-left: 2px solid
    ${({ $color, theme }) => {
      if ($color === 'accent') return theme.colors.accent;
      if ($color === 'accent2') return theme.colors.accent2;
      return theme.colors.border;
    }};
  padding-left: 14px;
`;

const StatNum = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 4px;
`;

// ─── Filter Bar ──────────────────────────────────────────────────────
const FilterBar = styled.div`
  padding: 0 40px 32px;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.5s 0.55s both;
`;

const FilterLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-right: 6px;
`;

const FilterBtn = styled.button`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 7px 16px;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.border)};
  background: ${({ $active }) => ($active ? 'rgba(232, 64, 28, 0.1)' : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.muted)};
  transition: all 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
    background: rgba(232, 64, 28, 0.06);
  }
`;

const CountBadge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.muted};
  margin-left: auto;
`;

// ─── Section Header ──────────────────────────────────────────────────
const SectionHeader = styled.div`
  padding: 0 40px 20px;
  display: flex;
  align-items: baseline;
  gap: 16px;
`;

const SectionTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  white-space: nowrap;
`;

const SectionLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
`;

// ─── Events Grid ─────────────────────────────────────────────────────
const EventsGrid = styled.div`
  padding: 0 40px 60px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1px;
  background: ${({ theme }) => theme.colors.border};
`;

const SkeletonCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  height: 340px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.5; }
  }
`;

const ErrorMsg = styled.div`
  padding: 40px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

// ─── Upcoming Strip ──────────────────────────────────────────────────
const UpcomingStrip = styled.div`
  margin: 0 40px 60px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 24px;
`;

const StripHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StripTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const StripLink = styled.button`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const StripItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover .strip-title {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const StripNum = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.border};
  width: 20px;
  flex-shrink: 0;
`;

const StripDateBlock = styled.div`
  width: 50px;
  flex-shrink: 0;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 6px 4px;
`;

const StripDay = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
`;

const StripMonth = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  letter-spacing: 0.1em;
`;

const StripInfo = styled.div`
  flex: 1;
`;

const StripItemTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.2s;
`;

const StripItemLoc = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 2px;
`;

const StripPrice = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent2};
`;

// ─── Filter logic ────────────────────────────────────────────────────
const FILTERS = [
  { key: 'all', label: 'All Events' },
  { key: 'open', label: 'Open' },
  { key: 'racer', label: 'Racer Slots' },
  { key: 'spectator', label: 'Spectator' },
];

const applyFilter = (events, filter) => {
  switch (filter) {
    case 'open':     return events.filter((e) => e.status === 'open');
    case 'limited':  return events.filter((e) => e.status === 'limited');
    case 'racer':    return events.filter((e) => e.hasRacer && e.status !== 'sold');
    case 'spectator':return events.filter((e) => e.hasSpectator);
    default:         return events;
  }
};

// ─── HomePage ────────────────────────────────────────────────────────
const HomePage = () => {
  const navigate = useNavigate();
  const { events, loading, error } = useEvents();
  const [activeFilter, setActiveFilter] = useState('all');

  // Split featured (first) from rest; apply filter
  const upcomingEvents = events.filter((e) => {
    const d = new Date(e.date);
    return d >= new Date();
  });

  const filteredEvents = useMemo(
    () => applyFilter(upcomingEvents, activeFilter),
    [upcomingEvents, activeFilter]
  );

  const [featuredEvent, ...restEvents] = filteredEvents;

  // Separate out events > 6 weeks away for the "further ahead" strip
  const sixWeeks = new Date();
  sixWeeks.setDate(sixWeeks.getDate() + 42);
  const mainEvents    = filteredEvents.filter((e) => new Date(e.date) <= sixWeeks);
  const furtherEvents = events.filter((e) => new Date(e.date) > sixWeeks).slice(0, 5);

  return (
    <Page>
      {/* ── Hero ── */}
      <Hero>
        <HeroVideo autoPlay loop muted playsInline>
          <source src={carHeroVideo} type="video/mp4" />
        </HeroVideo>
        <HeroOverlay />

        <HeroContent>
          <HeroTag>// 2025 Season — Nairobi Circuit Series</HeroTag>
          <HeroTitle>
            <span className="outline">Track</span>
            <br />
            <span className="accent">Meets</span>
            <br />
            Unleashed
          </HeroTitle>
          <HeroSub>
            Register for Nairobi's premier car meet events. Spectate the action
            or enter your machine on the strip.
          </HeroSub>
          <HeroStats>
            <Stat $color="accent">
              <StatNum>{events.length || '—'}</StatNum>
              <StatLabel>Events this season</StatLabel>
            </Stat>
            <Stat $color="accent2">
              <StatNum>
                {events.reduce((sum, e) => sum + (e.soldCount ?? 0), 0).toLocaleString() || '—'}
              </StatNum>
              <StatLabel>Tickets sold</StatLabel>
            </Stat>
            <Stat $color="neutral">
              <StatNum>
                {events.filter((e) => e.hasRacer).length || '—'}
              </StatNum>
              <StatLabel>Racing events</StatLabel>
            </Stat>
          </HeroStats>
        </HeroContent>
      </Hero>

      {/* ── Filter Bar ── */}
      <FilterBar>
        <FilterLabel>Filter:</FilterLabel>
        {FILTERS.map((f) => (
          <FilterBtn
            key={f.key}
            $active={activeFilter === f.key}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </FilterBtn>
        ))}
        <CountBadge>
          Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
        </CountBadge>
      </FilterBar>

      {/* ── Events Grid ── */}
      <SectionHeader>
        <SectionTitle>Upcoming Events</SectionTitle>
        <SectionLine />
      </SectionHeader>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <EventsGrid>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : mainEvents.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                featured={i === 0 && mainEvents.length > 2}
              />
            ))}
      </EventsGrid>

      {/* ── Further Ahead Strip ── */}
      {furtherEvents.length > 0 && (
        <UpcomingStrip>
          <StripHeader>
            <StripTitle>Further ahead</StripTitle>
            <StripLink onClick={() => navigate('/events')}>
              View full calendar →
            </StripLink>
          </StripHeader>
          {furtherEvents.map((event, i) => {
            const d = new Date(event.date);
            return (
              <StripItem key={event.id} onClick={() => navigate(`/events/${event.id}`)}>
                <StripNum>0{i + 1}</StripNum>
                <StripDateBlock>
                  <StripDay>{d.getDate()}</StripDay>
                  <StripMonth>
                    {d.toLocaleDateString('en-KE', { month: 'short' })}
                  </StripMonth>
                </StripDateBlock>
                <StripInfo>
                  <StripItemTitle className="strip-title">{event.name}</StripItemTitle>
                  <StripItemLoc>{event.venue}</StripItemLoc>
                </StripInfo>
                <StripPrice>
                  KES {Math.min(event.spectatorPrice, event.racerPrice).toLocaleString()}
                </StripPrice>
              </StripItem>
            );
          })}
        </UpcomingStrip>
      )}
    </Page>
  );
};

export default HomePage;