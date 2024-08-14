import { SplitText } from "@cyriacbr/react-split-text";
import { animated, useInView, useResize, useScroll, useSpring, useSprings, useTrail } from "@react-spring/web";
import { useCallback, useContext, useRef } from "react";
import { ScreenContext } from "../layout_1";
import SectionScroll from "./SectionScroll";
import { RisingText } from "./RisingText";
import { characterTitle, characterDesc } from "./Service";
import _ from 'lodash'



// const text= "합리적인 가격"
// const textLen= text.length;

/* const calcCard= (key, progress)=> {
  const start= key/25
  // const end= (key+1)/10
  if( progress > start ) {
    const y= (progress-start)
    return ((y*12)**2)/2
  }
  return false
} */


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




export default function Main1_5 () {
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
      
      
      // api.start({per: progress})
      trailApi.start({y: progress})
    }
  })
  const { scrollY, scrollYProgress }= scroll;

  scrolls.set({ 
    screen: screen,
    container: containerRef.current,
    distanceOffset: {
      start: -(screen.height.get() || windowSize?.height),
      end: 0
    },
  }) 

  // const [spring, api]= useSpring(()=> ({
  //   from: { per: 0 }
  // }))

  
  

  const [trails, trailApi] = useTrail(
    2,
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
      className="bg-gray- h-[300lvh] flex w-full max-w-screen-1 m-auto my-52"
      
    >

      <div className="w-full max-w-container-md mx-auto ">
        <div className="flex">
          <section className='w-1/2 '>
          {
            characterTitle.map((service, key)=> {
              return (
                
                <div className="h-[150lvh]">
                  <div className="sticky top-nav ">
                    <span className="text-4xl uppercase">{service.title}</span>
                  </div>
                </div>

                
              )
            })
          }
          </section>

          <div className="">
          {
            characterDesc.map((list, i)=> {
              len++
              console.log(len)
              return (
                <div className="mb-[30svh]">
                  <animated.div style={motion(0)} >
                    <div className="text-4xl leading-[1.4]">
                      <RisingText text={list.name}/>
                    </div>
                  </animated.div>
                    
                  <animated.div style={motion(1)} >
                    <RisingText text={list.desc} />
                  </animated.div>
                </div>
              )
            })
          }
          </div>
              
        </div>
      </div>

      
      
    </div>
  )
}


