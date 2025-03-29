import axios from "axios";
import { toast } from "sonner";
import { ApiResponse, User } from "../utils/interfaces";
import { getUsersFromSession } from "../utils/getUsersFromLocal";
import { storeUsersInSession } from "../utils/storeUsers";

export const fetchUsers = async (
  page: number,
  setUsers: (users: User[]) => void,
  setTotalPages: (pages: number) => void,
  setIsLoading: (loading: boolean) => void,
  navigate: (path: string) => void
) => {
  setIsLoading(true);
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/");
      toast.error("Session expired. Please log in again.");
      return;
    }

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
    storeUsersInSession(page, response.data.data);
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to fetch users. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};
