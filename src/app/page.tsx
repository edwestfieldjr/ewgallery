import Link from "next/link";
import { headers } from "next/headers";
import { SignedIn, SignInButton, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="w-48">
          <Image
            src={image.url}
            style={{ objectFit: "contain" }}
            fill
            alt={image.name}
          />
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
