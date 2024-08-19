import { SplitText } from "@cyriacbr/react-split-text";
import { animated, useInView, useResize, useScroll, useSpring, useSprings, useTrail } from "@react-spring/web";
import { useCallback, useContext, useRef } from "react";
import { ScreenContext } from "../layout_1";
import SectionScroll from "./SectionScroll";
import { RisingText } from "./RisingText";
import { characterTitle, characterDesc, why } from "./Service";
import _ from 'lodash'


const scrolls= why.map(w=> new SectionScroll({
  actionOffset: {
    start: 0,
    end: 0
  },
  distanceOffset: {
    start: 0,
    end: 0
  }
}) )


export default function Main1_3_1 () {
  return (
    <div className="">
      <Parallax scrolls={scrolls[0]} service={why[0]}/>
      <Parallax scrolls={scrolls[1]} service={why[1]}/>
    </div>
  )
} 
function Parallax ({ scrolls, service }) {
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
      
      const progress= scrolls.getProgress()
      if( !progress ) return
      const height= scrolls?.position ? scrolls.position.containerDom.height : 0;
      trailApi.start({y: progress})
    }
  })

  scrolls.set({ 
    screen: screen,
    container: containerRef.current,
    distanceOffset: {
      start: -(screen.height.get() || windowSize?.height),
      end: 0
    },
  }) 


  
  

  const [trails, trailApi] = useTrail(
    12,
    () => ({
      from: { y: 0 },
      // to: { opacity: 1 },
    }),
    []
  )

  const motion = useCallback( (i)=> ({
    y: trails[i].y.to(progress=> {
      return `-${(1+(progress*200))}px`
      return `-${(1+(progress*250))}%`


      /* const y= calcCard(0,progress)
      if( !y ) return ''
      return `-${(1+y)*50}%`; */
    })
  }), [])
  
  let len=0
  return (
    <div 
      ref={containerRef} 
      className="bg-gray- h- flex w-full max-w-screen-1 m-auto my-52"
      
    >

      <div className="w-full max-w-container-md mx-auto ">
        {/* {
          why && why.map((service, key)=> {
            return ( */}
              <div className="md:flex flex-col md:flex-row relative w-full h- ">
                <section className='w-full md:w-1/2 '>
                  <div className="sticky top-nav bg-paper z-10 ">
                    <div className="text-2xl md:text-4xl font-extrabold uppercase"> 
                      {service.title}
                    </div>
                  </div>
                    
                </section>

                <div className="absolute top-[10%] left-0 md:relative md:top-auto w-full break-keep">
                {
                  service.list.map((list, i)=> {
                    len++
                    return (
                      <div key={i} className="mb-[10svh] w-full relative">
                        <animated.div 
                          // style={motion(0)} 
                        >
                          <div className="text-lg md:text-4xl leading-[1.4]">
                            {/* <RisingText text={list.name}/> */}
                            {list.subject}
                          </div>
                        </animated.div>
                        
                        <animated.div 
                          // style={motion(1)} 
                          className={`mt-10`}
                        >
                          {/* <RisingText text={list.desc} /> */}
                          {list.desc}
                        </animated.div>
                      </div>
                    )
                  })
                }
                </div>
                    
              </div>
            {/* )
          })
        } */}
        
      </div>

      
      
    </div>
  )
}


