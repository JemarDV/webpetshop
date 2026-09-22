import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiShoppingCart,
  FiTruck,
  FiZap,
  FiCreditCard,
  FiLock,
  FiCheckCircle,
  FiArrowRight,
  FiMapPin,
} from 'react-icons/fi';
import { FaPaypal, FaPiggyBank } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const EXPRESS_COST = 14.99;

const paymentMethods = [
  { id: 'card', label: 'Tarjeta', icon: FiCreditCard },
  { id: 'paypal', label: 'PayPal', icon: FaPaypal },
  { id: 'yape', label: 'Yape', icon: FaPiggyBank },
];

function Checkout() {
  const { items, subtotal, shipping, freeShippingThreshold, clearCart } =
    useCart();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [express, setExpress] = useState(false);
  const [payment, setPayment] = useState('card');
  const [order, setOrder] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const deliveryCost = express ? EXPRESS_COST : shipping;
  const grandTotal = subtotal + deliveryCost;

  if (order) {
    return (
      <div className="checkout">
        <section className="page-hero">
          <div className="container page-hero__container">
            <span className="page-hero__badge">Checkout</span>
            <h1 className="page-hero__title">
              ¡Pedido <span className="gradient-text">confirmado</span>!
            </h1>
          </div>
        </section>

        <section className="container checkout__success">
          <FiCheckCircle className="checkout__success-icon" />
          <h2>Gracias por tu compra, {form.name.split(' ')[0] || 'amigo'}!</h2>
          <p className="checkout__success-order">
            Número de pedido: <strong>{order}</strong>
          </p>
          <p>
            Hemos enviado la confirmación a <strong>{form.email}</strong>.
            Tu pedido llegará en {express ? '24h' : '2 a 4 días hábiles'}.
          </p>
          <div className="checkout__success-actions">
            <Link to="/shop" className="btn btn-primary">
              Seguir comprando <FiArrowRight />
            </Link>
            <Link to="/" className="btn btn-secondary">
              Volver al inicio
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout">
        <section className="page-hero">
          <div className="container page-hero__container">
            <span className="page-hero__badge">Checkout</span>
            <h1 className="page-hero__title">
              Finalizar <span className="gradient-text">compra</span>
            </h1>
          </div>
        </section>

        <section className="container checkout__empty">
          <FiShoppingCart className="checkout__empty-icon" />
          <h2>No tienes productos en el carrito</h2>
          <p>Agrega productos antes de finalizar la compra.</p>
          <Link to="/shop" className="btn btn-primary">
            Ir a la tienda <FiArrowRight />
          </Link>
        </section>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrder(`WPS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    clearCart();
  };

  return (
    <div className="checkout">
      <section className="page-hero">
        <div className="container page-hero__container">
          <span className="page-hero__badge">Checkout</span>
          <h1 className="page-hero__title">
            Finalizar <span className="gradient-text">compra</span>
          </h1>
          <p className="page-hero__subtitle">
            Completa tus datos y elige el envío y método de pago.
          </p>
        </div>
      </section>

      <section className="container checkout__body">
        <form className="checkout__form" onSubmit={handleSubmit}>
          <div className="checkout__section">
            <h3 className="checkout__section-title">
              <FiMapPin /> Datos de contacto
            </h3>
            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="name">Nombre completo</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Juan Pérez"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="contact__field">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tucorreo@ejemplo.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="contact__field">
                <label htmlFor="phone">Teléfono</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+51 999 999 999"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="contact__field">
                <label htmlFor="address">Dirección</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  placeholder="Av. Las Mascotas 123"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
              <div className="contact__field">
                <label htmlFor="city">Ciudad</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  placeholder="Lima"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>
              <div className="contact__field">
                <label htmlFor="postalCode">Código postal</label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  placeholder="15001"
                  value={form.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="checkout__section">
            <h3 className="checkout__section-title">
              <FiTruck /> Método de envío
            </h3>
            <div className="checkout__shipping">
              <button
                type="button"
                className={`checkout__shipping-option ${!express ? 'checkout__shipping-option--active' : ''}`}
                onClick={() => setExpress(false)}
              >
                <span className="checkout__shipping-icon">
                  <FiTruck />
                </span>
                <span className="checkout__shipping-info">
                  <strong>Estándar</strong>
                  <small>
                    {shipping === 0
                      ? 'Envío gratis (2 a 4 días)'
                      : `$${shipping.toFixed(2)} (2 a 4 días)`}
                  </small>
                </span>
              </button>
              <button
                type="button"
                className={`checkout__shipping-option ${express ? 'checkout__shipping-option--active' : ''}`}
                onClick={() => setExpress(true)}
              >
                <span className="checkout__shipping-icon">
                  <FiZap />
                </span>
                <span className="checkout__shipping-info">
                  <strong>Express</strong>
                  <small>${EXPRESS_COST.toFixed(2)} (entrega en 24h)</small>
                </span>
              </button>
            </div>
          </div>

          <div className="checkout__section">
            <h3 className="checkout__section-title">
              <FiCreditCard /> Método de pago
            </h3>
            <div className="checkout__payment">
              {paymentMethods.map((method) => (
                <button
                  type="button"
                  key={method.id}
                  className={`checkout__payment-option ${payment === method.id ? 'checkout__payment-option--active' : ''}`}
                  onClick={() => setPayment(method.id)}
                >
                  <method.icon className="checkout__payment-icon" />
                  <span>{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary checkout__submit">
            <FiLock /> Pagar ${grandTotal.toFixed(2)}
          </button>
        </form>

        <aside className="checkout__summary">
          <h3 className="checkout__summary-title">Tu pedido</h3>
          <ul className="checkout__summary-items">
            {items.map((item) => (
              <li key={item.id} className="checkout__summary-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="checkout__summary-img"
                  loading="lazy"
                />
                <div className="checkout__summary-info">
                  <span className="checkout__summary-name">{item.name}</span>
                  <span className="checkout__summary-qty">
                    {item.qty} × ${item.price.toFixed(2)}
                  </span>
                </div>
                <span className="checkout__summary-line">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="cart-summary__row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary__row">
            <span>Envío</span>
            <span>
              {deliveryCost === 0 ? 'Gratis' : `$${deliveryCost.toFixed(2)}`}
            </span>
          </div>
          <div className="cart-summary__row cart-summary__row--total">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
          <p className="checkout__summary-note">
            Compra 100% segura. {subtotal < freeShippingThreshold
              ? `Te faltan $${(freeShippingThreshold - subtotal).toFixed(2)} para envío gratis.`
              : 'Tu envío estándar es gratis.'}
          </p>
        </aside>
      </section>
    </div>
  );
}

export default Checkout;