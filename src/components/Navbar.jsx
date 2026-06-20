import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 40px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  z-index: 100;
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 28px;
  align-items: center;
`;

const NavLink = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserPill = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;
`;

const OnlineDot = styled.div`
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
`;

const CTAButton = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  padding: 8px 20px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: background 0.2s;

  &:hover {
    background: #c93416;
  }
`;

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const navigate = useNavigate();

  return (
    <Nav>
      <Logo to="/">Torque<span>Hub</span></Logo>

      <NavLinks>
        <NavLink to="/">Events</NavLink>
        {isAuthenticated && <NavLink to="/tickets">My Tickets</NavLink>}
        {/* Add a /results route + NavLink once that page exists */}
      </NavLinks>

      <NavRight>
        {isAuthenticated ? (
          <>
            <UserPill onClick={() => navigate('/tickets')}>
              <OnlineDot />
              <span>{user?.name?.split(' ')[0] ?? 'Account'}</span>
            </UserPill>
            <CTAButton onClick={() => logout({ returnTo: window.location.origin })}>
              Sign Out
            </CTAButton>
          </>
        ) : (
          <CTAButton onClick={() => loginWithRedirect()}>
            Sign In / Register
          </CTAButton>
        )}
      </NavRight>
    </Nav>
  );
};

export default Navbar;