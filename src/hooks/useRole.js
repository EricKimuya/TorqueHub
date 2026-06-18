// returns user role from Auth0 token --> 
import { useAuth0 } from '@auth0/auth0-react';

/**
 * Reads the user's role (spectator | racer | admin) from the Auth0
 * user object.
 *
 * ── BACKEND COORDINATION NEEDED ────────────────────────────────────
 * Auth0 doesn't include custom fields like "role" by default. Your
 * friend needs to add it as a custom claim via an Auth0 Action/Rule,
 * namespaced to avoid collisions, e.g.:
 *
 *   https://torquehub.app/role  ->  "admin" | "racer" | "spectator"
 *
 * Until that's set up, this hook falls back to reading a plain
 * `role` field (useful for local testing with mocked user objects)
 * and defaults to 'spectator' if nothing is found.
 *
 * Usage:
 *   const role = useRole();              // 'admin' | 'racer' | 'spectator'
 *   const isAdmin = useRole('admin');     // boolean
 */
const ROLE_CLAIM = 'https://torquehub.app/role';

const useRole = (checkRole) => {
  const { user } = useAuth0();

  const role = user?.[ROLE_CLAIM] || user?.role || 'spectator';

  if (checkRole) {
    return role === checkRole;
  }

  return role;
};

export default useRole;                 