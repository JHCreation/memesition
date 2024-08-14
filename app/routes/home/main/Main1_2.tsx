import { animated, useScroll } from "@react-spring/web";
import React, { useContext, useRef } from "react";
import SectionScroll from "./SectionScroll";
import { ScreenContext } from "../layout_1";
import { howto } from "./Service";
import { RisingText } from "./RisingText";

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

const colors= [
  {key: 'pink', style: `bg-pink-500`},
  {key: 'orange', style: `bg-orange-500`},
  {key: 'green', style: `bg-green-500`},
  {key: 'blue', style: `bg-blue-500`},
]
const len= howto.length

const calcCard= (key, progress)=> {
  const start= key/len
  const end= (key+1)/len
  if( progress > start && progress < end ) {
    const y= (progress-start)/(end-start)
    return y
  }
  return false
}
export default function Main1_2 () {
  const {screen, windowSize} = useContext(ScreenContext)
  const scroll = useScroll({
    config: {
      mass: 0,
      friction: 0,
      tension: 0,
      // duration: 1000,
    },
    /* onChange: (result, ctrl, item)=> {
      const { value: { scrollYProgress } }= result

    } */
  })
  const { scrollY } = scroll
  

  const containerRef= useRef<HTMLDivElement>(null)
  const sectRef= useRef<HTMLDivElement>(null)
  const topRef= useRef<HTMLDivElement[]>([])

  // const sectRef= useRef<HTMLDivElement>(null)

  scrolls.set({ 
    screen: screen,
    container: containerRef.current,
    /* distanceOffset: {
      start: -windowSize?.height,
      end: -0
    }, */
    action: ({progress, containerDom})=> {
      return progress
    }
  }) 

  
  
  return (
    <div ref={containerRef} className="">
      {
        howto.map((val,key)=> {
          return (
            <React.Fragment key={key}>
              <div ref={el=> topRef.current[key]= el as HTMLDivElement } className=""></div>
              <animated.div 
                // ref={el=> sectRef.current[key]= el as HTMLDivElement}
                className={`h-[90svh] sticky top-nav w-full bg-stone-50 overflow-hidden`}>

                <animated.div 
                  className={`h-full w-full border  z-0`}
                  style={{
                    opacity: scrollY.to(val => {
                      const progress= scrolls.event()
                      const y= calcCard(key, progress)
                      if( !y || key == len-1 ) return 1
                      return 1-y < .5 ? .5 : 1-y
                    }),
                    scale: scrollY.to(val => {
                      const progress= scrolls.event()
                      const y= calcCard(key, progress)
                      if( !y || key == len-1 ) return ''
                      const value= 1-(y*.16)+.02
                      return value < .92 ? .92 : (value > 1 ? 1 : value)
                    }),
                  }}
                >
                  <div className="flex flex-row px-8 py-5">
                    <div className="flex flex-col ">
                      <div className="flex flex-nowrap gap-1">
                        {
                          val?.subject && val.subject.map((sub)=> {
                            return (
                              <div key={sub} className="border border-gray-400 text-xs rounded-full  px-3 py-1 text-nowrap">{sub}</div>
                            )
                          })
                        }
                      </div>
                      <div className="text-center text-[3em] uppercase text-black leading-none font-medium mt-2">{val.title}</div>
                    </div>

                    <div className=" w-full flex justify-center">
                      <div className="w-full leading-snug max-w-[700px] relative text-left py-3 text-md text-black font-medium break-keep ">
                        {/* <RisingText text={`${val.desc}`} startDelay={0} delay={0} once={true} /> */}
                        {val.desc}
                      </div>
                    </div>
                  </div>
                  {/* <animated.div
                  className={'bg-orange-400 w-full h-full'}
                  style={{
                    clipPath: scrollYProgress.to(
                    val => `circle(${val * 100}%)`),
                    opacity: scrollYProgress.to([0, 1], [1, 0])
                  }}></animated.div> */}
                  <div className={`relative ${val.color} bg-black bg-opacity-55 overflow-hidden`}>
                    
                    <img 
                      /* style={{
                        y: scrollY.to(val => {
                          // const dom= containerRef.current?.getBoundingClientRect();
                          // if( !dom ) return ''
                          // const { height }= dom
                          
                          const progress= scrolls.event()
                          const y= calcCard(key, progress)
                          if( !y ) return ''
                          // return `-${(progress*height)+(progress/((1)**5)*10)}px`
                          return `-${y*100}%`
                        })
                      }} */
                      src={val.image} 
                      className="w-full h-full object-cover opacity-50" 
                    />

                    {/* <div className="absolute top-0 left-0 w-full p-10 flex justify-center">
                      <div className="w-full leading-tight max-w-[700px] relative text-center text-sm text-white font-thin break-keep">
                        <RisingText text={`${val.desc}`} startDelay={0} delay={0} once={true} />
                      </div>
                    </div> */}
                    
                    
                  </div>
                </animated.div>

                <animated.div 
                  style={{
                    opacity: scrollY.to(val => {
                      // const dom= containerRef.current?.getBoundingClientRect();
                      // if( !dom ) return ''
                      // const { height }= dom
                      
                      const progress= scrolls.event()
                      const y= calcCard(key, progress)
                      if( !y || key == len-1 ) return 0
                      // return `-${(progress*height)+(progress/((1)**5)*10)}px`
                      const value= y-.1
                      return value < 0 ? 0 : (value > 1 ? 1 : value)
                    })
                  }}
                  className="pointer-events-none opacity-0 absolute top-0 left-0 right-0 bottom-0 bg-black"
                ></animated.div>

              </animated.div>
            </React.Fragment>
          )
        })
      }
    </div>
  )
}