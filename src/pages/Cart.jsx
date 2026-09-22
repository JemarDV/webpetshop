import {
  FiShoppingCart,
  FiTrash2,
  FiMinus,
  FiPlus,
  FiArrowRight,
  FiLock,
  FiTruck,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const {
    items,
    subtotal,
    shipping,
    total,
    freeShippingThreshold,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const remaining = freeShippingThreshold - subtotal;

  if (items.length === 0) {
    return (
      <div className="cart">
        <section className="page-hero">
          <div className="container page-hero__container">
            <span className="page-hero__badge">Carrito</span>
            <h1 className="page-hero__title">
              Tu <span className="gradient-text">carrito</span>
            </h1>
            <p className="page-hero__subtitle">
              Revisa tus productos antes de finalizar tu compra.
            </p>
          </div>
        </section>

        <section className="container cart__empty">
          <FiShoppingCart className="cart__empty-icon" />
          <h2 className="cart__empty-title">Tu carrito está vacío</h2>
          <p className="cart__empty-text">
            Explora nuestra tienda y encuentra lo mejor para tu mascota.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Ir a la tienda <FiArrowRight />
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="cart">
      <section className="page-hero">
        <div className="container page-hero__container">
          <span className="page-hero__badge">Carrito</span>
          <h1 className="page-hero__title">
            Tu <span className="gradient-text">carrito</span>
          </h1>
          <p className="page-hero__subtitle">
            {items.length} producto{items.length === 1 ? '' : 's'} en tu compra
          </p>
        </div>
      </section>

      <section className="container cart__body">
        <div className="cart__items">
          {items.map((item) => (
            <article key={item.id} className="cart-item">
              <Link to="/shop" className="cart-item__image-link">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item__image"
                  loading="lazy"
                />
              </Link>

              <div className="cart-item__content">
                <h3 className="cart-item__name">{item.name}</h3>
                <span className="cart-item__price">${item.price.toFixed(2)}</span>

                <div className="cart-item__controls">
                  <div className="cart-item__qty">
                    <button
                      type="button"
                      className="cart-item__qty-btn"
                      aria-label={`Reducir cantidad de ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.qty - 1)}
                    >
                      <FiMinus />
                    </button>
                    <span className="cart-item__qty-value">{item.qty}</span>
                    <button
                      type="button"
                      className="cart-item__qty-btn"
                      aria-label={`Aumentar cantidad de ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.qty + 1)}
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FiTrash2 /> Eliminar
                  </button>
                </div>
              </div>

              <div className="cart-item__total">
                ${(item.price * item.qty).toFixed(2)}
              </div>
            </article>
          ))}

          <button
            type="button"
            className="cart__clear"
            onClick={clearCart}
          >
            Vaciar carrito
          </button>
        </div>

        <aside className="cart-summary">
          <h3 className="cart-summary__title">Resumen</h3>

          {shipping === 0 ? (
            <p className="cart-summary__free">
              <FiTruck /> ¡Tienes envío gratis!
            </p>
          ) : (
            <p className="cart-summary__free">
              <FiTruck /> Te faltan ${remaining.toFixed(2)} para envío gratis
            </p>
          )}

          <div className="cart-summary__row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary__row">
            <span>Envío</span>
            <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="cart-summary__row cart-summary__row--total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="btn btn-primary cart-summary__checkout"
          >
            <FiLock /> Finalizar compra
          </Link>
          <Link to="/shop" className="cart-summary__continue">
            Seguir comprando
          </Link>
        </aside>
      </section>
    </div>
  );
}

export default Cart;