import { type UserData } from "@/app/data";
import { Info, Phone, Video } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";

interface ChatTopbarProps {
  selectedUser: UserData;
}

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ChatTopbar({ selectedUser }: ChatTopbarProps) {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-end border-b">
      <div className="flex items-center gap-2">
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={selectedUser.avatar}
            alt={selectedUser.name}
            width={6}
            height={6}
            className="w-10 h-10 "
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{selectedUser.name}</span>
          <span className="text-xs">Active 2 mins ago</span>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        {TopbarIcons.map((icon, index) => (
          <Link
            key={index}
            href="#"
            className="h-9 w-9 mx-1 dark:bg-transparent dark:text-muted-foreground
              dark:hover:bg-secondary rounded-lg flex items-center
              justify-center dark:hover:text-white"
          >
            <icon.icon size={20} className="text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}
