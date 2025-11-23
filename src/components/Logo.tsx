import { Sun } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Sun className="h-8 w-8 text-yellow-500" />
      <span className="text-2xl font-bold">Solary</span>
    </div>
  );
}