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
  background: transparent;
  color: #38bdf8;
  border: 1px solid #38bdf8;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    background: rgba(56, 189, 248, 0.1);
  }
`;

const Message = styled.p`
  color: ${props => props.error ? '#ef4444' : '#10b981'};
  text-align: center;
  font-size: 0.9rem;
`;

function RegisterForm({ onSuccess }) {
    const [form, setForm] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/register`, form);
            if(onSuccess) onSuccess(); // Added this line based on instruction, assuming it was meant to be here
            setIsError(false);
            setMessage("Registrado con éxito. Redirigiendo...");
            setTimeout(() => {
                if(onSuccess) onSuccess();
            }, 1500);
        } catch (err) {
            setIsError(true);
            if (err.response?.data) setMessage(err.response.data);
            else setMessage("Error en el registro");
        }
    };

    return (
        <FormContainer>
            <Title>Crear Cuenta</Title>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Input
                    name="username"
                    placeholder="Usuario"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <Button type="submit">Registrarse</Button>
            </form>
            {message && <Message error={isError}>{message}</Message>}
        </FormContainer>
    );
}

export default RegisterForm;