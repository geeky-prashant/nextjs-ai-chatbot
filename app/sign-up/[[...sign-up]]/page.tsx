import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '365Bot - Sign Up',
}

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp appearance={{ variables: { colorPrimary: "#0F172A" } }} />
    </div>
  )
}