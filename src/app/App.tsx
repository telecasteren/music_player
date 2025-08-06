import { Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Dashboard from "./dashboard/page.tsx";
import { Target } from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <img
          className="w-42 h-42 rounded-lg"
          src="src/assets/satori-logo-icon.png"
          alt="satori icon"
        />
        <h1 className="text-4xl">Satori music</h1>
        <p className="text-sm">Your chosen audio player</p>
        <div className="flex flex-col m-6 items-center justify-center">
          <Button
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer hover:bg-[var(--accent-dark)]"
          >
            <Target className="w-4 h-4 text-gray-900" />
            Open sesame
          </Button>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
