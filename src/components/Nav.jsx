import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/tickets">My Tickets</Link>
    </nav>
  );
}

export default Navbar;