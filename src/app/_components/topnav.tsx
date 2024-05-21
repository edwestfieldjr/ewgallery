// "use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";
import { SimpleUploadBtn } from "./simple-upload-btn";
import Link from "next/link"; //import this

function CustomSignInButton() {
  return (
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
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
