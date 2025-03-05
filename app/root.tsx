import { MetaFunction } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwind from "./tailwind.css?url";
import PageTransitionWrapper from "./components/base/PageTransitionWrapper";

export const links: LinksFunction = () => [
  ...(tailwind ? [{ rel: "stylesheet", href: tailwind }] : []),
  {
    rel: "icon",
    href: "/favicon.ico",
    type: "image/x-icon",
  },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Runic&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap",
  },
];

export const meta: MetaFunction = () => [
  {
    title: "Norse Names",
  },
];

export default function Layout() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="overflow-hidden bg">
        <PageTransitionWrapper>
          <Outlet />
        </PageTransitionWrapper>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
