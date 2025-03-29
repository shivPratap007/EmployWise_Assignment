import { Button } from "./ui/button";

export default function Logout({ handleLogout }: { handleLogout: () => void }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      <Button onClick={handleLogout} variant="outline">
        Logout
      </Button>
    </div>
  );
}
