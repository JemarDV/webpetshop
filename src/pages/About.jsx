import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FaPaw, FaHeart, FaTruck, FaShieldAlt, FaLeaf } from 'react-icons/fa';
import './About.css';

const values = [
  {
    icon: FaHeart,
    title: 'Amor por las mascotas',
    description:
      'Cada producto que vendemos está pensado para el bienestar de tu compañero de vida.',
  },
  {
    icon: FaShieldAlt,
    title: 'Calidad garantizada',
    description:
      'Trabajamos con marcas premium y probamos cada producto antes de ofrecerlo.',
  },
  {
    icon: FaLeaf,
    title: 'Compromiso ético',
    description:
      'Productos libres de crueldad animal y proveedores responsables.',
  },
];

const stats = [
  { value: '500+', label: 'Productos disponibles' },
  { value: '10K+', label: 'Clientes felices' },
  { value: '24h', label: 'Envío express' },
  { value: '4.9', label: 'Valoración promedio' },
];

function About() {
  return (
    <div className="about">
      <section className="page-hero">
        <div className="container page-hero__container">
          <span className="page-hero__badge">Nosotros</span>
          <h1 className="page-hero__title">
            Una tienda creada para{' '}
            <span className="gradient-text">ellos</span>
          </h1>
          <p className="page-hero__subtitle">
            Somos un equipo de amantes de los animales comprometido con ofrecer
            lo mejor a tu mascota.
          </p>
        </div>
      </section>

      <section className="section-pad about__story">
        <div className="container about__story-grid">
          <div className="about__story-content">
            <span className="about__story-badge">
              <FaPaw /> Nuestra historia
            </span>
            <h2 className="about__story-title">
              Más que una tienda, una <span className="gradient-text">familia</span>
            </h2>
            <p>
              WebPetShop nació en 2020 con una idea simple: que cada mascota
              tuviera acceso a productos de la mejor calidad sin importar dónde
              viva. Hoy somos más de 10,000 clientes felices en todo el país.
            </p>
            <p>
              Cada pedido que enviamos lleva el cariño de un equipo que entiende
              que tu mascota es parte de tu familia.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Explorar tienda <FiArrowRight />
            </Link>
          </div>
          <div className="about__story-visual">
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=700&fit=crop"
              alt="Mascota feliz en casa"
              loading="lazy"
            />
            <div className="about__story-float">
              <FaTruck />
              <div>
                <strong>Envío gratuito</strong>
                <span>en pedidos +$50</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad about__values">
        <div className="container">
          <div className="section-heading section-heading--center">
            <div>
              <h2 className="section-heading__title">
                Nuestros <span className="gradient-text">valores</span>
              </h2>
              <p className="section-heading__subtitle">
                Lo que nos mueve cada día a mejorar
              </p>
            </div>
          </div>
          <div className="about__values-grid">
            {values.map((value) => (
              <div key={value.title} className="about__value-card">
                <div className="about__value-icon">
                  <value.icon />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad about__stats">
        <div className="container about__stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="about__stat">
              <span className="about__stat-value gradient-text">{stat.value}</span>
              <span className="about__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;