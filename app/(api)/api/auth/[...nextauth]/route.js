import { handlers } from '@/auth';
// export const runtime = 'edge'; // nodemailer not compatible with workers
export const dynamic = 'force-dynamic';
export const { GET, POST } = handlers;
