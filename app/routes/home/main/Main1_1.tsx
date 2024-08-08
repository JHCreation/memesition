import { SplitText } from "@cyriacbr/react-split-text";
import { animated, useInView, useSprings } from "@react-spring/web";
import { Rising, Rising2, RisingText, useRisingText } from "./RisingText";
import { service } from "./Service";
import { useRecoilValue } from "recoil";
import { useMediaQueryState } from "~/store/store";

const text= "웹/앱 개발 서비스를 제공합니다. 프론트엔드, 백엔드가 모두 가능한 풀스택 개발 서비스를 지원합니다. 10년차 경력의 개발 노하우를 바탕으로 트렌디하고 세련된 디자인의 웹사이트 제작이 가능하며, 합리적인 가격으로 커스터마이징 작업이 가능합니다. 우리의 단가가 오르기전에 기회를 놓치지 마세요 🤩"

const txt_1= "________________ 성공적인 비즈니스로 가야할 길은 멀고도 험난하죠. 웹사이트도 있어야 하죠. 명함도 필요합니다. 각종 인쇄물은 또 어찌나 많은지..."
const txt_2= "웹사이트도 있어야 하죠. 명함도 필요합니다. 각종 인쇄물은 또 어찌나 많은지..."
const txt_3= "비즈니스가 앞으로 나아가기 위해서는 많은 것들이 요구 됩니다. 많은 파트너들을 만나야 하는데 각 분야별로 전문가를 찾기란 쉽지 않습니다."

export default function Main1_1 () {
  const mediaQueryState= useMediaQueryState()
  const { mediaQuery }= mediaQueryState

  return (
    <section className='p-20 '>
      <div className="relative">
        <div className="flex items-center absolute top-0 left-0">
          <div className="text-xs font-bold leading-8">
            <RisingText text={'(Find Good Partner)'} startDelay={100} once={true}/>
          </div>
          <div className="overflow-hidden mr-1 relative left-[8.5em]">
            <Rising once={true}>
              <div className="w-7 font-extrabold ">
                <svg viewBox="0 0 510 510" xmlns="http://www.w3.org/2000/svg" id="fi_8068013"><g id="Layer_2" data-name="Layer 2"><g id="_02.number_1" data-name="02.number_1"><path id="background" d="m255 23a232.07 232.07 0 0 1 90.3 445.78 232.07 232.07 0 0 1 -180.6-427.56 230.57 230.57 0 0 1 90.3-18.22m0-23c-140.83 0-255 114.17-255 255 0 140.83 114.17 255 255 255 140.83 0 255-114.17 255-255 0-140.83-114.17-255-255-255z"></path><path d="m296.45 150v210h-48v-159.3l-37.2 10.2-11.7-41.1 54.9-19.8z"></path></g></g></svg>
              </div>
            </Rising>
          </div>
          
        </div>
        <div className="text-3xl font-bold leading-8 break-keep">
          <RisingText text={`${txt_1}${txt_2}${txt_3}`} startDelay={200} delay={100} once={true} />
        </div>
        {/* <div className="text-3xl font-bold leading-8">
          <RisingText text={txt_2} startDelay={300} delay={100} once={true} />
        </div>
        <div className="text-3xl font-bold leading-8">
          <RisingText text={txt_3} startDelay={400} delay={100} once={true} />
        </div> */}
      </div>


      <div className="mt-20 flex items-start justify-end">
        <div className="overflow-hidden mr-40">
          
            <div className="ml-auto w-full max-w-[256px] break-keep">
              <div className="overflow-hidden text-sm">
                <Rising2 once={true} startDelay={500}>
                  우리는 우리가 할 수있는 모든 서비스를 제공합니다. 비즈니스의 상황에 따라 A-Z까지 모든 서비스를 제공할 수는 없을 수도 있습니다. 범위를 벗어나 무리한 서비스를 제공하기보다는 가장 최선의 서비스를 제공하는데 더 힘을 쓰도록 노력할 것입니다. <br/><br/>
                </Rising2>
              </div>
              <div className="overflow-hidden text-sm font-bold">
                <Rising2 once={true} startDelay={600}>
                합리적인 비용으로 최고의 비즈니스 파트너를 만들어보세요!
                  <span className="text-"> 미마이즈</span>가 가장 최선의 <span className="text-">파트너</span>가 될 것입니다.
                </Rising2>
              </div>
          </div>
        </div>


        <ul className="text-sm border-b w-full max-w-[200px]">
          {
            service.map((service, i)=> <li key={service.name} className={`border-t px-1 py-1 overflow-hidden ${service.color.text}`}>
                <div className="before:content-[''] before:w-1.5 before:h-1.5 before:bg-black before:block before:rounded-md before:mr-2 flex items-center">
                  <Rising2 once={true} startDelay={(i+2)*100}>
                    {service.name}
                  </Rising2>
                </div>
            </li>)
          }
        </ul>

      </div>

    </section>
  )
}