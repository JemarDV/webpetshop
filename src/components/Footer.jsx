import { Link } from 'react-router-dom';
import { FaPaw, FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const shopLinks = [
    { path: '/shop', label: 'Perros' },
    { path: '/shop', label: 'Gatos' },
    { path: '/shop', label: 'Aves' },
    { path: '/shop', label: 'Peces' },
  ];

  const companyLinks = [
    { path: '/about', label: 'Nosotros' },
    { path: '/about', label: 'Nuestra misión' },
    { path: '/contact', label: 'Contacto' },
    { path: '/shop', label: 'Ofertas' },
  ];

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <FaPaw className="footer__logo-icon" />
            <span>
              Web<span className="gradient-text">PetShop</span>
            </span>
          </Link>
          <p className="footer__description">
            Tu tienda de mascotas online. Productos premium para perros,
            gatos, aves y peces con envío express a todo el país.
          </p>
          <div className="footer__social">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__title">Tienda</h4>
          <ul className="footer__links">
            {shopLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__title">Compañía</h4>
          <ul className="footer__links">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__title">Contacto</h4>
          <ul className="footer__contact">
            <li>
              <FaMapMarkerAlt />
              <span>Av. Las Mascotas 123, Lima</span>
            </li>
            <li>
              <FaPhoneAlt />
              <span>+51 987 654 321</span>
            </li>
            <li>
              <FaEnvelope />
              <span>hola@webpetshop.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} WebPetShop. Todos los derechos reservados.</p>
          <p className="footer__bottom-heart">Hecho con 🐾 para tus mascotas</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;