import React from 'react';
import Link from 'gatsby-link';

const Navbar = () => (
  <nav>
    <div>
      <div>
        <Link to="/">
          <h3>Swapnil</h3>
        </Link>
      </div>
      <div>
        <Link to="/">About</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
