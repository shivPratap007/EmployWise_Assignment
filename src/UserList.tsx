import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { User } from "./utils/interfaces";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";
import EditUserDialog from "./components/EditUserDialog";
import Pagination from "./components/Pagination";
import DisplayUsers from "./components/DisplayUsers";
import Logout from "./components/Logout";
import { storeUsersInSession } from "./utils/storeUsers";
import { fetchUsers } from "./utils/fetchUsers";
import { BASE_URL } from "./lib/utils";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<User>>({});
  const [updateLoader, setUpdateLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(currentPage, setUsers, setTotalPages, setIsLoading, navigate);
  }, [currentPage]);

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success("Logged out successfully");
    navigate("/");
  };
  useEffect(() => {
    document.title = "User List";
  }, []);

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

    setUpdateLoader(true);

    try {
      const response = await axios.put(
        `${BASE_URL}/users/${selectedUser.id}`,
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
    } finally {
      setUpdateLoader(false);
    }
  };

  const handleDeleteConfirm = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    setDeleteLoader(true);

    try {
      await axios.delete(`${BASE_URL}/users/${selectedUser.id}`);

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
    } finally {
      setDeleteLoader(false);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Logout handleLogout={handleLogout} users={users} setUsers={setUsers} page={currentPage}/>

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
        updateLoader={updateLoader}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        selectedUser={selectedUser}
        handleDeleteUser={handleDeleteUser}
        deleteLoader={deleteLoader}
      />
    </div>
  );
};

export default UserList;
