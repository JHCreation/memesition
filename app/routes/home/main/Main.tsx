
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useScroll, animated, useInView, useTrail, a, useResize, useSprings } from '@react-spring/web'
import _ from 'lodash'
import { LinkText_1, LinkText_2, LinkText_3 } from '~/components/ui/LinkText'
import Main1_2 from './Main1_2'
import Main1_3 from './Main1_3'
import Main1_4 from './Main1_4'
import Main1_5 from './Main1_5'
import { ScreenContext } from '../layout_1'
import Main1_6 from './Main1_6'
import Main1_7 from './Main1_7'
import Main1_1 from './Main1_1'
import LinkArrow from '~/components/ui/LinkArrow'
import { MediaQuery, MediaQuerySize, useMediaQueryState } from '~/store/store'

const fn= _.throttle((scrollYProgress, value)=> {
  console.log(scrollYProgress)
  value.start(scrollYProgress*100)
}, 500)



const motion= {
  height: {
    xs: 20, sm: 80, md: 80, lg: 110
  }
}
const Trail: React.FC<{ open: boolean, mediaQuery: MediaQuerySize, children: React.ReactNode }> = ({ open, children, mediaQuery }) => {
  const items = React.Children.toArray(children)
  console.log(items, mediaQuery)
  const trail = useTrail(items.length, ({
    config: { mass: 5, tension: 200, friction: 200, duration: 500 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? (motion.height[mediaQuery] || 110) : 0,
    from: { opacity: 0, x: 20, height: 0 },
    delay: 300,

  }))
  return (
    <div>
      {trail.map((prop, index) => {
        console.log(index,prop)
        const { height, ...style }= prop
        return <a.div key={index} className={'relative w-full h-[57px] lg:h-[80px] leading-[60px] md:leading-[60px] lg:leading-[86px] text-black text-[4em] md:text-[4em] lg:text-[5.7em] font-extrabold tracking-[-0.05em] will-change-[transform,opacity] overflow-hidden '} style={style}>
          <a.div 
            style={{ height }} 
            className={'pr-[0.5em] overflow-hidden'}
          >{items[index]}</a.div>
        </a.div>
      })}
    </div>
  )
}


const TestSpring = ({ on, mediaQuery })=> {
  useEffect(()=> {
    api.start(i=> ({
      to: { x: on ? 200 : 0 },
      delay: i*100
    }) )
  }, [on])

  const [spring, api]= useSprings(2, i=> ({
    from: { x: 0 },
    // to: { x: on ? 200 : 0 }
  }))
  const trail = useTrail(2, {
    config: { mass: 5, tension: 200, friction: 200, duration: 400 },
    opacity: on ? 1 : 0,
    x: on ? 0 : (mediaQuery == 'lg' ? 500: 20),
    height: on ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
    delay: 400,
  })

  return (
    <div>
      <animated.div style={{x: trail[0]['x']}} className="">
      {/* <animated.div style={spring[0]} className=""> */}
        TestSpringTestSpringTestSpringTestSpring
      </animated.div>
      <animated.div style={{x: trail[1]['x']}} className="">
      {/* <animated.div style={spring[1]} className=""> */}
        TestSpringTestSpringTestSpringTestSpring
      </animated.div>
    </div>
  )
}


export default function Main() {

  const mediaQueryState= useMediaQueryState()
  const { mediaQuery, currentSize }= mediaQueryState
  console.log(currentSize)
  const {screen, windowSize} = useContext(ScreenContext)

  
  
  const resize = useResize({})


  const [on, setOn]= useState(false)
  return (
    
    <div className="mt-nav-m md:mt-nav border-t">
      <div className="flex flex-col md:flex-row h-full border-b">
        
        <div className={`h-[calc(100vh+100px)] flex items-start w-full md:w-1/2 top-0 py-5 px-20`}>
          <div className={`pt-nav-m md:pt-nav sticky top-0 z-50`} >
            <Trail open={true} mediaQuery={currentSize}>
              <span>우리의</span>
              <span>
                <span className='text-primary'>다</span>
                <span className='text-secondary'>양</span>
                <span className='text-accent'>한</span>
              </span>
              <span>서비스를</span>
              <span>소개합니다</span>
            </Trail>
          </div>
        </div>

        


        <div className="w-1/2 border-l">

          {/* <TestSpring on={on} mediaQuery={currentSize}/>
          <button className="btn" onClick={e=> setOn(!on)}>시작</button> */}

          <div className="">
            <div className="border-b px-2 py-1">
              memyzee :
            </div>
            <div className="text-xs ml-0 p-2">
              미마이즈는 다양한 서비스를 제공합니다. 기업이 성장할 수 있는 업무와 서비스들을 지원 해드립니다. 
            </div>
          </div>

          <div className="py-60">
            <div className="text-xs w-full max-w-64 ml-auto p-2">
              미마이즈는 다양한 서비스를 제공합니다. 기업이 성장할 수 있는 업무와 서비스들을 지원 해드립니다. 
            </div>
            <div className="text-xs w-full max-w-64 ml-auto p-2">
              미마이즈는 다양한 서비스를 제공합니다. 기업이 성장할 수 있는 업무와 서비스들을 지원 해드립니다. 
            </div>
          </div>

          <div className="w-1/2 ml-auto ">
            <div className="border-b px-2 py-1">
              we are :
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

        
        
      </div>

      <Main1_1/>
      <Main1_3 />
      <Main1_2/>
      <Main1_4 />
      <Main1_5 />
      <Main1_6 />
      <Main1_7 />
      <div className="h-96"></div>
    </div>
  )
}

