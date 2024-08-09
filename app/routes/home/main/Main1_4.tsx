import { SplitText } from "@cyriacbr/react-split-text";
import { animated, useInView, useResize, useScroll, useSpring, useSprings } from "@react-spring/web";
import { useContext, useRef } from "react";
import { ScreenContext } from "../layout_1";
import SectionScroll from "./SectionScroll";


const slideWidth= 400;
const slideWidthCss= `w-[400px] min-w-[400px]`
const slideLen= 10;
const slideDistance= slideWidth*slideLen;

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


export default function Main1_4 () {
  const {screen, windowSize} = useContext(ScreenContext)
  const scroll= useScroll()
  const { scrollY }= scroll;

  const [spring, api]= useSpring(() => ({
    from: { x: '0' },
  }),
  [])
  

  const containerRef= useRef<HTMLDivElement>(null)
  const sectRef= useRef<HTMLDivElement>(null)
  scrolls.set({ 
    screen: screen,
    container: containerRef.current,
    distanceOffset: {
      start: 0,
      end: -0
    },
    action: ({progress, containerDom})=> {
      // const { top, bottom, height, width }= containerDom;
      const width= screen.width.get() || windowSize?.width
      const moving= slideDistance-width+450;
      const res= -((progress) * (moving))
      // return `${res > 0 ? 0 : (-res > moving ? -(moving) : res )}px`
      api.start({
        to: { x: `${(progress*100)}%`}
      })
      return progress
    }
  }) 
  // }

  
  return (
    <div className="bg-gray-600">
      <section ref={containerRef} className='h-[800lvh]'>
        <div ref={sectRef} className="sticky h-dvh top-0 flex items-center overflow-hidden pt-nav-m md:pt-nav">
          <div className="h-full max-h-svh w-full flex flex-col justify-between  ">
            <div className="font-[Pretendard] font-black leading-[1] text-[20px] md:text-[60px] uppercase">
              <h1 className="">so we built</h1>
              <h1 className="">web scrolling</h1>
            </div>
            <animated.div
              style={{
                scale: scrollY.to(val=> {
                  const progress= scrolls.event()
                  // if( progress > .5 ) return progress*100
                  return progress*30
                }),
                opacity: scrollY.to(val=> {
                  const progress= scrolls.event()
                  const value= progress*10 > 1 ? 1 : progress*10
                  // console.log(progress)
                  // if( progress > 0.1 ) return 1/progress
                  return value
                })
              }}
              className={`whitespace-nowrap scale-0`}
            >
              <div className="flex items-center justify-center text-white">
                <h1 className="font-[GmarketSans] uppercase font-black text-[90px] leading-[1] mt-6">corenzohouse</h1>
              </div>
            </animated.div>
            <animated.div
              style={spring}
              className="font-[Pretendard] font-black leading-[1] text-[30px] md:text-[60px] uppercase">
              <h1 className="">so we built</h1>
              <h1 className="">web scrolling</h1>
            </animated.div>
            <animated.div 
              style={{
                scale: scrollY.to(val=> {
                  const progress= scrolls.event()
                  // if( progress > .5 ) return progress*100
                  if( progress > .5 ) return (progress-.5)*300
                  return ''
                }),
                opacity: scrollY.to(val=> {
                  const progress= scrolls.event()
                  if( progress > .5 ) return 1;
                  return 0;
                }),
                skew: '-37deg'
              }}
              className={'absolute top-[50%] w-10 h-40 bg-white skew-x-[-37deg]'}
            >
              
            </animated.div>
          </div>
        </div>
      </section>


    </div>
  )
}