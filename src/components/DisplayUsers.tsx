import { User } from "@/utils/interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function DisplayUsers({
  users,
  isLoading,
  handleEdit,
  handleDeleteConfirm,
  getInitials,
}: {
  users: User[];
  isLoading: boolean;
  handleEdit: (user: User) => void;
  handleDeleteConfirm: (user: User) => void;
  getInitials: (firstName: string, lastName: string) => string;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        Array(6)
          .fill(0)
          .map((_, index) => (
            <Card key={`skeleton-${index}`} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))
      ) : users.length > 0 ? (
        users.map((user) => (
          <Card key={user.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                  <AvatarFallback>
                    {getInitials(user.first_name, user.last_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-medium text-lg">{`${user.first_name} ${user.last_name}`}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="flex space-x-2 w-full">
                  <Button
                    onClick={() => handleEdit(user)}
                    className="flex-1"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteConfirm(user)}
                    className="flex-1"
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-screen text-xl text-gray-500">
          No users found.
        </div>
      )}
    </div>
  );
}
