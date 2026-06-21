import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import useEvent from '../hooks/useEvent';

// ─── Animations ─────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─── Layout ──────────────────────────────────────────────────────────
const Page = styled.div`
  min-height: 100vh;
  padding-bottom: 80px;
`;

const BackLink = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 24px 40px 0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

// ─── Hero / Header block ─────────────────────────────────────────────
const HeaderBlock = styled.section`
  padding: 24px 40px 40px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  animation: ${fadeUp} 0.5s 0.05s both;
`;

const StatusPill = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 5px 12px;
  border: 1px solid
    ${({ $status, theme }) =>
      $status === 'sold' ? theme.colors.muted : theme.colors.accent};
  color: ${({ $status, theme }) =>
    $status === 'sold' ? theme.colors.muted : theme.colors.accent};
`;

const EventTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 800;
  text-transform: uppercase;
  line-height: 0.98;
  letter-spacing: -0.01em;
  max-width: 800px;
  animation: ${fadeUp} 0.5s 0.1s both;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 24px;
  animation: ${fadeUp} 0.5s 0.18s both;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MetaLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const MetaValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

// ─── Main content grid ────────────────────────────────────────────────
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 0;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainCol = styled.div`
  padding: 40px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const SideCol = styled.div`
  padding: 40px;
  position: sticky;
  top: 80px;

  @media (max-width: 900px) {
    position: static;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 40px;
`;

// ─── Map ─────────────────────────────────────────────────────────────
const MapWrap = styled.div`
  margin-bottom: 40px;
`;

const MapFrame = styled.div`
  width: 100%;
  height: 280px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  position: relative;
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.surface};
  flex-direction: column;
  gap: 8px;
`;

const PinDot = styled.div`
  width: 14px;
  height: 14px;
  background: ${({ theme }) => theme.colors.accent};
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  box-shadow: 0 0 0 4px rgba(232, 64, 28, 0.2);
`;

const MapCoords = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.muted};
  letter-spacing: 0.05em;
`;

const DirectionsLink = styled.a`
  display: inline-block;
  margin-top: 12px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

// ─── Ticket selector (sidebar) ───────────────────────────────────────
const TicketBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: 24px;
`;

const TicketTypeRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const TicketTypeBtn = styled.button`
  flex: 1;
  padding: 12px 8px;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.border)};
  background: ${({ $active }) => ($active ? 'rgba(232, 64, 28, 0.1)' : 'transparent')};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.muted)};
  transition: all 0.15s;
  opacity: ${({ $disabled }) => ($disabled ? 0.35 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const PriceDisplay = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 4px;
`;

const PriceAmount = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 32px;
  font-weight: 700;
`;

const PriceUnit = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
`;

const SlotsRemaining = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $urgent, theme }) => ($urgent ? theme.colors.accent2 : theme.colors.muted)};
  margin-bottom: 20px;
`;

const QtyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 20px;
`;

const QtyLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const QtyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const QtyBtn = styled.button`
  width: 26px;
  height: 26px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;

const QtyValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 16px;
  font-weight: 700;
  min-width: 20px;
  text-align: center;
`;

const TotalRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TotalLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const TotalValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const BuyButton = styled.button`
  width: 100%;
  padding: 14px;
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.border : theme.colors.accent};
  color: ${({ disabled, theme }) => (disabled ? theme.colors.muted : '#fff')};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: background 0.2s;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background: ${({ disabled }) => (disabled ? null : '#c93416')};
  }
`;

// ─── Racer form ────────────────────────────────────────────────────────
const RacerForm = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FormLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  display: block;
  margin-bottom: 6px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  background: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  transition: border-color 0.15s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${({ $cols }) => $cols || '1fr'};
  gap: 12px;
`;

const FormHint = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9px;
  color: ${({ theme }) => theme.colors.muted};
`;

// ─── Skeleton / error ──────────────────────────────────────────────────
const CenterMsg = styled.div`
  padding: 120px 40px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

// ─── Component ──────────────────────────────────────────────────────
const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { event, loading, error } = useEvent(id);

  const [ticketType, setTicketType] = useState(null); // 'spectator' | 'racer'
  const [quantity, setQuantity] = useState(1);
  const [racerDetails, setRacerDetails] = useState({
    carMake: '',
    carModel: '',
    carYear: '',
    driverLicense: '',
    classCategory: '',
  });

  // Set default ticket type once event loads
  React.useEffect(() => {
    if (event && !ticketType) {
      if (event.hasSpectator) setTicketType('spectator');
      else if (event.hasRacer) setTicketType('racer');
    }
  }, [event, ticketType]);

  if (loading) return <CenterMsg>Loading event...</CenterMsg>;
  if (error || !event) return <CenterMsg>{error || 'Event not found.'}</CenterMsg>;

  const isRacer = ticketType === 'racer';
  const unitPrice = isRacer ? event.racerPrice : event.spectatorPrice;
  const total = unitPrice * quantity;

  const spectatorSlotsLeft = event.spectatorCapacity - event.spectatorSold;
  const racerSlotsLeft = event.racerCapacity - event.racerSold;
  const slotsLeft = isRacer ? racerSlotsLeft : spectatorSlotsLeft;
  const slotsUrgent = slotsLeft <= 10;

  const racerFormValid =
    !isRacer ||
    (racerDetails.carMake &&
      racerDetails.carModel &&
      racerDetails.carYear &&
      racerDetails.driverLicense &&
      racerDetails.classCategory);

  const canBuy = ticketType && slotsLeft > 0 && racerFormValid;

  const handleQty = (delta) => {
    setQuantity((q) => Math.max(1, Math.min(q + delta, isRacer ? 1 : 10, slotsLeft)));
    // Racer entries are capped at 1 per registration since each needs its own car/driver details
  };

  const handleRacerField = (field) => (e) =>
    setRacerDetails((prev) => ({ ...prev, [field]: e.target.value }));

  const handleBuy = () => {
    navigate('/checkout', {
      state: {
        eventId: event.id,
        eventName: event.name,
        ticketType,
        quantity,
        unitPrice,
        total,
        racerDetails: isRacer ? racerDetails : null,
      },
    });
  };

  return (
    <Page>
      <BackLink onClick={() => navigate('/')}>&larr; Back to events</BackLink>

      <HeaderBlock>
        <StatusRow>
          <StatusPill $status={event.status}>
            {event.status === 'sold'
              ? 'Sold Out'
              : event.status === 'limited'
              ? 'Limited Availability'
              : 'Open for Registration'}
          </StatusPill>
        </StatusRow>

        <EventTitle>{event.name}</EventTitle>

        <MetaRow>
          <MetaItem>
            <MetaLabel>Date</MetaLabel>
            <MetaValue>{event.dateLabel}</MetaValue>
          </MetaItem>
          <MetaItem>
            <MetaLabel>Time</MetaLabel>
            <MetaValue>{event.timeLabel}</MetaValue>
          </MetaItem>
          <MetaItem>
            <MetaLabel>Venue</MetaLabel>
            <MetaValue>{event.venue}</MetaValue>
          </MetaItem>
        </MetaRow>
      </HeaderBlock>

      <ContentGrid>
        {/* ── Main column ── */}
        <MainCol>
          <SectionTitle>About this event</SectionTitle>
          <Description>{event.description}</Description>

          <SectionTitle>Location</SectionTitle>
          <MapWrap>
            <MapFrame>
              {/*
                ── GOOGLE MAPS INTEGRATION ──────────────────────────
                Swap this placeholder for @react-google-maps/api or
                the Maps Embed API once you have a Google Maps API key:

                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${event.lat},${event.lng}`}
                  width="100%" height="100%" style={{ border: 0 }}
                  loading="lazy"
                />
              */}
              <MapPlaceholder>
                <PinDot />
                <MapCoords>
                  {event.lat.toFixed(4)}, {event.lng.toFixed(4)}
                </MapCoords>
              </MapPlaceholder>
            </MapFrame>
            <DirectionsLink
              href={`https://www.google.com/maps/search/?api=1&query=${event.lat},${event.lng}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions &rarr;
            </DirectionsLink>
          </MapWrap>
        </MainCol>

        {/* ── Sidebar ── */}
        <SideCol>
          <TicketBox>
            <SectionTitle style={{ marginBottom: 16 }}>Get tickets</SectionTitle>

            <TicketTypeRow>
              <TicketTypeBtn
                $active={ticketType === 'spectator'}
                $disabled={!event.hasSpectator}
                onClick={() => {
                  setTicketType('spectator');
                  setQuantity(1);
                }}
              >
                Spectator
              </TicketTypeBtn>
              <TicketTypeBtn
                $active={ticketType === 'racer'}
                $disabled={!event.hasRacer}
                onClick={() => {
                  setTicketType('racer');
                  setQuantity(1);
                }}
              >
                Racer
              </TicketTypeBtn>
            </TicketTypeRow>

            <PriceDisplay>
              <PriceAmount>
                {unitPrice === 0 ? 'Free' : `KES ${unitPrice.toLocaleString()}`}
              </PriceAmount>
              {unitPrice > 0 && <PriceUnit>/ ticket</PriceUnit>}
            </PriceDisplay>

            <SlotsRemaining $urgent={slotsUrgent}>
              {slotsLeft > 0
                ? `${slotsLeft} ${isRacer ? 'racer slots' : 'spots'} remaining`
                : 'Sold out'}
            </SlotsRemaining>

            {!isRacer && (
              <QtyRow>
                <QtyLabel>Quantity</QtyLabel>
                <QtyControls>
                  <QtyBtn onClick={() => handleQty(-1)} disabled={quantity <= 1}>
                    &minus;
                  </QtyBtn>
                  <QtyValue>{quantity}</QtyValue>
                  <QtyBtn
                    onClick={() => handleQty(1)}
                    disabled={quantity >= Math.min(10, slotsLeft)}
                  >
                    +
                  </QtyBtn>
                </QtyControls>
              </QtyRow>
            )}

            {isRacer && (
              <RacerForm>
                <FormHint>Racer entries require driver &amp; vehicle details</FormHint>

                <div>
                  <FormLabel>Car make &amp; model</FormLabel>
                  <FormRow $cols="1fr 1fr">
                    <FormInput
                      placeholder="e.g. Toyota"
                      value={racerDetails.carMake}
                      onChange={handleRacerField('carMake')}
                    />
                    <FormInput
                      placeholder="e.g. Supra"
                      value={racerDetails.carModel}
                      onChange={handleRacerField('carModel')}
                    />
                  </FormRow>
                </div>

                <div>
                  <FormLabel>Year</FormLabel>
                  <FormInput
                    placeholder="e.g. 2019"
                    value={racerDetails.carYear}
                    onChange={handleRacerField('carYear')}
                  />
                </div>

                <div>
                  <FormLabel>Driver's license number</FormLabel>
                  <FormInput
                    placeholder="License number"
                    value={racerDetails.driverLicense}
                    onChange={handleRacerField('driverLicense')}
                  />
                </div>

                <div>
                  <FormLabel>Class category</FormLabel>
                  <FormInput
                    placeholder="e.g. Open Class, RWD Street"
                    value={racerDetails.classCategory}
                    onChange={handleRacerField('classCategory')}
                  />
                </div>
              </RacerForm>
            )}

            <TotalRow style={{ marginTop: isRacer ? 20 : 0 }}>
              <TotalLabel>Total</TotalLabel>
              <TotalValue>
                {total === 0 ? 'Free' : `KES ${total.toLocaleString()}`}
              </TotalValue>
            </TotalRow>

            <BuyButton disabled={!canBuy} onClick={handleBuy}>
              {slotsLeft <= 0 ? 'Sold Out' : 'Continue to Checkout'}
            </BuyButton>
          </TicketBox>
        </SideCol>
      </ContentGrid>
    </Page>
  );
};

export default EventDetailPage;