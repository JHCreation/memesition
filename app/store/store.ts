import { useMediaQuery } from "react-responsive";
import { create } from "zustand";


// const isDesktopOrLaptop = useMediaQuery({
//   query: '(min-width: 1224px)'
// })

const mediaQueryDefault= {
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
}

export type MediaQuery= typeof mediaQueryDefault
export type MediaQuerySize= keyof MediaQuery
export interface MediaQueryState {
  mediaQuery: MediaQuery
  currentSize: MediaQuerySize
  setMediaQuery: (val:any)=> void
}
const mediaQuerySize= Object.keys(mediaQueryDefault) as MediaQuerySize[]
const reverse = [...mediaQuerySize].reverse();
export const useMediaQueryState= create<MediaQueryState>((set) => ({
  mediaQuery: mediaQueryDefault,
  size: mediaQuerySize,
  currentSize: 'xs',
  setMediaQuery: (val)=> set((state) => {
    const { mediaQuery, currentSize }= state
    const resMediaQuery= { ...mediaQuery, ...val }
    let current= currentSize
    reverse.some((size)=> {
      if( resMediaQuery[size] ) current= size
      return resMediaQuery[size]
    })
    return { 
      currentSize: current,
      mediaQuery: resMediaQuery
    }
  })
}));

