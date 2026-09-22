import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Navbar.css';

function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/shop', label: 'Tienda' },
    { path: '/about', label: 'Nosotros' },
    { path: '/contact', label: 'Contacto' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar__container container">
        <Link to="/" className="navbar__logo" id="navbar-logo">
          <FaPaw className="navbar__logo-icon" />
          <span className="navbar__logo-text">
            Web<span className="gradient-text">PetShop</span>
          </span>
        </Link>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`} id="navbar-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <Link
            to="/wishlist"
            className="navbar__cart"
            aria-label="Ver favoritos"
          >
            <FiHeart />
            {wishlistCount > 0 && (
              <span className="navbar__cart-badge navbar__cart-badge--heart">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="navbar__cart" id="navbar-cart">
            <FiShoppingCart />
            {cartCount > 0 && (
              <span className="navbar__cart-badge">{cartCount}</span>
            )}
          </Link>
          <button
            className="navbar__menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="navbar-menu-toggle"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
