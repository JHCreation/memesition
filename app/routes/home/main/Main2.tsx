import { useScroll, useSpring, animated, useSpringValue, useSprings, useInView } from '@react-spring/web'
import _ from 'lodash'
import { clamp } from '@react-spring/shared'
import { SplitText } from '@cyriacbr/react-split-text'

// import { ClientOnly } from "remix-utils/client-only";
// import { useHydrated } from "remix-utils/use-hydrated";


const fn= _.throttle((scrollYProgress, value)=> {
  console.log(scrollYProgress)
  value.start(scrollYProgress*100)
}, 500)



export default function Main2() {
  

  
  
  const { scrollYProgress } = useScroll({
    onChange: (result, ctrl, item)=> {
      const { value: { scrollYProgress } }= result
      // fn(scrollYProgress, value)
      // console.log(apis, result, ctrl, item, scrollYProgress)
      if( scrollYProgress > 0 ){
        apis.start((i)=>{
          if( i == 0 ) {
            return {
              to: {
                rotateZ: scrollYProgress*100,
                translateY: scrollYProgress*1000,
              }
            }
          }
  
          if( i == 1 ) {
            return {
              to: {
                translateY: -((scrollYProgress)*1000-100),
              }
            }
          }
          
        })

        // console.log(ref, spring)
        /* spring.start({
          to: { rotateZ: 180, translateY: 0 }
        }) */
      }
      
      // value.start(scrollYProgress*100)
      /* value.start({
        rotateZ: 0,
        translateY: 0,
      }) */
      
      // console.log(result, ctrl, item)
    }
  })
  console.log(scrollYProgress)
  /* const value= useSpringValue(0, {
    
    config: {
      mass: 5,
      friction: 12,
      tension: 180,
      // duration: 100
    },
  }) */

    

    const [ref, spring] = useInView(
      () => ({
        from: { rotateZ: 0, translateY: 0 },
        // to: { rotateZ: 180, translateY: 0 },
        // to: { opacity: 1 },
      }),
    )

    const [values, apis] = useSprings(2,
      (i) => {
        if( i == 0 ) {
          return {
            from: { rotateZ: 90, translateY: 0 },
            // to: { opacity: 1 },
          }
        }
        if( i == 1 ) {
          return {
            // from: { rotateZ: 0, translateY: 0 },
            from: { translateY: 100  },
            // translateY: 100
            // pause: true
            // reset: true
            
          }
        }
        return {}
        /* return  {
          from: { rotateZ: 0, translateY: 0 },
          // to: { opacity: 1 },
        } */
      },
      []
    )

    
  /* const [value, api]= useSpring({
    rotateZ: 0,
    translateY: 0,
    config: {
      mass: 5,
      friction: 12,
      tension: 180,
      // duration: 100
    },
  }) */
  /* const [riseRef, riseInView] = useInView(
    () => ({
      from: { y: '100%' },
      to: { y: '0%' },
      // from: { rotate: 90 },
      // to: { rotate: 0 },
      // from: { y: 100 },
      // to: { y: 0 },
      
    }),
    {
      // once: true,
    }
  ) */
    // const [riseRef, riseInView] = useInView();
    

  return (
    <div  className=" border-t border-black">
      <div className="flex">
        <div className="w-1/2 border-r border-black">

        </div>
        <div className="">test</div>
      </div>
      
      <SplitText {...({ children: "Hello World1111111111111" } as any)} />
      

      
      
      <animated.div 
        // style={{ rotateZ: value  }}
        style={values[0]}
      >
        Hello World
      </animated.div>
      <section className='h-96'>
        <animated.div 
          // style={{ translateY: value  }}
          style={values[1]}
        >
          Hello World123
        </animated.div>
      </section>
      <section className='h-96'>
        <animated.p className="overflow-hidden">
          <span className="inline-block text-3xl">
          Design Education Series is a new format of an original mini-series on the main principles of design, where we share all insights gained during our experience at Obys Agency. Typography Principles, Colors Combinations, Grids are the titles of the first three seasons of the series.
          </span>
        </animated.p>
      </section>
      <section className='h-96'></section>

      <section className='h-96 border border-blue-700'>
        <animated.div 
          // style={{ translateY: value  }}
          ref={ref}
          style={spring}
        >
          In Views
        </animated.div>
      </section>

      <section className='h-96'></section>


      
    </div>
  )
}
