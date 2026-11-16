import { homeMarkup } from "./home-markup";
import OriginalTheme from "./original-theme";
import "./exhibition.css";

export default function Home() {
  return <>

    <OriginalTheme />
    <noscript><style>{`.original-portfolio .work[hidden],.original-portfolio .skill-slide[hidden]{display:block}.original-portfolio .carousel-top,.original-portfolio .project-index,.original-portfolio .skills-controls,.original-portfolio .skills-index,.original-portfolio .theme-toggle{display:none}.original-portfolio .work+.work{margin-top:48px}`}</style></noscript>
    <div className="original-portfolio" dangerouslySetInnerHTML={{ __html: homeMarkup }} />
  </>;
}
