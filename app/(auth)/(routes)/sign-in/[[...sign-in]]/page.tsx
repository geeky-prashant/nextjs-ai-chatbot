import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '365Bot - Sign In',
}

export default function SignInPage() {
  return <SignIn appearance={{ variables: { colorPrimary: "#0F172A" } }} />
}