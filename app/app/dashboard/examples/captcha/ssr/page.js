import Script from "next/script";
import { loader } from "./loader.js";

export default async function CaptchaFormPage() {
  return (
    <div>
      <h1>Captcha Form: SSR</h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
      </form>
      <Script onReady={`loader()`}></Script>
    </div>
  );
}
