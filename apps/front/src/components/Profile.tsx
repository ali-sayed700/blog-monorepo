import * as Avatar from "@radix-ui/react-avatar";
import { SessionUser } from "@/lib/sessions";
import * as Popover from "@radix-ui/react-popover";
import {
  ArrowRightStartOnRectangleIcon,
  ListBulletIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
type Props = {
  user: SessionUser;
};

const Profile = ({ user }: Props) => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Avatar.Root>
          <Avatar.Image
            className="rounded-full w-14 border-2 border-white"
            src={user.avatar}
            alt="image profile"
          />
          <Avatar.Fallback>
            <UserIcon className="w-8 text-slate-500" />
          </Avatar.Fallback>
        </Avatar.Root>
      </Popover.Trigger>
      <Popover.Content className="bg-black shadow-lg rounded-md mt-2 p-2 z-10">
        <div className="flex justify-center items-center gap-3">
          <UserIcon className="w-4" />
          <p>{user.name}</p>
        </div>

        <div className="*:grid *:grid-cols-5 *:gap-3 *:items-center *:my-2 *:py-2 [&>*>span]:col-span-4 [&>*:hover]:bg-sky-500 [&>*:hover]:text-white *:transition *:rounded-md [&>*>*:nth-child(1)]:justify-self-end ">
          <a href="/api/auth/signout">
            <ArrowRightStartOnRectangleIcon className="w-4" />
            <span>Sign Out</span>
          </a>
          <Link href="/user/create-post">
            <PencilSquareIcon className="w-4 " />
            <span>Create New Post</span>
          </Link>
          <Link href="/user/posts">
            <ListBulletIcon className="w-4" />
            <span>Posts</span>
          </Link>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};

export default Profile;
