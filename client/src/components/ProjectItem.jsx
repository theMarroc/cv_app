function ProjectItem({ project, onDelete, onEdit }) {
  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <small>{project.tech}</small>

      <br />

      <button onClick={() => onEdit(project)}>Editar</button>
      <button onClick={() => onDelete(project.id)}>Eliminar</button>
    </div>
  );
}

export default ProjectItem;