import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SettingsProvider } from "@/hooks/use-settings";
import { Mode3DProvider } from "@/hooks/use-3d-mode";
import PokemonExplorer from "@/pages/pokemon-explorer";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={PokemonExplorer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <Mode3DProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </Mode3DProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
}

export default App;
