import Package from "@/components/package";
import { ThemeToggle } from "@/components/themeToggle";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex min-h-screen items-center justify-center">
        <Suspense fallback={<Skeleton className="h-16 w-full" />}>
          <Package />
        </Suspense>
      </div>
    </div>
  );
}
