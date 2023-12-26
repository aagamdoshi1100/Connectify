import { NavLink } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div>
      <p>Page not found.</p>
      <NavLink to="/">Go to Home</NavLink>
    </div>
  );
}
