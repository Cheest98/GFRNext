import Image from "next/image";
import { Input } from "../ui/input";

interface ButtonProps {
  action: (props: any) => void;
}

function Searchbar({ action }: ButtonProps) {
  return (
    <form action={action}>
      <div className="searchbar flex justify-between">
        <div className="form-control flex justify-between gap-3">
          <Input
            name="searchQuery"
            placeholder=" Group Search"
            className="searchbar_input"
          />
          <Image
            src="/assets/search-gray.svg"
            alt="search"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
      </div>
    </form>
  );
}

export default Searchbar;
