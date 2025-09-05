"use client";

import { PackagePopup } from "@/components/package/components/packagePopup.component";
import {
  PackageProvider,
  usePackageContext,
} from "@/components/package/context/package.context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPackage } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Package() {
  return (
    <PackageProvider>
      <PackageWithContext />
    </PackageProvider>
  );
}

export function PackageWithContext() {
  const { data } = useSuspenseQuery({
    queryKey: ["package"],
    queryFn: getPackage,
  });
  const [isOpen, setIsOpen] = useState(false);
  const { selectedPackage } = usePackageContext();

  return (
    <>
      <PackagePopup isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">Available Packages</span>
        <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-3">
          {data.slice(1).map((pack) => (
            <Card key={pack.id} className="min-w-[300px]">
              <CardHeader>
                <CardTitle>{pack.name}</CardTitle>
                <CardDescription>{pack.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <span className="text-lg font-bold">
                  {pack.price.toFixed(2)} {pack.currency.toUpperCase()}
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
                  selectedPackage.current = data[0];
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
