import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h2`
  color: #1e293b;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 1px;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none; // Hiding for simplicity on mobile for now
  }
`;

const NavLink = styled.a`
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`;

const AuthControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserGreet = styled.span`
  color: #475569;
  font-size: 0.9rem;
`;

const Button = styled.button`
  background: ${props => props.primary ? "#2563eb" : "transparent"};
  color: ${props => props.primary ? "#ffffff" : "#2563eb"};
  border: 1px solid #2563eb;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${props => props.primary ? "#1d4ed8" : "rgba(37, 99, 235, 0.1)"};
  }
`;

function Header({ user, handleLogout, onLoginClick, onRegisterClick }) {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <HeaderContainer>
      <Logo onClick={() => scrollTo("hero")}>Marco Scalzo</Logo>
      <Nav>
        <NavLink onClick={() => scrollTo("skills")}>Capacidades</NavLink>
        <NavLink onClick={() => scrollTo("projects")}>Proyectos</NavLink>
        {user?.role === "user" && <NavLink onClick={() => scrollTo("contact")}>Contacto</NavLink>}
      </Nav>

      <AuthControls>
        {user ? (
          <>
            <UserGreet>Hola, {user.username} {user.role === 'admin' ? '(Admin)' : ''}</UserGreet>
            <Button onClick={handleLogout}>Salir</Button>
          </>
        ) : (
          <>
            <Button onClick={onLoginClick}>Ingresar</Button>
            <Button primary onClick={onRegisterClick}>Registro</Button>
          </>
        )}
      </AuthControls>
    </HeaderContainer>
  );
}

export default Header;
