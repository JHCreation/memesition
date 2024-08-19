import { animated, useScroll, useSpring } from "@react-spring/web";
import { useContext, useRef } from "react";
import { ScreenContext } from "../layout_1";
import SectionScroll from "./SectionScroll";

const scrolls= new SectionScroll({
  actionOffset: {
    start: 0,
    end: 0
  },
  distanceOffset: {
    start: 0,
    end: 0
  },
  // print: true
})

const scrolls_1= new SectionScroll({})

const colorInterval= [0, .1, .3, .6, .7, 1]
const colorInterpolation= ['#6d0076', '#6d0076', '#ff8600',  '#0075c2', '#fafaf9', '#fafaf9']
export default function Main1_4 () {
  const {screen, windowSize} = useContext(ScreenContext)
  const scroll= useScroll({
    onChange:()=> {
      const progress= scrolls_1.getProgress()
      if( !progress ) return;

      scrolls_1.set({
        container: containerRef.current,
        distanceOffset: {
          start: -100,
          end: (-screen.height.get()*-1.5 || scrolls_1.get("distanceOffset").end)
        }
      })
      
      // const position_1= scrolls_1.getPosition()
      // if( !position_1 ) return;
      // const { progress: progress_1 }= position_1

      const progress_1= scrolls_1.getProgress()
      if( !progress_1 ) return;

      console.log(progress, progress_1)
      apiTitle.start({
        per: progress,
        per_1: progress_1
      })
    }
  })
  const [springTitle, apiTitle]= useSpring(() => ({
    from: { per: 0, per_1: 0 },
  }))
  

  const containerRef= useRef<HTMLDivElement>(null)
  scrolls.set({ 
    container: containerRef.current,
    distanceOffset: {
      start: -100,
      end: 0
    }
  }) 

  scrolls_1.set({ 
    container: containerRef.current,
    distanceOffset: {
      start: -100,
      end: -(screen.height.get()*-1.5 || windowSize?.height*-1.5),
    }
  }) 


  return (
    <div className="">
      <section ref={containerRef} className='h-[800lvh]'>
        <div className="sticky h-dvh top-0 flex items-center overflow-hidden pt-nav-m md:pt-nav">
          <div className="h-full max-h-svh w-full flex flex-col justify-between  ">
            <div className="font-[HSBombaram21-Regular] font-black leading-[1] text-[20px] md:text-[60px] uppercase italic">
              <h1 className="">We learn and grow</h1>
              <h1 className="">Win and celebrate together</h1>
            </div>
            <animated.div
              style={{
                scale: springTitle.per.to(progress=> {
                  const screenWidth= screen.width.get() || windowSize?.width
                  const def= 1950
                  const ratio= (screenWidth)/def
                  const varWidth= ratio < 0 ? 1 : ratio
                  return progress*(varWidth)*30
                }),
                opacity: springTitle.per.to(progress=> {
                  const value= progress*10 > 1 ? 1 : progress*10
                  return value
                }),
                color: springTitle.per_1.to(colorInterval, colorInterpolation)
              }}
              className={`whitespace-nowrap scale-0`}
            >
              <div className="flex items-center justify-center">
                <animated.h1 
                  // style={springTitle}
                  className="font-[GmarketSans] uppercase font-black text-[90px] leading-[1] mt-4"
                >corenzohouse</animated.h1>
              </div>
            </animated.div>
            <animated.div
              style={{
                x: springTitle.per.to(progress=> {
                  
                  return `${progress*100}%`
                }),
              }}
              className="font-[HSBombaram21-Regular] font-black leading-[1] text-[30px] md:text-[60px] uppercase italic">
              {/* <h1 className="">so we built</h1> */}
              <h1 className="">Let’s create</h1>
            </animated.div>
            <div className="absolute top-[50%] left-[13%] ">
              <animated.div 
                style={{
                  scale: springTitle.per.to(progress=> {
                    const screenWidth= screen.width.get() || windowSize?.width
                    const def= 1950
                    const ratio= (screenWidth)/def
                    const varWidth= ratio < 0 ? 1 : ratio
                    if( progress > .5 ) return (progress-.5)*(screenWidth/1000)*300
                    return ''
                  }),
                  opacity: springTitle.per.to(progress=> {
                    if( progress > .5 ) return 1;
                    return 0;
                  }),
                  skew: '-37deg',
                  backgroundColor: springTitle.per_1.to(colorInterval, colorInterpolation)
                }}
                className={'w-10 h-40  skew-x-[-37deg]'}
              >
                
              </animated.div>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}