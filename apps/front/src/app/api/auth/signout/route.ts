import { deleteSession } from "@/lib/sessions";
import { redirect } from "next/navigation";

export async function GET() {
  await deleteSession();
  redirect("/");
}
