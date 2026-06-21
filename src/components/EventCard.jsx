import React from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// ─── Styled Components ──────────────────────────────────────────────

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background 0.2s;

  ${({ $featured }) =>
    $featured &&
    css`
      grid-column: span 2;
    `}

  &:hover {
    background: ${({ theme }) => theme.colors.surface2};
  }

  &:hover .card-arrow {
    transform: translate(3px, -3px);
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:hover .card-image-inner {
    transform: scale(1.04);
  }
`;

const CardImage = styled.div`
  height: ${({ $featured }) => ($featured ? '240px' : '180px')};
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface2};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $soldOut }) => ($soldOut ? 0.5 : 1)};
`;

const TicketBadges = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 6px;
`;

const Badge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  font-weight: 500;

  ${({ $variant, theme }) =>
    $variant === 'spectator' &&
    css`
      background: rgba(10, 10, 10, 0.85);
      color: ${theme.colors.text};
      border: 1px solid ${theme.colors.border};
    `}

  ${({ $variant, theme }) =>
    $variant === 'racer' &&
    css`
      background: ${theme.colors.accent};
      color: #fff;
    `}

  ${({ $variant, theme }) =>
    $variant === 'sold' &&
    css`
      background: ${theme.colors.muted};
      color: ${theme.colors.black};
    `}
`;

const StatusStrip = styled.div`
  height: 3px;
  width: 100%;
  background: ${({ $status, theme }) => {
    if ($status === 'open')
      return `linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.accent2})`;
    if ($status === 'limited') return theme.colors.accent2;
    return theme.colors.muted;
  }};
`;

const CardBody = styled.div`
  padding: 20px 20px 16px;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const CardDate = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.1em;
  color: ${({ $limited, theme }) => ($limited ? theme.colors.accent2 : theme.colors.accent)};
  text-transform: uppercase;
`;

const Dot = styled.div`
  width: 3px;
  height: 3px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 50%;
`;

const CardLocation = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $featured }) => ($featured ? '30px' : '22px')};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  line-height: 1.1;
  margin-bottom: 8px;
  color: ${({ $soldOut, theme }) => ($soldOut ? theme.colors.muted : theme.colors.text)};
`;

const CardDesc = styled.p`
  font-size: 12px;
  color: ${({ $soldOut, theme }) => ($soldOut ? '#444' : theme.colors.muted)};
  line-height: 1.5;
  margin-bottom: 16px;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const PriceGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const PriceLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const PriceValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 20px;
  font-weight: 700;
  color: ${({ $limited, $soldOut, theme }) => {
    if ($soldOut) return theme.colors.muted;
    if ($limited) return theme.colors.accent2;
    return theme.colors.text;
  }};
`;

const CapacityBar = styled.div`
  flex: 1;
  margin: 0 16px;
`;

const CapLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const CapText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $alert, theme }) => ($alert ? theme.colors.accent2 : theme.colors.muted)};
`;

const CapTrack = styled.div`
  height: 3px;
  background: ${({ theme }) => theme.colors.border};
  position: relative;
`;

const CapFill = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $pct, theme }) => {
    if ($pct >= 80) return theme.colors.accent;
    if ($pct >= 50) return theme.colors.accent2;
    return '#22c55e';
  }};
  transition: width 0.8s ease;
`;

const CardArrow = styled.div.attrs({ className: 'card-arrow' })`
  width: 28px;
  height: 28px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, border-color 0.2s;
  flex-shrink: 0;
  opacity: ${({ $soldOut }) => ($soldOut ? 0.3 : 1)};
`;

// ─── Component ──────────────────────────────────────────────────────

const EventCard = ({ event, featured = false }) => {
  const navigate = useNavigate();
  const soldOut = event.status === 'sold';
  const limited = event.status === 'limited';
  const capacityPct = Math.round((event.soldCount / event.capacity) * 100);

  return (
    <Card
      $featured={featured}
      onClick={() => navigate(`/events/${event.id}`)}
    >
      <CardImage $featured={featured} $soldOut={soldOut}>
        {/* Replace with actual event image when available */}
        <CarPlaceholderSVG />
        <TicketBadges>
          {soldOut ? (
            <Badge $variant="sold">Sold Out</Badge>
          ) : (
            <>
              {event.hasSpectator && <Badge $variant="spectator">Spectator</Badge>}
              {event.hasRacer && <Badge $variant="racer">Racer</Badge>}
            </>
          )}
        </TicketBadges>
      </CardImage>

      <StatusStrip $status={event.status} />

      <CardBody>
        <CardMeta>
          <CardDate $limited={limited}>{event.dateLabel}</CardDate>
          <Dot />
          <CardLocation>{event.venue}</CardLocation>
        </CardMeta>

        <CardTitle $featured={featured} $soldOut={soldOut}>
          {event.name}
        </CardTitle>

        <CardDesc $soldOut={soldOut}>{event.description}</CardDesc>

        <CardFooter>
          <PriceGroup>
            <PriceLabel>{soldOut ? 'Status' : event.priceLabel}</PriceLabel>
            <PriceValue $limited={limited} $soldOut={soldOut}>
              {soldOut ? 'Sold out' : event.priceDisplay}
            </PriceValue>
          </PriceGroup>

          <CapacityBar>
            <CapLabel>
              <CapText>{event.hasRacer ? 'Racer slots' : 'Capacity'}</CapText>
              <CapText $alert={capacityPct >= 80}>{capacityPct}%</CapText>
            </CapLabel>
            <CapTrack>
              <CapFill $pct={capacityPct} />
            </CapTrack>
          </CapacityBar>

          <CardArrow $soldOut={soldOut}>
            <ArrowIcon />
          </CardArrow>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

// ─── Mini SVGs ──────────────────────────────────────────────────────

const CarPlaceholderSVG = () => (
  <svg
    className="card-image-inner"
    width="180"
    height="80"
    viewBox="0 0 180 80"
    fill="none"
    style={{ opacity: 0.15, transition: 'opacity 0.3s' }}
  >
    <path
      d="M8 58 L28 36 L48 24 L132 24 L152 36 L172 52 L174 58 L6 58 Z"
      stroke="white"
      strokeWidth="2"
    />
    <circle cx="38" cy="58" r="9" stroke="white" strokeWidth="2" />
    <circle cx="142" cy="58" r="9" stroke="white" strokeWidth="2" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="white"
    strokeWidth="1.5"
  >
    <path d="M2 10L10 2M10 2H4M10 2V8" />
  </svg>
);

export default EventCard;