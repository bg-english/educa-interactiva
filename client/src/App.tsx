import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GameProvider } from "./contexts/GameContext";
import { UserProvider } from "./contexts/UserContext";
import Home from "./pages/Home";
import WordGames from "./pages/WordGames";
import Nutrition from "./pages/Nutrition";
import NervousSystem from "./pages/NervousSystem";
import EatingDisorders from "./pages/EatingDisorders";
import CNSDiseases from "./pages/CNSDiseases";
import BiblicalIntegration from "./pages/BiblicalIntegration";
import Workshop from "./pages/Workshop";
import Results from "./pages/Results";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/word-games"} component={WordGames} />
      <Route path={"/nutrition"} component={Nutrition} />
      <Route path={"/nervous-system"} component={NervousSystem} />
      <Route path={"/eating-disorders"} component={EatingDisorders} />
      <Route path={"/cns-disorders"} component={CNSDiseases} />
      <Route path={"/biblical-integration"} component={BiblicalIntegration} />
      <Route path={"/workshop"} component={Workshop} />
      <Route path={"/results"} component={Results} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <UserProvider>
          <GameProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </GameProvider>
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
