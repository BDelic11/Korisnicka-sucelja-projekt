"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button asChild disabled={pending} type="submit" variant="default">
      {pending ? "Logging in..." : "Log in"}
    </Button>
  );
}
