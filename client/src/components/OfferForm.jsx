import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const FormContainer = styled.div`
  background: rgba(30, 41, 59, 1);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  color: #38bdf8;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(15, 23, 42, 0.5);
  color: #f8fafc;
  outline: none;
  font-size: 1rem;

  &:focus {
    border-color: #38bdf8;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(15, 23, 42, 0.5);
  color: #f8fafc;
  outline: none;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;

  &:focus {
    border-color: #38bdf8;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: #38bdf8;
  color: #0f172a;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0ea5e9;
  }
`;

const StatusMsg = styled.p`
  text-align: center;
  font-size: 0.95rem;
  color: ${props => props.error ? '#ef4444' : '#10b981'};
`;

function OfferForm({ token }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${(import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, "")}/offers`, form, {
        headers: { Authorization: token }
      });
      setIsError(false);
      setStatus("Oferta enviada con éxito");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setIsError(true);
      setStatus(err.response?.data || "Error al enviar la oferta");
    }
  };

  return (
    <FormContainer>
      <Title>¿Trabajamos juntos?</Title>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          name="name"
          placeholder="Tu nombre completo"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Tu email de contacto"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextArea
          name="message"
          placeholder="Cuéntame sobre la propuesta..."
          value={form.message}
          onChange={handleChange}
          required
        />
        <Button type="submit">Enviar Propuesta</Button>
      </form>
      {status && <StatusMsg error={isError}>{status}</StatusMsg>}
    </FormContainer>
  );
}

export default OfferForm;