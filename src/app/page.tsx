import Package from "@/components/package/index.component";
import { ThemeToggle } from "@/components/themeToggle/index.component";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex min-h-screen items-center justify-center">
        <Suspense fallback={<Skeleton className="h-36 w-1/3" />}>
          <Package />
        </Suspense>
      </div>
    </div>
  );
}
