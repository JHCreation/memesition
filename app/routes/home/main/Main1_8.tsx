import { animated, useScroll, useSpring, useSprings } from "@react-spring/web"
import { useContext, useRef } from "react"
import SectionScroll from "./SectionScroll"
import { ScreenContext } from "../layout_1"
import { LinkText_2 } from "~/components/ui/LinkText"
import LinkArrow from "~/components/ui/LinkArrow"

const scrolls= new SectionScroll({})
export default function Main1_8 () {
  const {screen, windowSize} = useContext(ScreenContext)
  const scroll= useScroll({
    onChange: (result, ctrl, item)=> {
      scrolls.set({ 
        container: containerRef.current,
        distanceOffset: {
          start: screen.height.get() ? -(screen.height.get())/2 : scrolls?.get('distanceOffset').start,
          end: screen.height.get() ? -(screen.height.get()) : scrolls?.get('distanceOffset').end,
        },
        // print: true
      }) 
      
      const progress= scrolls.getProgress()
      if( !progress ) return;
      api.start({ per: progress})
    }
  })


  const [spring, api]= useSpring( ()=> ({ per: 0 }) )
  const containerRef= useRef<HTMLDivElement>(null)
  scrolls.set({ 
    scroll,
    container: containerRef.current,
    distanceOffset: {
      start: -(screen.height.get() || windowSize?.height)/2,
      end: -(screen.height.get() || windowSize?.height)
    },
    
  }) 
  return (
    <footer className="relative h-dvh bg-stone-50 z-0">
      <div ref={containerRef} className="h-[200dvh] relative top-[-100dvh]">
        <div className="h-dvh-nav sticky top-nav w-full p-4 md:p-16 flex items-center justify-center">
          
          <animated.div 
            className="md:flex w-full max-w-container"
            style={{
              y: spring.per.to( progress => {
                const val= (1-progress)*100
                return `-${val <= 0 ?  0 : val}%`
              })
            }}
          >
            <div className="w-full md:w-1/3 ">
              <div className="w-full pr-20">
                <div className="border-b px-2 py-1 ">
                  Social Media :
                </div>
                <div className="flex flex-col">
                  {
                    ['Instagram','Email','contact'].map((v,i)=> {
                      return <LinkText_2 key={v} className='flex-1 px-2 py-1 border-b'>
                      <div className="relative flex items-center justify-between group-hover:text-accent group-hover:px-2 duration-200 ">
                        {v}
                        <div className="w-3 ">
                          <LinkArrow className='group-hover:fill-accent relative duration-200'/>
                        </div>
                      </div>
                    </LinkText_2>
                    })
                  }
                
                
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <div className="border-b px-2 py-1 ">
                Menu :
              </div>
              <ul className="text-4xl md:text-[20svh] leading-none">
                <li className="border-b">
                  Home
                </li>
                <li className="border-b">
                  About
                </li>
                <li className="border-b">
                  Contact
                </li>
              </ul>
            </div>
          </animated.div>
        </div>
       
      </div>
    </footer>
  )
}