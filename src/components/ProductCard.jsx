import { Link } from 'react-router-dom';
import { FiStar, FiHeart, FiShoppingCart } from 'react-icons/fi';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <article className="product-card">
      {product.badge && (
        <span className="product-card__badge">{product.badge}</span>
      )}
      <button
        className="product-card__wishlist"
        aria-label={`Agregar ${product.name} a favoritos`}
      >
        <FiHeart />
      </button>
      <Link to="/shop" className="product-card__image-link">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
      </Link>
      <div className="product-card__content">
        <div className="product-card__rating">
          <FiStar className="product-card__star" />
          <span className="product-card__rating-value">{product.rating}</span>
          <span className="product-card__rating-count">
            ({product.reviews})
          </span>
        </div>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__footer">
          <div className="product-card__price">
            <span className="product-card__price-current">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="product-card__price-old">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            className="product-card__add"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;