"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoTasklist } from "react-icons/go";
import { GoGoal } from "react-icons/go";
import { Star } from "coolshapes-react"

const MobileNavbar = ({ className }: { className?: string }) => {
  const path = usePathname();


  return (
    <nav
      className={cn(
        "flex fixed bg-background py-1 h-17 border-t bottom-0 left-0 w-full justify-evenly sm:hidden rounded-t-md",
        className
      )}
    >
      <Link
        href={"/tasks"}
        className={cn(
          "flex h-16 px-4 flex-col gap-1 items-center text-primary/70 justify-center text-sm",
          path === "/tasks" && "text-primary scale-105 font-bold"
        )}
      >
        <GoTasklist size={20} /> Tasks
      </Link>


      <Link
        href={"/ai"}
        className={cn(
          "flex h-16 px-4 flex-col -mt-9 gap-1 items-center text-primary/70 justify-center text-sm",
          path === "/" && "text-primary scale-105 font-bold"
        )}
      >
        {/* <IoSearchSharp size={20} className="text-white" /> */}
        {/* <Star_8 height="20" width="20" /> */}
        <Star
          index={7}
          noise={true}
          size={70}
          
        />
      </Link>

      <Link
        href={"/goals"}
        className={cn(
          "flex h-16 px-4 flex-col gap-1 items-center text-primary/70 justify-center text-sm",
          path === "/goals" && "text-primary scale-105 font-bold"
        )}
      >
        <GoGoal size={20} /> Goals2
      </Link>
    </nav>
  );
};

export default MobileNavbar;



