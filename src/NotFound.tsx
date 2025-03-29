import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button className="mt-6" onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </div>
  );
};

export default NotFound;
