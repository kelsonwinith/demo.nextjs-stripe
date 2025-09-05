"use client";

import Checkout from "@/components/package/components/checkout.component";
import { usePackageContext } from "@/components/package/context/package.context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dispatch, useState } from "react";

type PackagePopupProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
};

export function PackagePopup({ isOpen, setIsOpen }: PackagePopupProps) {
  const { selectedPackage } = usePackageContext();
  const isDonate = selectedPackage.current?.id === "-1";
  const [donationConfirmed, setDonationConfirmed] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedPackage.current?.name}</DialogTitle>
          <DialogDescription>
            {selectedPackage.current?.description}
          </DialogDescription>
        </DialogHeader>
        {isDonate ? (
          !donationConfirmed ? (
            <div className="flex flex-col gap-4">
              <span className="text-muted-foreground text-sm">
                Thank you for considering a donation! Your support helps us
                continue our work and make a difference. Every contribution, big
                or small, is greatly appreciated. Together, we can achieve more!
              </span>
              <Input
                type="number"
                placeholder="Enter amount"
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (selectedPackage.current) {
                    selectedPackage.current.price = value;
                  }
                }}
              />
              <Button
                onClick={(e) => {
                  setDonationConfirmed(true);
                }}
              >
                Confirm Amount
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Checkout />
              <Button
                variant="outline"
                onClick={() => setDonationConfirmed(false)}
              >
                Change Amount
              </Button>
            </div>
          )
        ) : (
          <Checkout />
        )}
      </DialogContent>
    </Dialog>
  );
}
