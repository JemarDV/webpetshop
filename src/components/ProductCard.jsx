import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiHeart, FiShoppingCart, FiCheck } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const favorite = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="product-card">
      {product.badge && (
        <span className="product-card__badge">{product.badge}</span>
      )}
      <button
        className={`product-card__wishlist ${favorite ? 'product-card__wishlist--active' : ''}`}
        aria-label={
          favorite
            ? `Quitar ${product.name} de favoritos`
            : `Agregar ${product.name} a favoritos`
        }
        onClick={() => toggleWishlist(product)}
      >
        {favorite ? <FaHeart /> : <FiHeart />}
      </button>
      <Link to={`/product/${product.id}`} className="product-card__image-link">
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
        <h3 className="product-card__name">
          <Link to={`/product/${product.id}`} className="product-card__name-link">
            {product.name}
          </Link>
        </h3>
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
            className={`product-card__add ${added ? 'product-card__add--added' : ''}`}
            aria-label={`Agregar ${product.name} al carrito`}
            onClick={handleAdd}
          >
            {added ? <FiCheck /> : <FiShoppingCart />}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;