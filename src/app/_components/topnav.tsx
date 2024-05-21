"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";
import Link from "next/link"; //import this

export function AuthSectionCustom() {
  const router = useRouter();
  return (
    <div className="flex">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={() => {
            router.refresh();
          }}
        />
        <UserButton />
      </SignedIn>
    </div>
  );
}

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4">
      <div className={``}>
        <Link href="/">G.A.L.L.E.R.Y.</Link>
      </div>
      <AuthSectionCustom />
    </nav>
  );
}
