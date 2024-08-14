import { animated, useScroll, useSpring, useSprings } from "@react-spring/web"
import { useContext, useRef } from "react"
import SectionScroll from "./SectionScroll"
import { ScreenContext } from "../layout_1"
import { characters } from "./Service"

const scrolls= new SectionScroll({})


// const arr= [...Array(9)]
const len= characters.length;
export default function Main1_6 () {
  const {screen, windowSize} = useContext(ScreenContext)
  const scroll= useScroll({
    onChange: (result, ctrl, item)=> {
      // scrolls.event()
      const progress= scrolls.getProgress()
      if( !progress ) return
      // api.start({per: progress})
      apiCard.start((i, ctrl)=> {
        if( progress > (i+.2)/(len+2) ){
          return {
            to: {
              x: `0%`, y: `0%`,
            },
          }
        }
        if( progress < (i+.2)/(len+2) ){
          return {
            to: {
              x: `120%`, y: `120%`,
            },
          }
        }
      })
    }
  })
  const { scrollY }= scroll;

  const [spring, api]= useSpring(()=> ({ from: { per: 0 } }))


  const [springsCard, apiCard]= useSprings(len, (i) => ({
    from: { x: '120%', y: '120%' },
  }))
  const container_1_Ref= useRef<HTMLDivElement>(null)
  const itemRef= useRef<HTMLDivElement>(null)
  scrolls.set({ 
    container: container_1_Ref.current,
    distanceOffset: {
      // start: -(screen.height.get() || windowSize?.height),
      start: 0,
      end: 0
    },
    
  }) 
  return (
    <section 
      ref={container_1_Ref} 
      className="bg-paper relative z-10"
      style={{ height: `${(len)*100}lvh`}}
    >
      <div className="sticky top-0 h-dvh pt-nav  w-full  overflow-hidden">
        <div className="h-full p-10 relative">
          <div className="h-full relative">
          {/* {
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
          } */}

          {
            characters.map((val,i)=> {
              const dom= container_1_Ref.current?.getBoundingClientRect()
              const screenHeight= screen.height.get() || windowSize?.height
              const item= itemRef.current?.getBoundingClientRect()

              return (
                <animated.div key={i} style={springsCard[i]}>
                  <div 
                    ref={itemRef}
                    className="absolute text-white bg-gray-800 bg-opacity-40 backdrop-blur-sm" 
                    style={{ 
                      width: `${30}%`,
                      
                      top: `calc( (100dvh - 5rem - 70px - ${item?.height}px) / ${len} * ${i})`, 
                      // left: i*(dom && item ? (dom?.width)/len : 0) 
                      left: `calc( (100vw - 5rem - ${item?.width}px) / ${len-1} * ${i})`
                    }}
                  >
                    <div className="relative aspect-square p-5 flex">
                      <div className="flex flex-col w-full">
                        <div className="flex items-end ">
                          <div className="w-full max-w-[130px]">
                            <img src={val.img} alt="" />
                          </div>
                          <p className="font-[] text-4xl font-black ml-4">{val.name}</p>
                        </div>
                        <div className="flex-1 flex flex-col justify-end">
                          <div className="mt-5">
                            <p className="font-black text-stone-200">
                              {val.title}
                            </p>
                          </div>
                          <ul className="text-xs mt-5 border-t border-white w-full max-w-[200px]">
                          {
                            val.subject.map(tech=> <li className="border-b border-white">{tech}</li>)
                          }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </animated.div>
              )
            })
          }
          </div>
        </div>
      </div>
      
    </section>
  )
}