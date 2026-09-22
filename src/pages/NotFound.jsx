import { Link } from 'react-router-dom';
import { FiHome, FiArrowRight } from 'react-icons/fi';
import './NotFound.css';

function NotFound() {
  return (
    <div className="nf">
      <section className="page-hero nf__hero">
        <div className="container page-hero__container">
          <span className="page-hero__badge">Error 404</span>
          <h1 className="nf__code gradient-text">404</h1>
          <h2 className="nf__title">¡Ups! Página no encontrada</h2>
          <p className="page-hero__subtitle">
            La página que buscas no existe o fue movida. Pero no te preocupes,
            tus mascotas todavía pueden encontrar todo lo que necesitan.
          </p>
        </div>
      </section>

      <section className="container nf__actions">
        <Link to="/" className="btn btn-primary">
          <FiHome /> Volver al inicio
        </Link>
        <Link to="/shop" className="btn btn-secondary">
          Ir a la tienda <FiArrowRight />
        </Link>
      </section>
    </div>
  );
}

export default NotFound;