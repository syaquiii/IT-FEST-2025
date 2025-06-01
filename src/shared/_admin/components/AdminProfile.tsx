import { FC } from "react";

interface AdminProfileProps {
  imageUrl: string;
  username: string;
  email: string;
}

export const AdminProfile: FC<AdminProfileProps> = ({
  imageUrl,
  username,
  email,
}) => {
  return (
    <div className="flex items-center gap-4 p-4">
      <div className="h-12 w-12 flex-shrink-0">
        <img
          src={imageUrl}
          alt={`${username}'s profile`}
          className="h-full w-full bg-white rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col font-changa text-white">
        <span className="font-semibold ">{username}</span>
        <span className="text-sm font-extralight ">{email}</span>
      </div>
    </div>
  );
};
