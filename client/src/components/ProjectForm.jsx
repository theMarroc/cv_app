import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  min-height: 100px;
  resize: vertical;

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

function ProjectForm({ form, handleChange, handleSubmit, editingId }) {
  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="file"
        name="icon"
        accept="image/*"
        onChange={handleChange}
      />

      <Input
        type="text"
        name="title"
        placeholder="Título del Proyecto"
        value={form.title}
        onChange={handleChange}
        required
      />

      <TextArea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        required
      />

      <Input
        type="text"
        name="tech"
        placeholder="Tecnologías (ej: React, Node, MongoDB)"
        value={form.tech}
        onChange={handleChange}
        required
      />

      <Input
        type="text"
        name="link"
        placeholder="Enlace (ej: https://midominio.com)"
        value={form.link || ""}
        onChange={handleChange}
        required
      />

      <Button type="submit">
        {editingId ? "Actualizar Proyecto" : "Guardar Nuevo Proyecto"}
      </Button>
    </FormContainer>
  );
}

export default ProjectForm;