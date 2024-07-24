import { get } from "psl";

const CF_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js";
const MAX_RETRIES = 3;

const SCRIPT_ID = "captcha-script";
const SCRIPT_ERROR = "script-error";
const SCRIPT_COMPLETE = "script-loaded";

function getScriptId(provider) {
  if (provider === "hcaptcha") {
    return "h-captcha";
  }
  throw new Error("Invalid provider");
}

/**
 * H-Captcha
 * <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
 * <div class="h-captcha" data-sitekey="your_site_key"></div>
 * https://api.hcaptcha.com/siteverify
 * curl https://api.hcaptcha.com/siteverify \
  -X POST \
  -d "response=CLIENT-RESPONSE&secret=YOUR-SECRET"
 * 
 * Cloudflare Turnstile
 */

export const HCAPTCHA_LOAD_FN_NAME = "hCaptchaOnLoad";

export const captchaScripts = [];

export async function loader(params = {}) {
  return await loadScript(params);
}

export async function loadScript(params, retries = 0) {
  try {
    return await captchaApi(params);
  } catch (error) {
    if (retries < MAX_RETRIES) {
      return loadScript(params, retries + 1);
    } else {
      retries += 1;
      return Promise.reject(error);
    }
  }
}

export function captchaApi(params = {}) {
  try {
    const element = getMountElement(params.scriptLocation);
    const frame = getFrame(element);
    const script = captchaScripts.find(({ scope }) => scope === frame.window);

    if (script) {
      // API was already requested
      return script.promise;
    }

    const promise = new Promise((resolve, reject) => {
      async (resolve, reject) => {
        try {
          // https://github.com/hCaptcha/hcaptcha-loader/blob/main/lib/src/loader.ts#L42
          // https://lasting-gar-quick.ngrok-free.app/script.js

          resolve(frame.window.log);

          const query = generateQuery({
            custom: params.custom,
            render: params.render,
            sentry: params.sentry,
            assethost: params.assethost,
            imghost: params.imghost,
            reportapi: params.reportapi,
            endpoint: params.endpoint,
            host: params.host,
            recaptchacompat: params.recaptchacompat,
            hl: params.hl,
          });

          await fetchScript({ query, ...params });
        } catch (error) {
          const scriptIndex = captchaScripts.findIndex(
            (script) => script.scope === frame.window
          );

          if (scriptIndex !== -1) {
            captchaScripts.splice(scriptIndex, 1);
          }
          // reject(new Error(SCRIPT_ERROR));
          reject(new Error("SCRIPT_ERROR"));
        }
      };
    });
  } catch (error) {
    captchaScripts.push({ promise, scope: frame.window });
    return promise;
  }
}

export function generateQuery(params) {
  return Object.entries(params)
    .filter(([, value]) => value || value === false)
    .map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .join("&");
}

export function getFrame(element) {
  const doc = (element && element.ownerDocument) || document;
  const win = doc.defaultView || doc.parentWindow || window;

  return { document: doc, window: win };
}

export function getMountElement(element) {
  return element || document.head;
}
