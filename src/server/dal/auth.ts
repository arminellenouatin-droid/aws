import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getServerSession() {
  const reqHeaders = await headers();
  return auth.api.getSession({
    headers: reqHeaders,
  });
}

export async function getCurrentUser() {
  const session = await getServerSession();
  return session?.user ?? null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("UNAUTHORIZED: Authentification requise");
  }
  return user;
}

export async function requireRole(allowedRoles: ("super_admin" | "admin" | "practitioner" | "client")[]) {
  const user = await requireAuth();
  const userRole = (user as any).role || "client";
  if (!allowedRoles.includes(userRole as any)) {
    throw new Error(`FORBIDDEN: Rôle insuffisant. Requis: ${allowedRoles.join(", ")}`);
  }
  return user;
}
