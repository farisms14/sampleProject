import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  LayoutDashboard, 
  Map, 
  Compass, 
  Wallet, 
  Package, 
  ShieldCheck
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const roles = user?.roles || [];

  const links = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  ];

  if (roles.includes('ROLE_TRAVELER')) {
    links.push(
      { to: '/trips', icon: <Map size={20} />, label: 'Trip Planner' },
      { to: '/expenses', icon: <Wallet size={20} />, label: 'Expenses' }
    );
  }

  if (roles.includes('ROLE_GUIDE')) {
    links.push({ to: '/guide', icon: <Package size={20} />, label: 'Guide Dashboard' });
  }

  if (roles.includes('ROLE_GUIDE') || roles.includes('ROLE_TRAVELER')) {
    links.push({ to: '/packages', icon: <Package size={20} />, label: 'Packages' });
  }

  if (roles.includes('ROLE_ADMIN')) {
    links.push({ to: '/admin', icon: <ShieldCheck size={20} />, label: 'Admin Panel' });
  }

  return (
    <aside className="sidebar">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
              background: isActive ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.2s'
            })}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
