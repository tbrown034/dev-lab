import { auth } from '../../lib/auth.js';
import { toNodeHandler } from 'better-auth/node';

const handler = toNodeHandler(auth);

export default async function (req, res) {
  return handler(req, res);
}
