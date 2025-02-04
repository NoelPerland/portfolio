import { ProjectProvider } from "../context/ProjectContext";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ProjectProvider>
      <Navbar />
      <div className="pt-16">
        {" "}
        {/* Add padding to account for the navbar */}
        <Component {...pageProps} />
      </div>
    </ProjectProvider>
  );
}

export default MyApp;
