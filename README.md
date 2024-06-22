## Index

- [Getting Started](#getting-started)
- [Database](#database)
- [Authentication](#authentication)
- [Error Reporting](#error-reporting)
- [Debugging](#debugging)
- [Email](#email)
- [UI](#ui)
- [Forms](#forms)
- [Misc](#misc)
- [Next Up](#next-up)

<a href="#getting-started"></a>

## Getting Started

```bash
npx degit manishrc/next-zero
```

```bash
npm i
```

```bash
npm run dev:all
```

- [App](http://localhost:3000)
- [Browse DB](https://localhost:3001)
- [Email](http://localhost:3002)

Add a cloudflare tunnel
https://one.dash.cloudflare.com/networks/tunnels and update the domain for `AUTH_URL` in .env.local

For ngrok, add

```
"tunnel": "ngrok http --domain=lasting-gar-quick.ngrok-free.app 3000 --log stdout --log-level warn",
```

## Development

Add shadcn ui components:

```bash
npx shadcn-ui@latest add button
```

<a href="#database"></a>

## Database

Data layer uses the [Drizzle ORM](https://orm.drizzle.team/docs), with [Neon DB](https://neon.tech/) using [Neon's Serverless Driver](https://neon.tech/docs/serverless/serverless-driver)

Add new tables by editing `~/db/schema.js`

If error: `permission denied for schema public`,
then execute the folllwing in psql: `GRANT CREATE ON SCHEMA public TO postgres;`

<a href="#authentication"></a>

## Authentication

Authentication uses auth.js

```
DROP TABLE "accounts";
DROP TABLE "sessions";
DROP TABLE "users";
DROP TABLE "verificationTokens";
```

### Remove existing tables

<a href="#error-reporting"></a>

## Error Reporting

```
npx @sentry/wizard@latest -i nextjs
```

<a href="#debugging"></a>

## Debugging

<a href="#email"></a>

## Email

<a href="#ui"></a>

## UI

- [Next Themes](https://github.com/pacocoursey/next-themes)
- Class Variant Authority
- Shad CN `npx shadcn-ui@latest add [component]`
- Tailwind
- CN
- radix-ui
- https://www.npmjs.com/package/react-textarea-autosize
- react-slot
- Notification: Sonner or Radix UI - React Toast
- Tweet Embed: [react-tweet](https://react-tweet.vercel.app/)
- YouTube Embed: [react-youtube](https://www.npmjs.com/package/react-youtube)
- RTE?
- React Grid/Table: [AG Grid](https://ag-grid.com/react-data-grid/getting-started/) or [Glide Data Table](https://grid.glideapps.com/)
- Highlight words: [react-highlight-words](https://www.npmjs.com/package/react-highlight-words) or [Rough Notion React](https://github.com/linkstrifer/react-rough-notation)
- CSV/Excel Import: [react-spreadsheet-import](https://github.com/UgnisSoftware/react-spreadsheet-import)
- Commander: [cmdk](https://www.npmjs.com/package/cmdk)
- Select: [React Select](https://react-select.com/)
- Draw Canvas: [TLDraw](https://tldraw.dev/) or [Excalidraw](https://excalidraw.com/)
- Diagram: [Mermaid](https://mermaid.js.org/)

<a href="#forms"></a>

## Forms

- [react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [zodResolver](https://www.npmjs.com/package/@hookform/resolvers)

- [ ] How to display server erros
- [ ] How to compose complex forms

<a href="#misc"></a>

## Misc

- Install [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- Domain name parsing: [psl](https://www.npmjs.com/package/psl)
- Short ID: [nanoid](https://www.npmjs.com/package/nanoid) + [nanoid-dictionary](https://www.npmjs.com/package/nanoid-dictionary).
  ```javascript
  import { customAlphabet } from "nanoid";
  import { nolookalikes } from "nanoid-dictionary";
  const nanoid = customAlphabet(nolookalikes, 12);
  ```
- Dates: [date-fns](https://github.com/date-fns/date-fns)
- Lodash [lodash-es](https://www.npmjs.com/package/lodash-es) + babel-plugin-transform-imports
- Number Formatting: [comma-number](https://www.npmjs.com/package/comma-number)
- Intersection Observer: [react-intersection-observer](https://www.npmjs.com/search?q=react-intersection-observer)?
- Image Size: [image-size](https://www.npmjs.com/package/image-size)?
- Background Jobs using [Inngest](https://inngest.com)
- Clean up HTML: [dompurify](https://www.npmjs.com/package/dompurify)?
- Copy to Clipboard: [copy-to-clipboard](https://www.npmjs.com/package/copy-to-clipboard)?
- MDX Remote: [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- Measurements: [react-use-measure](https://www.npmjs.com/package/react-use-measure)?
- Motion: [framer-motion](https://www.npmjs.com/package/framer-motion)?
- Debounce: [use-debounce](https://www.npmjs.com/package/use-debounce)?
- Unsplash Images: [unsplash-js](https://www.npmjs.com/package/unsplash-js)?
- Cookies: [js-cookie](https://www.npmjs.com/package/js-cookie)?
- Visualizations: [vizx](https://airbnb.io/visx/)?
- Slugs: [@sindresorhus/slugify](https://www.npmjs.com/package/@sindresorhus/slugify) or [github-slugger](https://github.com/Flet/github-slugger)
- OG Images: [@vercel/og](https://vercel.com/docs/functions/og-image-generation)
- Save file as: [FileSaver.js](https://github.com/eligrey/FileSaver.js)
- Hooks for browser APIs (geo, Mouse, Network, etc): [useHooks](https://github.com/uidotdev/usehooks)
- Viewport aware Tooltips, popovers, dialogs :[Floating UI](https://floating-ui.com/)
- Emojis: [emoji-mart](https://github.com/missive/emoji-mart)

  <a href="#next-up"></a>

## Next Up

- [ ] Fix dropbox auth: https://authjs.dev/guides/configuring-oauth-providers, https://authjs.dev/guides/configuring-oauth-providers#use-your-own-provider
