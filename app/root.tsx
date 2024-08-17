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
import dotenv from "dotenv";
import path from "path";
import { MetaFunction } from "@remix-run/node";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from "react";
import AnimatedCursor from "react-animated-cursor"
import { useMediaQuery } from "react-responsive";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { useMediaQueryState } from "./store/store";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Remix",
        url: "https://remix.run",
      },
    },
  ];
};

export async function loader() {
  const env = process.env.NODE_ENV;
  // console.log(env, 'url', process.env.PUBLIC_API_URL)
  dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}.local`) });
  dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
  dotenv.config(); // 기본 .env 파일
  return json({
    ENV: {
      SOME_SECRET: process.env.SOME_SECRET,
      PUBLIC_API_URL: process.env.PUBLIC_API_URL,
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const mediaQuery= useMediaQueryState()
  const xs = useMediaQuery({ minWidth: 0 })
  const sm = useMediaQuery({ minWidth: 480 })
  const md = useMediaQuery({ minWidth: 860 })
  const lg = useMediaQuery({ minWidth: 1224 })
  const xl = useMediaQuery({ minWidth: 2200 })

  useEffect(()=> {
    console.log('mediaQuery::',xs, sm, md, lg, xl)
    mediaQuery.setMediaQuery({ xs, sm, md, lg, xl })
  }, [xs, sm, md, lg, xl])
  
  const env = useLoaderData<typeof loader>();
  // console.log(mediaQuery, env, 'envenv')

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        
      <html lang="en" data-theme="fantasy" className="">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          {/* <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossrigin> */}
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Josefin+Sans:wght@100&display=swap" rel="stylesheet"></link>
        </head>
        <body >
          {children}
          <AnimatedCursor 
            innerSize={10}
            outerSize={25}
            color='255,255,255'
            outerAlpha={1}
            innerScale={1}
            outerScale={2}
            clickables={[
              'a',
              'input[type="text"]',
              'input[type="email"]',
              'input[type="number"]',
              'input[type="submit"]',
              'input[type="image"]',
              'label[for]',
              'select',
              'textarea',
              'button',
              '.links',
              {
                target: '.custom',
                // innerScale: 2,
                // outerScale: 4,
              }
            ] as any}
            outerStyle={{
              mixBlendMode: 'exclusion'
            }}
          />
          <ScrollRestoration />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(
                env.ENV
              )}`,
            }}
          />
          <Scripts />
        </body>
      </html>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default function App() {
  return <Outlet />;
}
