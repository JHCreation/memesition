import { SplitText } from "@cyriacbr/react-split-text";
import { animated, useInView, useResize, useScroll, useSprings } from "@react-spring/web";
import { useContext, useRef } from "react";
import { ScreenContext } from "../layout_1";
import SectionScroll from "./SectionScroll";
import _ from "lodash";
import { service } from "./Service";



const slideWidth= 400;
const slideWidthCss= `w-[400px] min-w-[400px]`
const slideDistance= slideWidth*(service.length);

const scrolls= new SectionScroll({
  actionOffset: {
    start: 0,
    end: 0
  },
  distanceOffset: {
    start: 0,
    end: 0
  }
})


export default function Main1_3 () {
  const {screen, windowSize} = useContext(ScreenContext)
  const scroll= useScroll()
  const { scrollY }= scroll;

  const containerRef= useRef<HTMLDivElement>(null)
  const sectRef= useRef<HTMLDivElement>(null)
  
  scrolls.set({ 
    screen: screen,
    container: containerRef.current,
    distanceOffset: {
      start: -windowSize?.height,
      end: -0
    },
  }) 

  
  return (
    <div>
      <section ref={containerRef} className=''
        style={{
          height: `${service.length*100}svh`
        }}
      >
        <div ref={sectRef} className="sticky min-h-[400px] h-dvh top-0 p-nav flex items-center overflow-hidden">
          <animated.div
            style={{
              translateX: scrollY.to(val=> {
                const screenHeight= screen.height;
                const sectDom= sectRef?.current?.getBoundingClientRect();
                if( !screenHeight || !sectDom ) return ''
                const { height: sectHeight }= sectDom;
                console.log(scrolls.get('distanceOffset').end, sectHeight)
                scrolls.set({
                  distanceOffset: {
                    start: -(screen.height.get() || windowSize?.height),
                    end: -sectHeight,
                    // end: scrolls.get('distanceOffset').end,
                  },
                })
                const progress= scrolls.getProgress();
                if( !progress ) return ''
                const width= screen.width.get() || windowSize?.width
                const moving= slideDistance-width+450;
                const res= -((progress) * (moving))
                return `${res > 0 ? 0 : (-res > moving ? -(moving) : res )}px`
                // return progress
              })
            }}
            className={`whitespace-nowrap ml-[400px]`}
          >
            <div className="flex">
            {
              service.map((service,i)=> {
                const { name, tech, color }= service;
                return <div key={i} className={`flex pr-10 ${slideWidthCss}`}>
                  <div className={`w-full border ${color} pt-6 pl-6 flex flex-col`}>
                    <div className={`font-[GmarketSans]  ${color.text} font-extralight text-3xl`}>{String(i+1).padStart(2, '0')}</div>
                    
                    <div className="text-2xl font-black">{name}</div>

                    
                    <div className="leading-4 text-xs flex-1 w-full flex flex-col justify-end">

                    <div className="mt-10">
                      <ul className="w-1/2 ml-auto">
                      {
                        tech.map(tech=> {
                          return (
                            <li key={tech} className="border-t px-1 py-0.5"> {tech} </li>
                          )
                        })
                      }
                      </ul>
                    </div>

                    </div>
                  </div>
                </div>
              })
            }
            </div>
          </animated.div>
        </div>
      </section>
    </div>
  )
}