
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="text-center max-w-md px-4 animate-fade-in">
        <h1 className="text-6xl font-bold mb-2 text-primary animate-float">404</h1>
        <p className="text-xl font-medium mb-6">The page you're looking for doesn't exist</p>
        <p className="text-muted-foreground mb-8">
          We can't seem to find the page you're looking for. Please check the URL or navigate back to the dashboard.
        </p>
        <Button
          onClick={() => navigate('/')}
          className="transition-all hover:scale-105 active:scale-95"
        >
          <Home className="h-4 w-4 mr-2" />
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
