import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products, categories, testimonials } from '../data/products';
import './Home.css';

function Home() {
  const featured = products.slice(0, 8);

  return (
    <>
      <Hero />

      <section className="section-pad categories" id="categories">
        <div className="container">
          <div className="section-heading section-heading--center">
            <div>
              <h2 className="section-heading__title">
                Explora por <span className="gradient-text">categoría</span>
              </h2>
              <p className="section-heading__subtitle">
                Todo lo que tu mascota necesita en un solo lugar
              </p>
            </div>
          </div>
          <div className="categories__grid">
            {categories.map((category) => (
              <Link
                to="/shop"
                key={category.id}
                className="category-card"
                style={{ '--category-color': category.color }}
              >
                <span className="category-card__emoji">{category.emoji}</span>
                <h3 className="category-card__name">{category.name}</h3>
                <p className="category-card__description">
                  {category.description}
                </p>
                <span className="category-card__cta">Ver productos</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad featured" id="featured">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2 className="section-heading__title">
                Productos <span className="gradient-text">destacados</span>
              </h2>
              <p className="section-heading__subtitle">
                Lo más vendido y mejor valorado por nuestros clientes
              </p>
            </div>
            <Link to="/shop" className="section-heading__link">
              Ver todos <FiArrowRight />
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad testimonials" id="testimonials">
        <div className="container">
          <div className="section-heading section-heading--center">
            <div>
              <h2 className="section-heading__title">
                Lo que dicen <span className="gradient-text">nuestros clientes</span>
              </h2>
              <p className="section-heading__subtitle">
                Más de 10,000 mascotas felices y sus familias nos respaldan
              </p>
            </div>
          </div>
          <div className="testimonials__grid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.id} className="testimonial-card">
                <div className="testimonial-card__stars">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p className="testimonial-card__text">{testimonial.text}</p>
                <div className="testimonial-card__author">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="testimonial-card__avatar"
                    loading="lazy"
                  />
                  <div>
                    <strong className="testimonial-card__name">
                      {testimonial.name}
                    </strong>
                    <span className="testimonial-card__pet">
                      {testimonial.pet}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="cta">
        <div className="container cta__container">
          <h2 className="cta__title">
            ¡Mima a tu mascota con lo mejor!
          </h2>
          <p className="cta__subtitle">
            Envío express, pago seguro y atención personalizada. 24h.
          </p>
          <div className="cta__checks">
            <span>
              <FaCheckCircle /> Compra 100% segura
            </span>
            <span>
              <FaCheckCircle /> Envío express
            </span>
            <span>
              <FaCheckCircle /> Devoluciones fáciles
            </span>
          </div>
          <Link to="/shop" className="btn btn-primary cta__button">
            Comprar ahora <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;