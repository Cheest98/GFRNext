"use client"
import Image from "next/image";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";

interface ButtonProps {
  action: (props: any) => void;
}

function Searchbar({ action }: ButtonProps) {
  const { data: session, status } = useSession();
  return (
    <form action={action}>
      <div className="searchbar flex justify-between">
        <div className="form-control flex justify-between gap-3 ">
          <Input
            name="searchQuery"
            placeholder=" Group Search"
            className="searchbar_input"
          />
          {status === "authenticated" ? (
            <Image
              src="/assets/search-gray.svg"
              alt="search"
              width={24}
              height={24}
              className="object-contain"
            />
          ) : (
            <svg
              fill="#ffffff"
              height="22px"
              width="22px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 330 330"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g id="XMLID_509_">
                  {" "}
                  <path
                    id="XMLID_510_"
                    d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15 s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25 C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
          )}
        </div>
      </div>
    </form>
  );
}

export default Searchbar;
