import { NavLink } from 'react-router-dom';

interface Tab {
  path: string;
  label: string;
}

const tabs: Tab[] = [
  { path: '/', label: 'Home' },
  { path: '/users', label: 'Users' },
  { path: '/about', label: 'About' },
  { path: '/practice', label: 'Practice' },
  { path: '/expenses', label: 'Expenses' }
];

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-tabs">
        {tabs.map((tab) => (
          <li key={tab.path}>
            <NavLink
              to={tab.path}
              end={tab.path === '/'}
              className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
            >
              {tab.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
