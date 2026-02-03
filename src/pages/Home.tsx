import { SEO } from "../components/shared/seo";
import "./Home.css";

function Home() {
  return (
    <>
      <SEO title="Home" description="Transforming veterinary medicine with artificial intelligence" />
      <main className="home-container">
        <h1>Diagnovet</h1>
        <p>Transforming veterinary medicine with artificial intelligence.</p>
        <p className="home-hint">
          This content is only visible in development mode. In production, users will see the Work In Progress page.
        </p>
      </main>
    </>
  );
}

export default Home;
