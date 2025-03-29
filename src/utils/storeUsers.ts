import { User } from "./interfaces";

export const storeUsersInSession = (page: number, data: User[]) => {
  sessionStorage.setItem(`users_page_${page}`, JSON.stringify(data));
};
