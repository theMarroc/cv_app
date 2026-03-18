import styled from "styled-components";
import whatsappIcon from "../assets/whatsapp.png";
import linkedinIcon from "../assets/linkedin.png";
import gmailIcon from "../assets/gmail.png";
import marco from "../assets/marco.png"



// Layout principal del Hero
const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  color: #1e293b;
`;

// Fila superior: Foto y Títulos
const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #cbd5e1; // Placeholder bg
`;

const TitlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
`;

const Name = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-top: 0;
  margin-bottom: 0.2rem;
`;

const JobTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  color: #475569;
  margin: 0;
`;

// Fila de Contactos (Píldoras)
const ContactRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ContactLabel = styled.h3`
  font-size: 1.8rem;
  font-weight: 800;
  color: #0f172a;
  margin-right: 0.5rem;
`;

const Chip = styled.a`
  background-color: ${props => props.color || "#fcd34d"};
  color: #1e293b;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;

  &:hover {
    filter: brightness(0.95);
  }
`;

const ChipIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
  vertical-align: middle;
`;

// Acerca de mi
const AboutSection = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

const SectionTitleWrapper = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: 1rem;
  width: 100%;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
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
  background-color: #cbd5e1; /* gris claro para la linea */
  z-index: 0;
`;

const AboutText = styled.p`
  padding: 0 1rem 0 1rem;
  color: #334155;
  line-height: 1.6;
  font-size: 0.95rem;
  font-weight: 500;
  width: 100%;
  margin: 0;
  text-align: justify;
`;

function Hero({ user }) {
  return (
    <HeroContainer id="hero">
      <TopRow>
        <Avatar src={marco} alt="Marco Scalzo Avatar" />
        <TitlesContainer>
          <Name>Marco Lionel Scalzo</Name>
          <JobTitle>Técnico Superior en Programación</JobTitle>
        </TitlesContainer>
      </TopRow>

      <ContactRow>
        <Chip color="#25d3657a" href="https://wa.me/2291512866" target="_blank">
          <ChipIcon src={whatsappIcon} alt="WhatsApp" />
          <span className="screen-only">WhatsApp</span>
          <span className="print-only">+54 9 2291 512866</span>
        </Chip>

        <Chip color="#0076b577" href="https://www.linkedin.com/in/marco-scalzo-7459a3246/" target="_blank">
          <ChipIcon src={linkedinIcon} alt="LinkedIn" />
          <span className="screen-only">LinkedIn</span>
          <span className="print-only">Marco Scalzo</span>
        </Chip>

        <Chip color="#f4433677" href="mailto:scalzomarco98@gmail.com">
          <ChipIcon src={gmailIcon} alt="Gmail" />
          scalzomarco98@gmail.com
        </Chip>
      </ContactRow>

      <AboutSection>
        <SectionTitleWrapper>
          <TitleLine />
          <SectionTitle>Acerca de mi</SectionTitle>
        </SectionTitleWrapper>
        <AboutText>
          Técnico Superior en Programación recibido en Teclab y Alura Next Education, con sólida formación en desarrollo web moderno (stack MERN). Soy proactivo, responsable y orientado a la resolución de problemas, con ganas de aprender nuevas herramientas y enfrentar desafíos tecnológicos. Experiencia en la creación de aplicaciones web interactivas, análisis de datos y proyectos de software completos, buscando siempre entregar soluciones eficientes y escalables.
        </AboutText>
      </AboutSection>
    </HeroContainer>
  );
}

export default Hero;
