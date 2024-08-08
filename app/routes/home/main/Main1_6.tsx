import { animated, useScroll, useSprings } from "@react-spring/web"
import { useContext, useRef } from "react"
import SectionScroll from "./SectionScroll"
import { ScreenContext } from "../layout_1"

const scrolls_1= new SectionScroll({})

export default function Main1_6 () {
  const {screen, windowSize} = useContext(ScreenContext)
  const scroll= useScroll({
    onChange: (result, ctrl, item)=> {
      scrolls_1.event()
    }
  })
  const { scrollY }= scroll;

  const [springsCard, apiCard]= useSprings(9, (i) => ({
    from: { x: '100%', y: '100%' },
  }))
  const container_1_Ref= useRef<HTMLDivElement>(null)
  scrolls_1.set({ 
    container: container_1_Ref.current,
    distanceOffset: {
      // start: -(screen.height.get() || windowSize?.height),
      start: 0,
      end: 0
    },
    action: function ({progress, containerDom}, i) {
      apiCard.start((i, ctrl)=> {
        if( progress > (i+.2)/(9+2) ){
          return {
            to: {
              x: `0%`, y: `0%`,
            },
          }
        }
        if( progress < (i+.2)/(9+2) ){
          return {
            to: {
              x: `100%`, y: `100%`,
            },
          }
        }
      })
    }
  }) 
  return (
    <section ref={container_1_Ref} className="h-[1000dvh] bg-gray-600">
      <div className="sticky top-nav w-full ">
        <div className="h-dvh overflow-hidden">
          {
            [...Array(9)].map((v,i)=> {
              const dom= container_1_Ref.current?.getBoundingClientRect()
              return (
                <animated.div key={i} style={springsCard[i]}>
                  <div 
                    className="w-[25%] absolute border border-black bg-white bg-opacity-80 backdrop-blur-sm" 
                    style={{ top: `${i*50/9}dvh`, left: i*(dom ? dom?.width/11 : 0) }}
                  >
                    <div className="relative aspect-square">
                    {i}
                    </div>
                  </div>
                </animated.div>
              )
            })
          }
        </div>
      </div>
      
    </section>
  )
}