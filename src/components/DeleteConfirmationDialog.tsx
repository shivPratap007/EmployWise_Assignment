import { User } from "@/utils/interfaces";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export default function DeleteConfirmationDialog({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedUser,
  handleDeleteUser,
  deleteLoader,
}: {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: User | null;
  handleDeleteUser: () => Promise<void>;
  deleteLoader: boolean;
}) {
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete {selectedUser?.first_name}{" "}
            {selectedUser?.last_name}'s account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteLoader}
            onClick={handleDeleteUser}
            className={`bg-destructive text-destructive-foreground hover:bg-destructive/90 ${
              deleteLoader ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {deleteLoader ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
