// https://react.email/docs/introduction
import "server-only";
import { Resend } from "resend";
export { default as LoginMagicLink } from "./login-magic-link";
export const resend = new Resend(process.env.RESEND_API_KEY);
