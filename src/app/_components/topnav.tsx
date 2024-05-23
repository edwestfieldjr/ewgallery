// "use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";
import { SimpleUploadBtn } from "./simple-upload-btn";
import { UserSVG } from "~/components/ui/icons";
import Link from "next/link"; //import this

function CustomSignInButton() {
  return (
    <button title="Sign In">
      <UserSVG />
    </button>
  );
}

export function AuthSectionCustom() {
  // const router = useRouter();
  return (
    <div className="flex flex-row items-center gap-4">
      <SignedOut>
        <SignInButton>
          <CustomSignInButton />
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <SimpleUploadBtn />
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
