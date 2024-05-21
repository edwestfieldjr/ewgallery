import { getImage } from "~/server/queries";
import { clerkClient } from "@clerk/nextjs/server";
export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  return (
    <div className="flex h-full w-screen">
      <div className="flex flex-shrink items-center justify-center">
        <img
          src={image.url}
          className="flex-shrink object-contain"
          alt={image.name}
        />
      </div>
      <div className="flex flex-grow flex-col border-l shadow-black">
        <div className="w-full border-b p-2 text-center text-lg">
          {image.name}
        </div>
        <div className="flex min-w-64 flex-col p-2 text-center text-sm">
          Uploaded By
          <span className="font-bold text-yellow-600">
            {uploaderInfo.fullName}
          </span>
        </div>
        <div className="flex flex-col p-2 text-center text-sm">
          Created on
          <span className="font-bold text-yellow-600">
            {new Date(image.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
