import Link from "next/link";
import { headers } from "next/headers";
import { SignedIn, SignInButton, SignedOut } from "@clerk/nextjs";
import { Images } from "~/app/_components/images";

export const dynamic = "force-dynamic";

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
