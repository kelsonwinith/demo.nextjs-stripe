"use client";

import { getPackage } from "@/lib/api";
import { Package } from "@/types/package.type";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRef } from "react";

export default function usePackage() {
  const { data } = useSuspenseQuery({
    queryKey: ["package"],
    queryFn: getPackage,
  });

  const selectedPackage = useRef<Package | null>(null);

  return { data, selectedPackage };
}
