"use client";
import { Button } from "./button";
import { deleteSession } from "@repo/ui/lib/session";
import { redirect } from "next/navigation";

export function LogoutButton() {
  return <button onClick={() => deleteSession()}>logout</button>;
}
