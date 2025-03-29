import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { User } from "@/utils/interfaces";
import { useEffect, useState, useRef, } from "react";

export default function Logout({
  handleLogout,
  users,
  setUsers,
  page,
}: {
  handleLogout: () => void;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  page: number;
}) {
  const originalUsersRef = useRef<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Update the ref when users prop changes
  useEffect(() => {
    if (users.length > 0 && originalUsersRef.current.length === 0) {
      originalUsersRef.current = [...users];
    }
  }, [users]);

  // Filter the users based on the search term
  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setUsers([
        ...JSON.parse(sessionStorage.getItem(`users_page_${page}`) || "[]"),
      ]);
      return;
    }

    const filteredUsers = [
      ...JSON.parse(sessionStorage.getItem(`users_page_${page}`) || "[]"),
    ].filter(
      (user) =>
        user.first_name.toLowerCase().includes(value.toLowerCase()) ||
        user.last_name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );

    setUsers(filteredUsers);
  };

  return (
    <div className="flex rounded-2xl mb-3 items-center justify-between p-4 bg-white border-b">
      <div className="flex-1 max-w-sm">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full"
        />
      </div>
      <Button variant="outline" onClick={handleLogout} className="ml-4">
        <LogOut className="mr-2 h-4 w-4" />
        <span className="hidden md:inline">Logout</span>
      </Button>
    </div>
  );
}
