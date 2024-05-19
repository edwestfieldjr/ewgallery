"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export function AuthSectionCustom() {
  const router = useRouter();
  return (
    <div>
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
      <div className={``}> G.A.L.L.E.R.Y.</div>
      <AuthSectionCustom />
    </nav>
  );
}
