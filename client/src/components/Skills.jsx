import styled from "styled-components";

// Misma lógica de Title Line que en Hero
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

const SkillsSection = styled.section`
  margin-bottom: 2rem;
  @media print {
    margin-bottom: 1rem;
  }
`;

const SkillsContainer = styled.div`

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
`;

const TechGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;

  @media print {
    gap: 0.4rem;
  }
`;

const SkillChip = styled.span`
  background-color: ${props => props.bg || "#e2e8f0"};
  color: #1e293b;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  display: flex;
  align-items: center;
  gap: 0.4rem;

  img {
    width: 32px;
    height: 32px;
  }

  @media print {
    padding: 0.2rem 0.4rem;
    font-size: 0.85rem;
    gap: 0.3rem;
    box-shadow: none;
    border: 1px solid #e2e8f0;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const GroupLabel = styled.strong`
  color: #475569;
  font-size: 1rem;
  margin-right: 0.5rem;
`;

function Skills() {
  return (
    <SkillsSection id="skills">
      <SectionTitleWrapper>
        <TitleLine />
        <SectionTitle>Habilidades</SectionTitle>
      </SectionTitleWrapper>

      <SkillsContainer>
        {/* Frontend Group */}
        <TechGroup>
          <GroupLabel></GroupLabel>
          <SkillChip bg="#e0f2fe"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />React</SkillChip>
          <SkillChip bg="#e0f2fe"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />JavaScript</SkillChip>
          <SkillChip bg="#e0f2fe"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />HTML5</SkillChip>
          <SkillChip bg="#e0f2fe"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />CSS3</SkillChip>
          <SkillChip bg="#e0f2fe"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />TypeScript</SkillChip>
          <SkillChip bg="#e0f2fe"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactbootstrap/reactbootstrap-original.svg" />React Native</SkillChip>

          <SkillChip bg="#dcfce7"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />Node.js</SkillChip>
          <SkillChip bg="#dcfce7"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" />Express.js</SkillChip>
          <SkillChip bg="#dcfce7"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" />JAVA</SkillChip>
          <SkillChip bg="#dcfce7"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg" />JWT</SkillChip>
          <SkillChip bg="#dcfce7"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" />Spring</SkillChip>
          <SkillChip bg="#dcfce7"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" />PHP</SkillChip>
          <SkillChip bg="#dcfce7"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />Python</SkillChip>

          <SkillChip bg="#f3e8ff"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" />MySQL</SkillChip>
          <SkillChip bg="#f3e8ff"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" />MongoDB</SkillChip>
          <SkillChip bg="#f3e8ff"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" />Pandas</SkillChip>

          <SkillChip bg="#64748b41"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" />Git</SkillChip>
          <a href="https://github.com/theMarroc" target="_blank" style={{ textDecoration: "none" }}><SkillChip bg="#64748b41"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" />GitHub</SkillChip></a>
          <SkillChip bg="#64748b41"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original.svg" />NPM</SkillChip>
          <SkillChip bg="#64748b41"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" />Inglés C1</SkillChip>
          <SkillChip bg="#64748b41"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" />Figma</SkillChip>
          <SkillChip bg="#64748b41"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg" />Canva</SkillChip>
          <SkillChip bg="#64748b41"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" />Lighthouse</SkillChip>
        </TechGroup>
      </SkillsContainer>
    </SkillsSection>
  );
}

export default Skills;
