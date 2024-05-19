import Link from "next/link";
import { headers } from "next/headers";
import { SignedIn, SignInButton, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="w-48">
          <img src={image.url} alt={image.name} />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  headers();

  return (
    <main className="center">
      <SignedOut>
        PLZ LGN: <SignInButton />
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
