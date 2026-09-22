import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import './Contact.css';

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    title: 'Visítanos',
    detail: 'Av. Las Mascotas 123',
    extra: 'Lima, Perú',
  },
  {
    icon: FaPhoneAlt,
    title: 'Llámanos',
    detail: '+51 987 654 321',
    extra: 'Lun–Sáb, 9am – 7pm',
  },
  {
    icon: FaEnvelope,
    title: 'Escríbenos',
    detail: 'hola@webpetshop.com',
    extra: 'Respondemos en 24h',
  },
];

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="contact">
      <section className="page-hero">
        <div className="container page-hero__container">
          <span className="page-hero__badge">Contacto</span>
          <h1 className="page-hero__title">
            Hablemos <span className="gradient-text">con nosotros</span>
          </h1>
          <p className="page-hero__subtitle">
            ¿Tienes una pregunta sobre nuestros productos o tu pedido? Estamos
            aquí para ayudarte.
          </p>
        </div>
      </section>

      <section className="container contact__body">
        <div className="contact__info">
          {contactInfo.map((item) => (
            <div key={item.title} className="contact__info-card">
              <div className="contact__info-icon">
                <item.icon />
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <span>{item.extra}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="contact__form-wrap">
          {sent ? (
            <div className="contact__success">
              <FaCommentDots className="contact__success-icon" />
              <h3>¡Mensaje enviado!</h3>
              <p>
                Gracias, {form.name || 'amigo'}. Nos pondremos en contacto
                contigo muy pronto.
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSent(false);
                  setForm({ name: '', email: '', message: '' });
                }}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <h3 className="contact__form-title">Envíanos un mensaje</h3>
              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="name">Nombre</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Tu nombre"
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
              </div>
              <div className="contact__field">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  placeholder="Cuéntanos en qué podemos ayudarte"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary contact__submit">
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default Contact;