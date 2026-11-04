import { homeMarkup } from "./home-markup";
import OriginalTheme from "./original-theme";
import "./exhibition.css";

export default function Home() {
  return <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" />
    <OriginalTheme />
    <div className="original-portfolio" dangerouslySetInnerHTML={{ __html: homeMarkup }} />
  </>;
}
