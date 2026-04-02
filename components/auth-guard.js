/**
 * Auth guard for private pages.
 * Import and call checkAuth() at the top of any page that requires sign-in.
 * Redirects to /login/ if the user isn't authenticated.
 */
import { authClient } from '/lib/auth-client.js';

export async function checkAuth() {
  try {
    const { data: session } = await authClient.getSession();
    if (!session) {
      window.location.href = '/login/';
      return null;
    }
    return session;
  } catch {
    window.location.href = '/login/';
    return null;
  }
}
