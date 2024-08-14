import { SplitText } from "@cyriacbr/react-split-text";
import { animated, useInView, useResize, useScroll, useSpring, useSprings, useTransition } from "@react-spring/web";
import { useContext, useRef, useState } from "react";
import { ScreenContext } from "../layout_1";
import SectionScroll from "./SectionScroll";
import { RisingText } from "./RisingText";
import banner_1 from "/images/13102.jpg";

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

export default function Main1_3_0 () {
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
      apis.start((i, ctrl)=> {
        const moveY_1= `-${(progress*height)*.15 + (progress/((i+1)**0)*0)}px`;
        const moveY_2= `${(progress*height)*.15 + (progress/((i+1)**2)*0)}px`;
        return (
          { 
            to: { y: i==0 ? moveY_1 : moveY_2 },
            delay: (key)=> {
              if( key == 'y' ) return i*30;
              return 0
            }
          }
        )}
      )
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

  
  const [isOpen, setIsOpen]= useState(false)
  const springs_1= useSprings(2, [{ test: isOpen ? 100 : 0}, { test: isOpen ? 300 : 0}] )
  const spring= useSpring({ test: isOpen ? 1000 : 0} )

  return (
    <div 
      ref={containerRef} 
      className="flex w-full max-w-screen-1 m-auto overflow-hidden"
    >
      {/* <div className="btn" onClick={e=>setIsOpen(!isOpen)}>start</div>
      <animated.div style={{x: springs_1[0].test}}>test</animated.div> */}

      <div className="flex w-full max-w-[1200px] mx-auto pt-80 pb-40 px-10" >
        
        <div className="w-1/2">
          <animated.div 
            style={springs[0]}
          >
            <div className="font-[HSBombaram21-Regular] font-black text-[3em] leading-[1.1] text-left">
              <RisingText text={'We’re MEMESITION. We help organizations do incredible things together.'}/>
            </div>
          
          </animated.div>
          
        </div>

        <div className="w-1/2 flex justify-center relative -top-24">
          <div className="overflow-hidden w-full max-w-[400px] relative">
            <div className="aspect-[1/1.5]">
            <animated.div
              style={springs[1]}
              className={`absolute top-0 left-0 w-full h-full`}
            >
              <img src={banner_1} alt="" className="h-full object-cover" />
            </animated.div>
            </div>
          </div>
        </div>
      </div>

      {/* <MyComponent /> */}

      
    </div>
  )
}


function MyComponent({ data = [1, 2, 3] }) {
  const [transitions, api] = useTransition(data, () => ({
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
  }))

  return <>
  <div className="btn" onClick={e=> api.start()}>click</div>
  {transitions((style, item) => (
    <animated.div style={style}>{item}</animated.div>
  ))}
  </>
}