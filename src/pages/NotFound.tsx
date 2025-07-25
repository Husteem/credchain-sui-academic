import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center p-6">
      <Card className="p-8 text-center max-w-md shadow-elegant animate-fade-in">
        <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! This page doesn't exist in the CredChain system
        </p>
        <Button variant="hero" asChild>
          <a href="/">
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </a>
        </Button>
      </Card>
    </div>
  );
};

export default NotFound;
