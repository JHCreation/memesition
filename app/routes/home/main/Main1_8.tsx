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
      const start= screen.height.get() || scrolls?.get('distanceOffset').start
      const end= screen.height.get() || scrolls?.get('distanceOffset').end
      console.log(screen.height.get(), windowSize?.height)
      scrolls.set({ 
        container: containerRef.current,
        distanceOffset: {
          start: screen.height.get() ? -(screen.height.get())/2 : scrolls?.get('distanceOffset').start,
          end: screen.height.get() ? -(screen.height.get()) : scrolls?.get('distanceOffset').end,
        },
        print: true
      }) 
      
      const progress= scrolls.getProgress()
      console.log(progress)
      if( !progress ) return;
      
      api.start({ per: progress})
    }
  })


  const containerRef= useRef<HTMLDivElement>(null)
  scrolls.set({ 
    scroll,
    container: containerRef.current,
    distanceOffset: {
      start: -(screen.height.get() || windowSize?.height)/2,
      end: -(screen.height.get() || windowSize?.height)
    },
    
  }) 
  const [spring, api]= useSpring( ()=> ({ per: 0 }) )
  return (
    <footer className=" h-dvh bg-stone-50 z-0">
      <div ref={containerRef} className="h-[200dvh] relative top-[-100dvh]">
        <div className="h-dvh-nav sticky top-nav p-16">
          
          <animated.div 
            className="flex "
            style={{
              y: spring.per.to( progress => {
                console.log(progress)
                const val= (1-progress)*100
                return `-${val <= 0 ?  0 : val}%`
              })
            }}
          >
            <div className="w-1/3 ">
              <div className="w-full pr-20">
                <div className="border-b px-2 py-1 ">
                  Social Media :
                </div>
                <div className="flex flex-col">
                  {
                    ['about','portfolio','contact'].map((v,i)=> {
                      return <LinkText_2 key={v} className='flex-1 px-2 py-1 border-b last:border-none'>
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

            <div className="w-2/3">
              <div className="border-b px-2 py-1 ">
                Menu :
              </div>
              <ul className="">
                <li className="text-[20svh] leading-none border-b">
                  Home
                </li>
                <li className="text-[20svh] leading-none border-b">
                  About
                </li>
                <li className="text-[20svh] leading-none border-b">
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