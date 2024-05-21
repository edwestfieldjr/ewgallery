import Link from "next/link";
import { headers } from "next/headers";
import { SignedIn, SignInButton, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Image from "next/image";

export const dynamic = "force-dynamic";

// const repeatArray = <T extends { idx: number }>(
//   arr: Partial<T>[],
//   repeater: number,
// ): Partial<T>[] => {
//   return Array.from({ length: repeater }, (_, repeatIndex) =>
//     arr.map((e, i) => {
//       // Create a new object with the modified id
//       const newItem = {
//         ...e,
//         idx: repeatIndex * arr.length + i,
//       };
//       console.log(repeatIndex, arr.length, i);
//       return newItem;
//     }),
//   ).flat();
// };

async function Images() {
  const images = await getMyImages();

  // const repeatedImages = repeatArray(images, 12);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="flex h-48 w-48 flex-col">
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              style={{ objectFit: "contain" }}
              width={480}
              height={480}
              alt={image.name}
            />
          </Link>
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
