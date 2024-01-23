import { cn } from "@/lib/utils";
interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className={cn("text-center text-sm text-gray-200")}> Welcome back!</h1>
      <p className="text-muted-foreground text-sm text-gray-200">{label}</p>
    </div>
  );
};
