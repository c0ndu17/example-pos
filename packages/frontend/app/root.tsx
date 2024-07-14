import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/request";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export async function loader() {
  return json({
    ENV: {
      GRAPHQL_URI: process.env.GRAPHQL_URI,
      NODE_ENV: process.env.NODE_ENV,
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body className="size-full">
          {children}
          <ScrollRestoration />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
            }}
          />
          <Scripts />
        </body>
      </html>
    </QueryClientProvider>
  );
}
// Moved it out, because it causes some rehydration issues
// {typeof document !== "undefined" ? (
//   <ReactQueryDevtools initialIsOpen={false} />
// ) : null}

export default function App() {
  return <Outlet />;
}
