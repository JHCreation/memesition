import { animated, useScroll, useSprings } from "@react-spring/web"
import { useContext, useRef } from "react"
import SectionScroll from "./SectionScroll"
import { ScreenContext } from "../layout_1"

const scrolls_1= new SectionScroll({})
const gap= (i)=> i*(i+2)
export default function Main1_7 () {
  const {screen, windowSize} = useContext(ScreenContext)
  const scroll= useScroll({
    /* onChange: (result, ctrl, item)=> {
      scrolls_1.event()
    } */
  })
  const { scrollY }= scroll;

  const [springsCard, apiCard]= useSprings(9, (i) => ({
    from: { y: `${gap(i)}px` },
  }))
  const container_1_Ref= useRef<HTMLDivElement>(null)
  scrolls_1.set({ 
    container: container_1_Ref.current,
    distanceOffset: {
      start: -(screen.height.get() || windowSize?.height)/2,
      // start: 0,
      end: 0
    },
    action: function ({progress, containerDom}, i) {
     return progress
    }
  }) 
  return (
    <section ref={container_1_Ref} className="h- bg-gray-">
      <div className=" top-nav pt-20 w-full ">
        <div className="relative h-[50dvh] overflow-hidden">
          {
            [...Array(6)].map((v,i)=> {
              return (
                <div 
                  key={i}
                  className="w-full relative overflow-hidden bg-white leading-[.9]" 
                  // style={{ transform: `translateY(${i*i*10/5}dvh)` }}
                  style={{ height: `${((i+1)*2)}dvh`}}
                >
                  <animated.div style={{
                    translateY: scrollY.to(val=> {
                      const progress= scrolls_1.event();''
                      const stack= (progress*10)-i;
                      const value= (stack*((i*i/3)+1))
                      return `${i == 5 ? 0 :(stack <= 0 ? 0 :value)}%`
                    }),
                  }} className={'w-full overflow-hidden'}>
                    <div className="relative aspect-square text-[100px] font-black">
                      MEMESITION
                    </div>
                  </animated.div>
                </div>

              )
            })
          }
        </div>
      </div>
    </section>
  )
}