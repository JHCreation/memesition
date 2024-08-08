import { useState } from 'react'
import { useScroll, animated, useSprings, useInView } from '@react-spring/web'
import _ from 'lodash'

const fn= _.throttle((scrollYProgress, value)=> {
  console.log(scrollYProgress)
  value.start(scrollYProgress*100)
}, 500)

export default function Main3() {
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

      if(  scrollYProgress > .8 ) {
        setSticky(false)
      }
      if(  scrollYProgress < .9 ) {
        setSticky(true)
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
  /* const [ref, inView] = useInView({
    once: true
  }) */
  const [sticky, setSticky]= useState(true)
  return (
    <div
      className={`border-t border-black ${sticky ? 'sticky top-nav' : ''} `}
    >
      <div className="flex">
      
      <div className=""></div>
      </div>
      
      <animated.div 
        // style={{ rotateZ: value  }}
        style={values[0]}
      >
        Hello World
      </animated.div>
      {/* <section className='h-96'>
        <animated.div 
          // style={{ translateY: value  }}
          style={values[1]}
        >
          Hello World123
        </animated.div>
      </section> */}
      <section className='h-96'></section>
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
