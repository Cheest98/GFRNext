import Image from "next/image";
import { Input } from "../ui/input";

interface ButtonProps {
  action: (props: any) => void;
}

function Searchbar({ action }: ButtonProps) {
  return (
    <form action={action}>
      <div className="searchbar">
        <Image
          src="/assets/search-gray.svg"
          alt="search"
          width={24}
          height={24}
          className="object-contain"
        />
        <div className="form-control">
          <Input
            name="searchQuery"
            placeholder="Search"
            className="input-bordered input w-full min-w-[100px]"
          />
        </div>
      </div>
    </form>
  );
}

export default Searchbar;
