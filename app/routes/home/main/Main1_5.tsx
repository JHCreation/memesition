import { SplitText } from "@cyriacbr/react-split-text";
import { animated, useInView, useResize, useScroll, useSpring, useSprings } from "@react-spring/web";
import { useContext, useRef } from "react";
import { ScreenContext } from "../layout_1";
import SectionScroll from "./SectionScroll";
import { RisingText } from "./RisingText";

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

export default function Main1_5 () {
  const {screen, windowSize} = useContext(ScreenContext)
  const containerRef= useRef<HTMLDivElement>(null)
  
  const scroll= useScroll({
    onChange: (result, ctrl, item)=> {
      // console.log(screen.height.get(), windowSize, scrolls.get("distanceOffset").start)
      scrolls.set({
        distanceOffset: {
          start: (-screen.height.get() || scrolls.get("distanceOffset").start),
          // start: -600,
          end: 0,
          // end: scrolls.get('distanceOffset').end,
        },
      })
      const dom= containerRef.current?.getBoundingClientRect();
      if( !dom ) return
      const { height }= dom
      const progress= scrolls.event()
      console.log('main1-5', height, progress, result)
      apis.start((i, ctrl)=> (
        { 
          to: { y: `-${(progress*height)+(progress/((i+1)**5)*10)}px` },
          delay: (key)=> {
            if( key == 'y' ) return i*30;
            return 0
          }
        }
      ))





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
    action: function ({progress, containerDom}) {
      
      /* apis.start((i, ctrl)=> {
        return {
          to: {
            y: `-${progress*100*3}%`,
          },
          delay: key=> {
            if( key == 'y' ) return (i+1) * 150;
            return 0
          },
        }
      }) */
      return progress
    },
    // print: true
  }) 

  const [springs, apis]= useSprings(2, (i) => ({
    from: { y: '-10px' },
  }))

  const springProps = useSpring({
    transform: scrollYProgress.to(progress => `translateY(${1 + (progress*100)}px)`)
  });
  
  
  return (
    <div 
      ref={containerRef} 
      className="bg-white h-[300dvh] flex w-full max-w-screen-1 m-auto"
      
    >
      <section className=''>
        <div className="sticky top-nav">합리적인 가격</div>
      </section>

      <div className="flex" >
        <div className="">test</div>
        
        <div className="">
          <animated.div 
            style={springs[0]}
            /* style={{
              y: scrollY?.to(val=> {
                const progress= scrolls.event()
                const y= calcCard(0,progress)
                console.log('0', y)
                if( !y ) return ''
                return `${(1+y)*50}%`;
              })
            }} */
          >
            <div className="text-4xl leading-[1.4]">
              <RisingText text={'우리는 최고의 팀워크를 자랑합니다. spring-1'}/>
            </div>
          
          </animated.div>
          <animated.div 
            style={springs[1]}

            /* style={{
              y: scrollY?.to(val=> {
                const progress= scrolls.event()
                const y= calcCard(1,progress)
                console.log('1', y)
                if( !y ) return ''
                return `${(1+y)*50}%`;
              })
            }} */
          >
            <div className="text-4xl leading-[1.4]">
              <RisingText text={'우리는 최고의 팀워크를 자랑합니다.'} delay={500}/>
            </div>
          
          </animated.div>
        </div>
      </div>

      {/* <div className="bg-green-300 h-[500px] overflow-y-scroll"
        style={{
          perspective: '1rem',
          perspectiveOrigin: '0%'
        }}  
      >
        <div className="h-96 bg-red-200">
          

        </div>
        <div className="h-96 bg-red-200"></div>
        <div className="h-96 bg-red-200"></div>
        <div className="h-96 bg-red-200">

        
        </div>
        <div className="h-96 bg-red-200"></div>
        <div className="h-96 bg-red-200">
        

        </div>
        
        <div
         style={{
          perspective: '1rem',
          perspectiveOrigin: '0%'
         }}
        >
          <section className="text-3xl text-center bg-blue-200 "
            style={{ transform: `translateZ(-1rem) scale(2)` }}
          >hey test!</section>
        </div>
        <section className="text-3xl text-center bg-blue-200 "
          // style={{ transform: `translateZ(-1rem) scale(2)` }}  
        >hey test!</section>
        <div className="h-96 bg-red-200"></div>
        <div className="h-96 bg-red-200"></div>
        <div className="h-96 bg-red-200"></div>
        <div className="h-96 bg-red-200"></div>
        <div className="h-96 bg-red-200"></div>
        <div className="h-96 bg-red-200"></div>
        <div className="h-96 bg-red-200"></div>
        <div className="h-96 bg-red-200"></div>
        <div className="h-96 bg-red-200"></div>
      </div> */}
      
    </div>
  )
}


const calcCard= (key, progress)=> {
  const start= key/25
  // const end= (key+1)/10
  if( progress > start ) {
    const y= (progress-start)
    return ((y*12)**2)/2
  }
  return false
}