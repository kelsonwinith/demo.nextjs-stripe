import Checkout from "@/components/checkout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Package } from "@/types/package.type";
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
      currency: "thb",
    };
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{pkg.current?.name}</DialogTitle>
          <DialogDescription>{pkg.current?.description}</DialogDescription>
        </DialogHeader>
        <Checkout pkg={pkg} />
      </DialogContent>
    </Dialog>
  );
}
