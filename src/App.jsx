import { HashRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AboutPage } from "./pages/AboutPage";
import { AdmetPage } from "./pages/AdmetPage";
import { DatasetsPage } from "./pages/DatasetsPage";
import { DockingPage } from "./pages/DockingPage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <HashRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/datasets" element={<DatasetsPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/docking" element={<DockingPage />} />
          <Route path="/admet" element={<AdmetPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}
