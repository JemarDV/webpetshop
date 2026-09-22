import { Link } from 'react-router-dom';
import { FiHeart, FiArrowRight, FiTrash2 } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import './Wishlist.css';

function Wishlist() {
  const { items, clearWishlist } = useWishlist();

  return (
    <div className="wishlist">
      <section className="page-hero">
        <div className="container page-hero__container">
          <span className="page-hero__badge">Favoritos</span>
          <h1 className="page-hero__title">
            Tus <span className="gradient-text">favoritos</span>
          </h1>
          <p className="page-hero__subtitle">
            Guarda los productos que te encantan y cómpralos cuando quieras.
          </p>
        </div>
      </section>

      {items.length === 0 ? (
        <section className="container wishlist__empty">
          <FiHeart className="wishlist__empty-icon" />
          <h2>Aún no tienes favoritos</h2>
          <p>
            Haz clic en el corazón de cualquier producto para guardarlo aquí.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Explorar tienda <FiArrowRight />
          </Link>
        </section>
      ) : (
        <section className="container wishlist__body">
          <div className="wishlist__toolbar">
            <p>
              {items.length} producto{items.length === 1 ? '' : 's'} guardado
              {items.length === 1 ? '' : 's'}
            </p>
            <button
              type="button"
              className="wishlist__clear"
              onClick={clearWishlist}
            >
              <FiTrash2 /> Vaciar favoritos
            </button>
          </div>
          <div className="product-grid">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Wishlist;