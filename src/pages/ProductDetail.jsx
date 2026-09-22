import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FiStar,
  FiHeart,
  FiShoppingCart,
  FiCheck,
  FiMinus,
  FiPlus,
  FiArrowLeft,
  FiTruck,
  FiPackage,
  FiShield,
} from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = useMemo(
    () => products.find((p) => p.id === Number(id)),
    [id],
  );

  const category = product
    ? categories.find((c) => c.id === product.category)
    : null;

  const related = useMemo(
    () =>
      product
        ? products.filter(
            (p) => p.category === product.category && p.id !== product.id,
          )
        : [],
    [product],
  );

  if (!product) {
    return (
      <div className="pd">
        <section className="page-hero">
          <div className="container page-hero__container">
            <span className="page-hero__badge">Detalle</span>
            <h1 className="page-hero__title">
              Producto <span className="gradient-text">no encontrado</span>
            </h1>
          </div>
        </section>
        <section className="container pd__not-found">
          <p>El producto que buscas no existe o fue removido.</p>
          <Link to="/shop" className="btn btn-primary">
            Volver a la tienda
          </Link>
        </section>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="pd">
      <section className="page-hero page-hero--compact">
        <div className="container page-hero__container">
          <nav className="pd__breadcrumb">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <Link to="/shop">Tienda</Link>
            <span>/</span>
            <span className="pd__breadcrumb--current">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="container pd__main">
        <div className="pd__gallery">
          <Link to="/shop" className="pd__back" aria-label="Volver a la tienda">
            <FiArrowLeft />
          </Link>
          {product.badge && (
            <span className="product-card__badge pd__badge">{product.badge}</span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="pd__image"
          />
        </div>

        <div className="pd__info">
          {category && (
            <span className="pd__category">
              {category.emoji} {category.name}
            </span>
          )}

          <h1 className="pd__name">{product.name}</h1>

          <div className="pd__rating">
            <FiStar className="product-card__star" />
            <span>{product.rating}</span>
            <span className="pd__rating-count">
              ({product.reviews} reseñas)
            </span>
          </div>

          <p className="pd__description">{product.description}</p>

          <div className="pd__price-box">
            <span className="pd__price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="pd__price-old">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="pd__price-save">
                  Ahorras ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          <div className="pd__quantity">
            <label className="pd__qty-label">Cantidad</label>
            <div className="cart-item__qty">
              <button
                type="button"
                className="cart-item__qty-btn"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <FiMinus />
              </button>
              <span className="cart-item__qty-value">{qty}</span>
              <button
                type="button"
                className="cart-item__qty-btn"
                onClick={() => setQty((q) => q + 1)}
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="pd__actions">
            <button
              type="button"
              className={`btn pd__add-btn ${added ? 'pd__add-btn--added' : ''}`}
              onClick={handleAdd}
            >
              {added ? (
                <>
                  <FiCheck /> Agregado
                </>
              ) : (
                <>
                  <FiShoppingCart /> Agregar al carrito
                </>
              )}
            </button>
            <button
              type="button"
              className={`pd__wishlist ${isInWishlist(product.id) ? 'pd__wishlist--active' : ''}`}
              aria-label={
                isInWishlist(product.id)
                  ? `Quitar ${product.name} de favoritos`
                  : `Agregar ${product.name} a favoritos`
              }
              onClick={() => toggleWishlist(product)}
            >
              {isInWishlist(product.id) ? <FaHeart /> : <FiHeart />}
            </button>
          </div>

          <ul className="pd__features">
            <li><FiTruck /> Envío express 24h</li>
            <li><FiPackage /> Garantía de devolución</li>
            <li><FiShield /> Compra 100% segura</li>
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-pad pd__related">
          <div className="container">
            <div className="section-heading">
              <div>
                <h2 className="section-heading__title">
                  También te puede <span className="gradient-text">gustar</span>
                </h2>
                <p className="section-heading__subtitle">
                  Productos de la misma categoría
                </p>
              </div>
              <Link to="/shop" className="section-heading__link">
                Ver todos <FiArrowLeft style={{ transform: 'rotate(180deg)' }} />
              </Link>
            </div>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;