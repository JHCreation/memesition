interface SectScrollProp {
  scroll?: number 
  screen?: any
  /* {
    scrollX: number;
    scrollY: number;
    scrollXProgress: number;
    scrollYProgress: number;
  } */
  container: HTMLElement | null
  // containerDom: any
  // screenHeight: number
  actionOffset: {
    start: number
    end: number
  }
  distanceOffset: {
    start: number
    end: number
  }
  action: ({ 
    progress, containerDom
  }: { 
    progress: number,
    containerDom : any
  },
  prop?: any)=> any
  
  print?: boolean
}
type RequiredKey<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export default class SectionScroll {
  private screen: Partial<SectScrollProp>['screen']
  private container: Partial<SectScrollProp>['container']
  // private containerDom: SectScrollProp['containerDom']
  private actionOffset: SectScrollProp['actionOffset']
  private distanceOffset: SectScrollProp['distanceOffset']
  private action: SectScrollProp['action']
  private print: Partial<SectScrollProp>['print']
  
  constructor (prop:Partial<SectScrollProp>) {
    this.screen= prop.screen
    this.container= prop.container
    this.actionOffset={ start: 0, end: 0 }
    this.distanceOffset= { start: 0, end: 0 }
    this.action= ()=> ''
    this.print= prop.print || false
  }
  
  set= (prop:Partial<SectScrollProp>)=> {
    Object.keys(prop).map(key=> {
      this[key]= prop[key]
    })
  }

  get= (key:keyof SectScrollProp)=> {
    return this[key]
  }

  event= (prop?:any)=> {
    const containerDom= this.container?.getBoundingClientRect();
    // const containerDom= this.containerDom
    const offseTop= this.container?.offsetTop
    if( containerDom && offseTop ) {
      const { top, bottom, height, width }= containerDom;
      const offseBottom= offseTop + height
      const distance= height + -(this.distanceOffset.start) + this.distanceOffset.end;
      const distanceTop= top + this.distanceOffset.start
      const progress= -(distanceTop)/(distance);
      if( this.print ){
        console.log(
          ' top:', top, '\n',
          'distanceTop:', distanceTop, '\n',
          'bottom:', bottom, '\n',
          'height', height, '\n',
          'offseTop:', offseTop, '\n',
          'offseBottom:', offseBottom, '\n',
          'val:', scroll, '\n',
          'distance:', distance, '\n',
          'progress:', progress*100,'%'
        )
      }
      
      if( -distanceTop > this.actionOffset.start && 
        -(distanceTop) < distance + this.actionOffset.end ) {
        // console.log(progress)
        return this.action({progress, containerDom}, prop)
      }
      return ''
    }
    return ''
  }
}



export const sectScroll = ({ scroll, container, actionOffset, distanceOffset, action }: SectScrollProp)=> {
  const containerDom= container?.getBoundingClientRect();
  // const sectDom= sectRef?.current?.getBoundingClientRect();
  const offseTop= container?.offsetTop
  if( containerDom && offseTop ) {
    const { top, bottom, height, width }= containerDom;
    const offseBottom= offseTop + height
    const distance= height + -(distanceOffset.start) + distanceOffset.end;
    const distanceTop= top + distanceOffset.start
    const progress= -(distanceTop)/(distance);

    /* console.log(
      ' top:', top, '\n',
      'distanceTop:', distanceTop, '\n',
      'bottom:', bottom, '\n',
      'height', height, '\n',
      'offseTop:', offseTop, '\n',
      'offseBottom:', offseBottom, '\n',
      'val:', scroll, '\n',
      'distance:', distance, '\n',
      'progress:', progress*100,'%'
    ) */

    
    if( -distanceTop > actionOffset.start && 
      -(distanceTop) < distance + actionOffset.end ) {
                
      console.log(progress)
      
      /* return `${
        res > 0 ? 0 : 
          `calc(${-res > slideDistance-width ? -(slideDistance-width) : res }px - (10*2.5rem))`
        }` */
      // return progress
      return action({progress, containerDom})
    }
    return ''
  }
  return ''
}