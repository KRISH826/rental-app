"use client"
import { Button } from "@/components/ui/button";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Home() {
  const { signOut } = useAuthenticator((context) => [context.user])
  return (
    <div>
      <h1>Home</h1>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}
