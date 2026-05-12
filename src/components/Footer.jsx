import { SiStarship } from "react-icons/si";

export function Footer() {
  return (
    <div className="footer">
      <SiStarship className="footer-starship" aria-hidden="true" />
      <p>
        D.R. &copy; LigandHub 2026
      </p>
      <p className="footer-credit">
        Developed by the{" "}
        <a href="https://nanobiostructuresrg.github.io/" target="_blank" rel="noopener noreferrer">
          Nano]&deg;[Biostructures RG
        </a>{" "}
        at Tecnológico de Monterrey.
      </p>
    </div>
  );
}
