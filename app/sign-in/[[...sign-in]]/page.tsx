import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn appearance={{ variables: { colorPrimary: "#0F172A" } }} />
    </div>
  )
}