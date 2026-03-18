function ProjectList({ projects, onDelete, onEdit, user }) {
  return (
    <div>
      {projects.map(project => (
        <div key={project.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>{project.tech}</p>

          {user?.role === "admin" && (
            <div>
              <button onClick={() => onEdit(project)}>Editar</button>
              <button onClick={() => onDelete(project.id)}>Borrar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectList;