import type { MetaFunction } from "@remix-run/node";
import { ReactLenis, useLenis } from 'lenis/react'

import Layout from "./home/layout";
import Layout1 from "./home/layout_1";
import HomeWrapper from "~/components/nav/HomeWrapper";

export const meta: MetaFunction = () => {
  return [
    { title: "메메지션" },
    { name: "확실한 성공의 길을 제시합니다.", content: "메메지션과 함께 하세요!" },
  ];
};

export default function Index() {

  const lenis = useLenis(({ scroll }) => {
    // console.log(scroll)
    // called every scroll
  })
  console.log(lenis)

  return (
    <>
    <div className="fixed"></div>
    <ReactLenis root>
      <div className="fixed">fixed</div>
      <HomeWrapper>
        <Layout1/>
      </HomeWrapper>
    </ReactLenis>
    </>
  );
}
