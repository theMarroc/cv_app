import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

// Componentes
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import ProjectsSection from "./components/ProjectsSection";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";
import OfferForm from "./components/OfferForm";
import ProjectForm from "./components/ProjectForm";
import Modal from "./components/Modal";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  body, html {
    background-color: #f3f4f6; /* Fondo gris claro detrás de la hoja */
    color: #1e293b; /* Texto oscuro principal */
  }

  .print-only {
    display: none;
  }

  /* Ocultar elementos en impresión */
  @media print {
    body, html {
      background-color: transparent;
    }
    .no-print {
      display: none !important;
    }
    .print-only {
      display: inline !important;
    }
    .screen-only {
      display: none !important;
    }
  }
`;

const A4Page = styled.div`
  max-width: 210mm; /* Ancho A4 */
  min-height: 297mm; /* Alto A4 */
  margin: 2rem auto;
  background-color: #ffffff;
  padding: 2.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  
  @media print {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: auto;
    box-shadow: none;
    max-width: none;
  }
`;

function App() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  
  // Modals state
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch (err) {
      console.error("Token inválido:", err);
      localStorage.removeItem("token");
      setToken(null);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const [form, setForm] = useState({ title: "", description: "", tech: "" });
  
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const fetchProjects = () => {
    axios.get(`${API_URL}/projects`)
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  };
  
  useEffect(() => { fetchProjects(); }, []);

  const handleChange = (e) => { 
    if (e.target.name === 'icon' && e.target.type === 'file') {
      setForm({ ...form, icon: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value }); 
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } };
    
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("tech", form.tech);
    formData.append("link", form.link || "");
    if (form.icon) {
      formData.append("icon", form.icon);
    }

    if (editingId) {
      axios.put(`${API_URL}/projects/${editingId}`, formData, config)
        .then(() => { fetchProjects(); setForm({ title: "", description: "", tech: "", icon: "", link: "" }); setEditingId(null); setShowProjectModal(false); });
    } else {
      axios.post(`${API_URL}/projects`, formData, config)
        .then(() => { fetchProjects(); setForm({ title: "", description: "", tech: "", icon: "", link: "" }); setShowProjectModal(false); });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/projects/${id}`, { headers: { Authorization: token } })
      .then(() => fetchProjects());
  };

  const handleEdit = (project) => {
    setForm({ title: project.title, description: project.description, tech: project.tech });
    setEditingId(project.id);
    setShowProjectModal(true);
  };

  const openNewProject = () => {
    setEditingId(null);
    setForm({ title: "", description: "", tech: "" });
    setShowProjectModal(true);
  };

  return (
    <>
      <GlobalStyle />
      
      <div className="no-print">
        <Header 
          user={user} 
          handleLogout={handleLogout} 
          onLoginClick={() => setShowLogin(true)} 
          onRegisterClick={() => setShowRegister(true)} 
        />
      </div>
      
      <A4Page>
        <Hero user={user} />
        <Skills />
        <ProjectsSection 
          projects={projects} 
          onDelete={handleDelete} 
          onEdit={handleEdit} 
          user={user} 
          onNewProject={openNewProject}
        />
        
        {/* Contact section for regular users - Not printed */}
        {user?.role === "user" && (
          <div id="contact" className="no-print" style={{ padding: '2rem 0', marginTop: '2rem', borderTop: '2px dashed #cbd5e1' }}>
            <h3 style={{marginBottom: '1rem', color: '#0f172a', textAlign: 'center'}}>¡Puedes enviarme un correo desde aquí!</h3>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <OfferForm token={token} />
            </div>
          </div>
        )}
      </A4Page>

      {/* Auth Modals - Hidden on print by default since they only load on click */}
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <Login setToken={(t) => { setToken(t); setShowLogin(false); }} />
          <p style={{marginTop: '1rem', textAlign: 'center'}}>
            ¿No tienes cuenta? <a href="#" style={{color: '#38bdf8'}} onClick={(e) => { e.preventDefault(); setShowLogin(false); setShowRegister(true); }}>Regístrate</a>
          </p>
        </Modal>
      )}

      {showRegister && (
        <Modal onClose={() => setShowRegister(false)}>
          <RegisterForm onSuccess={() => { setShowRegister(false); setShowLogin(true); }} />
          <p style={{marginTop: '1rem', textAlign: 'center'}}>
            ¿Ya tienes cuenta? <a href="#" style={{color: '#38bdf8'}} onClick={(e) => { e.preventDefault(); setShowRegister(false); setShowLogin(true); }}>Inicia sesión</a>
          </p>
        </Modal>
      )}

      {/* Admin Project Form Modal */}
      {showProjectModal && (
        <Modal onClose={() => setShowProjectModal(false)}>
          <h2 style={{ marginBottom: '1.5rem', color: '#38bdf8' }}>{editingId ? "Editar Proyecto" : "Nuevo Proyecto"}</h2>
          <ProjectForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            editingId={editingId}
          />
        </Modal>
      )}
    </>
  );
}

export default App;