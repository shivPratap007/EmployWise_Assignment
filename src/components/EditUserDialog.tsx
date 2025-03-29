import { User } from "@/utils/interfaces";
import { Button } from "./ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function EditUserDialog({
  isEditDialogOpen,
  setIsEditDialogOpen,
  editFormData,
  handleEditFormChange,
  handleUpdateUser,
}: {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editFormData: Partial<User>;
  handleEditFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateUser: () => Promise<void>;
}) {
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="first_name" className="text-right">
              First Name
            </Label>
            <Input
              id="first_name"
              name="first_name"
              value={editFormData.first_name || ""}
              onChange={handleEditFormChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="last_name" className="text-right">
              Last Name
            </Label>
            <Input
              id="last_name"
              name="last_name"
              value={editFormData.last_name || ""}
              onChange={handleEditFormChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={editFormData.email || ""}
              onChange={handleEditFormChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleUpdateUser}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
