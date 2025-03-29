import { User } from "./interfaces";

export const getUsersFromSession = (page: number): User[] | null => {
  const storedUsers = sessionStorage.getItem(`users_page_${page}`);
  return storedUsers ? JSON.parse(storedUsers) : null;
};
