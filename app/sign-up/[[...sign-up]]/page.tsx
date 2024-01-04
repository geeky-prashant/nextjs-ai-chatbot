import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp appearance={{ variables: { colorPrimary: "#0F172A" } }} />
    </div>
  )
}