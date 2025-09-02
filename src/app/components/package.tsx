"use client";

import { PackagePopup } from "@/app/components/packagePopup";
import usePackage from "@/app/hooks/package.hook";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function Package() {
  const { data, selectedPackage } = usePackage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PackagePopup
        pkg={selectedPackage}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">Available Packages</span>
        <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-3">
          {data.map((pack: any) => (
            <Card key={pack.id} className="min-w-[300px]">
              <CardHeader>
                <CardTitle>{pack.name}</CardTitle>
                <CardDescription>{pack.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <span className="text-lg font-bold">
                  ${pack.price.toFixed(2)}
                </span>
                <Button
                  onClick={() => {
                    setIsOpen(true);
                    selectedPackage.current = pack;
                  }}
                >
                  Buy
                </Button>
              </CardFooter>
            </Card>
          ))}
          <div className="col-span-full flex justify-center">
            <span className="text-muted-foreground text-base">
              Click here to{" "}
              <span
                onClick={() => {
                  setIsOpen(true);
                  selectedPackage.current = null;
                }}
                className="font-semibold underline"
              >
                donate
              </span>{" "}
              &amp; support us!
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
