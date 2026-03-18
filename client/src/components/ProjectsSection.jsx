import styled from "styled-components";

// Misma lógica de Title Line que en Hero/Skills
const SectionTitleWrapper = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: 1.5rem;
  width: 100%;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0f172a;
  background: white;
  padding: 0 1rem;
  display: inline-block;
  position: relative;
  z-index: 1;
`;

const TitleLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #cbd5e1;
  z-index: 0;
`;

const ProjectsWrapper = styled.section`
  margin-top: 1rem;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const Card = styled.div`
  background: #cbd5e1;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 1rem;
  color: #0f172a;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const ProjectIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomLink = styled.a`
  font-size: 0.85rem;
  color: #0284c7;
  text-decoration: underline;
  margin-top: 1rem;
  display: inline-block;
  word-break: break-all;
  font-weight: 600;

  &:hover {
    color: #0369a1;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-decoration: underline;
`;

const ProjectDesc = styled.p`
  font-size: 0.9rem;
  line-height: 1.4;
  color: #1e293b;
  flex-grow: 1;
`;

const TechStack = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #334155;
`;

const AdminActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
`;

const ActionBtn = styled.button`
  background: ${props => props.danger ? "#fecaca" : "#bae6fd"};
  color: ${props => props.danger ? "#991b1b" : "#0369a1"};
  border: 1px solid ${props => props.danger ? "#f87171" : "#7dd3fc"};
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
`;

const CreateBtn = styled.button`
  background: #0ea5e9;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #0284c7;
  }
`;

function ProjectsSection({ projects, onDelete, onEdit, user, onNewProject }) {
  return (
    <ProjectsWrapper id="projects">
      <SectionHeader>
        <SectionTitleWrapper>
          <TitleLine />
          <SectionTitle>Proyectos y Experiencia</SectionTitle>
        </SectionTitleWrapper>

        {user?.role === "admin" && (
          <CreateBtn className="no-print" onClick={onNewProject}>+ Nuevo Proyecto</CreateBtn>
        )}
      </SectionHeader>

      <Grid>
        {projects.length > 0 ? (
          projects.map(project => (
            <Card key={project.id}>
              {project.icon && (
                <ProjectIcon>
                  {project.icon.includes('.') ? (
                    <img src={`http://localhost:3000/uploads/${project.icon}`} alt="icono" style={{width: '20px', height: '20px', objectFit: 'contain'}} />
                  ) : (
                    project.icon
                  )}
                </ProjectIcon>
              )}
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDesc>{project.description}</ProjectDesc>
              <TechStack>{project.tech}</TechStack>
              {project.link && (
                <BottomLink href={project.link} target="_blank" rel="noopener noreferrer">
                  <span className="screen-only">Visitar Proyecto</span>
                  <span className="print-only">{project.link}</span>
                </BottomLink>
              )}

              {user?.role === "admin" && (
                <AdminActions className="no-print">
                  <ActionBtn onClick={() => onEdit(project)}>Editar</ActionBtn>
                  <ActionBtn danger onClick={() => onDelete(project.id)}>Borrar</ActionBtn>
                </AdminActions>
              )}
            </Card>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#64748b", gridColumn: "1 / -1" }}>No hay proyectos disponibles.</p>
        )}
      </Grid>


    </ProjectsWrapper>
  );
}

export default ProjectsSection;
