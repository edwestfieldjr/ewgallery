import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function AuthSectionCustom() {
  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
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
