import Link from "next/link";
import { db } from "../server/db";
import { headers } from "next/headers";
import { SignedIn, SignInButton, SignedOut } from "@clerk/nextjs";
export const dynamic = "force-dynamic";

// const mockUrls: string[] = [
//   "https://utfs.io/f/382f6fd1-6a9b-4127-9f68-d0a33db37e34-208n3g.png",
//   "https://utfs.io/f/aad86054-52b8-44fd-956f-35df6e94e615-m32bgv.png",
//   "https://utfs.io/f/bf95c24c-909b-4560-9cef-a4e58caee61f-jy94ud.png",
//   "https://utfs.io/f/e375b132-e7b7-4959-8290-90401b1c9b0d-9ajt9i.png",
// ];
//
// const mockImages: { id: number; url: string }[] = [
//   ...mockUrls,
//   ...mockUrls,
//   ...mockUrls,
//   ...mockUrls,
// ].map((url, index) => ({
//   id: index + 1,
//   url,
// }));
//
export default async function HomePage() {
  headers();

  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="center">
      <SignedOut>
        PLZ LGN: <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className="flex flex-wrap gap-4">
          {images.map((image) => (
            <div key={image.id} className="w-48">
              <img src={image.url} alt={image.name} className="w-full" />
              <div>{image.name}</div>
            </div>
          ))}
        </div>
      </SignedIn>
    </main>
  );
}
