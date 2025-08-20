import { useState } from "react";
import Navigation from "../components/Navigation";
import HomePage from "../components/HomePage";
import QuizSection from "../components/QuizSection";
import RecyclingGame from "../components/RecyclingGame";
import EnergyMonitor from "../components/EnergyMonitor";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "quiz":
        return <QuizSection />;
      case "game":
        return <RecyclingGame />;
      case "monitor":
        return <EnergyMonitor />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default Index;
