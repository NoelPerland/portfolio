import { homeMarkup } from "./home-markup";
import OriginalTheme from "./original-theme";
import "./original-home.css";

export default function Home() {
  return <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700&display=swap" />
    <OriginalTheme />
    <div className="original-portfolio" dangerouslySetInnerHTML={{ __html: homeMarkup }} />
  </>;
}
