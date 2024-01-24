import { cn } from "@/lib/utils";
interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="text-muted-foreground text-sm text-gray-200">{label}</p>
    </div>
  );
};
