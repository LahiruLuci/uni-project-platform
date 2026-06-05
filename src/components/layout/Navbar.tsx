import { getCurrentPlatformUser } from "@/lib/auth/current-user";
import { NavbarClient } from "./NavbarClient";

export async function Navbar() {
  const user = await getCurrentPlatformUser();

  return <NavbarClient user={user} />;
}
