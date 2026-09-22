import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FaPaw, FaHeart, FaTruck } from 'react-icons/fa';
import './Hero.css';

function Hero() {
  return (
    <section className="hero" id="hero-section">
      {/* Background decoration */}
      <div className="hero__bg-gradient"></div>
      <div className="hero__bg-orb hero__bg-orb--1"></div>
      <div className="hero__bg-orb hero__bg-orb--2"></div>
      <div className="hero__bg-orb hero__bg-orb--3"></div>

      <div className="hero__container container">
        <div className="hero__content">
          <div className="hero__badge">
            <FaPaw />
            <span>La mejor tienda de mascotas online</span>
          </div>

          <h1 className="hero__title">
            Todo lo que tu
            <span className="hero__title-highlight"> mascota </span>
            merece está aquí
          </h1>

          <p className="hero__description">
            Descubre productos premium para perros, gatos, aves y peces. 
            Calidad garantizada y envío express a todo el país.
          </p>

          <div className="hero__actions">
            <Link to="/shop" className="btn btn-primary" id="hero-cta-shop">
              Explorar Tienda
              <FiArrowRight />
            </Link>
            <Link to="/about" className="btn btn-secondary" id="hero-cta-about">
              Conoce más
            </Link>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-icon">
                <FaPaw />
              </div>
              <div>
                <span className="hero__stat-number">500+</span>
                <span className="hero__stat-label">Productos</span>
              </div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-icon hero__stat-icon--pink">
                <FaHeart />
              </div>
              <div>
                <span className="hero__stat-number">10K+</span>
                <span className="hero__stat-label">Clientes felices</span>
              </div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-icon hero__stat-icon--teal">
                <FaTruck />
              </div>
              <div>
                <span className="hero__stat-number">24h</span>
                <span className="hero__stat-label">Envío express</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=700&fit=crop"
              alt="Perro feliz"
              className="hero__image"
            />
            <div className="hero__image-glow"></div>
          </div>

          {/* Floating cards */}
          <div className="hero__float-card hero__float-card--1">
            <span className="hero__float-emoji">🐕</span>
            <span>Premium Food</span>
          </div>
          <div className="hero__float-card hero__float-card--2">
            <span className="hero__float-emoji">⭐</span>
            <span>4.9 Rating</span>
          </div>
          <div className="hero__float-card hero__float-card--3">
            <span className="hero__float-emoji">🚚</span>
            <span>Envío Gratis</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
