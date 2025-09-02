import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, RefObject } from "react";

type PackagePopupProps = {
  pkg: RefObject<Package | null>;
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
};

export function PackagePopup({ pkg, isOpen, setIsOpen }: PackagePopupProps) {
  if (pkg.current === null) {
    pkg.current = {
      id: "-1",
      name: "Donate",
      description: "Support us by donating!",
      price: 0,
    };
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{pkg.current?.name}</DialogTitle>
          <DialogDescription>{pkg.current?.description}</DialogDescription>
        </DialogHeader>
        <div>Hello</div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
