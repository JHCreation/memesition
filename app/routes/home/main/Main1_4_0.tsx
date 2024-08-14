import { SplitText } from "@cyriacbr/react-split-text";
import { animated, useInView, useResize, useScroll, useSpring, useSprings } from "@react-spring/web";
import { useContext, useRef } from "react";
import { ScreenContext } from "../layout_1";
import SectionScroll from "./SectionScroll";
import { RisingText } from "./RisingText";

const text= "합리적인 가격"
const textLen= text.length;

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

export default function Main1_4_0 () {
  const {screen, windowSize} = useContext(ScreenContext)
  const containerRef= useRef<HTMLDivElement>(null)
  
  const scroll= useScroll({
    onChange: (result, ctrl, item)=> {
      scrolls.set({
        distanceOffset: {
          start: (-screen.height.get() || scrolls.get("distanceOffset").start),
          end: 0,
        },
      })
      const dom= containerRef.current?.getBoundingClientRect();
      if( !dom ) return
      const { height }= dom
      const progress= scrolls.event()
      apis.start((i, ctrl)=> (
        { 
          to: { y: `-${(progress*height)*.15 + (progress/((i+1)**0)*0)}px` },
          delay: (key)=> {
            if( key == 'y' ) return i*30;
            return 0
          }
        }
      ))
    }
  })

  scrolls.set({ 
    screen: screen,
    container: containerRef.current,
    distanceOffset: {
      start: -(screen.height.get() || windowSize?.height),
      // start: 0,
      end: 0
    },
    action: function ({progress, containerDom}) {
      return progress
    },
    // print: true
  }) 

  const [springs, apis]= useSprings(2, (i) => ({
    from: { y: '0px' },
  }))

  
  
  return (
    <div 
      ref={containerRef} 
      className="flex w-full max-w-screen-1 m-auto overflow-hidden"
    >

      <div className="flex w-full max-w-[800px] mx-auto pt-80 pb-40 px-10" >
        
        <div className="text-stroke-[0.001px] text-stroke-gray-500 text-stroke-fill-transparent">
          <animated.div 
            style={springs[0]}
          >
            <div className="font-[HSBombaram21-Regular] font-black text-[4em] leading-[1.1] text-center">
              <RisingText text={'We’re MEMESITION. We help organizations do incredible things together.'}/>
            </div>
          
          </animated.div>
          
        </div>
      </div>
      
    </div>
  )
}