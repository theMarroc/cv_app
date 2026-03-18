import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  color: #38bdf8;
  text-align: center;
  margin-bottom: 1rem;
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

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: #38bdf8;
  color: #0f172a;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    background: #0ea5e9;
  }
`;

const ErrorMsg = styled.p`
  color: #ef4444;
  text-align: center;
  font-size: 0.9rem;
`;

function Login({ setToken }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/login`, form)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        setToken(token);
      })
      .catch(err => {
        setError("Usuario o contraseña incorrectos");
      });
  };

  return (
    <FormContainer>
      <Title>Iniciar Sesión</Title>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          type="text"
          name="username"
          placeholder="Usuario"
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        <Button type="submit">Entrar</Button>
      </form>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </FormContainer>
  );
}

export default Login;