import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import './Shop.css';

function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="shop">
      <section className="page-hero">
        <div className="container page-hero__container">
          <span className="page-hero__badge">Tienda</span>
          <h1 className="page-hero__title">
            Nuestros <span className="gradient-text">Productos</span>
          </h1>
          <p className="page-hero__subtitle">
            Calidad premium para perros, gatos, aves y peces con los mejores
            precios del mercado.
          </p>
        </div>
      </section>

      <section className="container shop__body">
        <div className="shop__filters" role="tablist" aria-label="Filtrar por categoría">
          <button
            type="button"
            className={`shop__filter ${activeCategory === 'all' ? 'shop__filter--active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            🛍️ Todos
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              className={`shop__filter ${activeCategory === category.id ? 'shop__filter--active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.emoji} {category.name}
            </button>
          ))}
        </div>

        <div className="shop__info">
          <p>
            {filtered.length} producto{filtered.length === 1 ? '' : 's'}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">No hay productos en esta categoría.</div>
        )}
      </section>
    </div>
  );
}

export default Shop;