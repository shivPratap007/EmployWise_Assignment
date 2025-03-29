// src/components/UserList.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import { ApiResponse, User } from "./utils/interfaces";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";
import EditUserDialog from "./components/EditUserDialog";
import Pagination from "./components/Pagination";
import DisplayUsers from "./components/DisplayUsers";
import Logout from "./components/Logout";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<User>>({});

  const navigate = useNavigate();

  // Function to store users in session storage
  const storeUsersInSession = (page: number, data: User[]) => {
    sessionStorage.setItem(`users_page_${page}`, JSON.stringify(data));
  };

  // Function to get users from session storage
  const getUsersFromSession = (page: number): User[] | null => {
    const storedUsers = sessionStorage.getItem(`users_page_${page}`);
    return storedUsers ? JSON.parse(storedUsers) : null;
  };

  // Fetch users from API or session storage
  const fetchUsers = async (page: number) => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/");
        toast.error("Session expired. Please log in again.");
        return;
      }

      // Check if data exists in session storage
      const cachedUsers = getUsersFromSession(page);
      if (cachedUsers) {
        setUsers(cachedUsers);
        setIsLoading(false);
        return;
      }

      const response = await axios.get<ApiResponse>(
        `https://reqres.in/api/users?page=${page}`
      );
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);

      // Store users in session storage
      storeUsersInSession(page, response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${selectedUser.id}`,
        editFormData
      );

      if (!response.data) {
        throw new Error("No data returned from API");
      }
      // Update local state
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...editFormData } : user
      );

      setUsers(updatedUsers);
      setIsEditDialogOpen(false);

      // Update session storage
      storeUsersInSession(currentPage, updatedUsers);

      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  const handleDeleteConfirm = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await axios.delete(`https://reqres.in/api/users/${selectedUser.id}`);

      // Update local state
      const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      setIsDeleteDialogOpen(false);

      // Update session storage
      storeUsersInSession(currentPage, updatedUsers);

      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Logout handleLogout={handleLogout} />

      <DisplayUsers
        users={users}
        isLoading={isLoading}
        handleEdit={handleEdit}
        handleDeleteConfirm={handleDeleteConfirm}
        getInitials={getInitials}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        isLoading={isLoading}
      />

      {/* Edit User Dialog */}
      <EditUserDialog
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        editFormData={editFormData}
        handleEditFormChange={handleEditFormChange}
        handleUpdateUser={handleUpdateUser}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        selectedUser={selectedUser}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default UserList;
