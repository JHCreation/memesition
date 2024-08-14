
export const service= [
  {
    name: 'Design',
    tech: [
      '웹 디자인',
      'UI/UX 디자인',
      '그래픽 디자인',
      'Photoshop',
      'Illustrator',
    ],
    description: '',
    color: {
      text: 'text-primary',
      border: 'border-primary',
    }
  },
  {
    name: 'Web Development',
    tech: [
      '웹앱 개발',
      'Frontend',
      'Backend',
      'React',
      'Python',
      'Node.js',
      'PHP',
    ],
    description: '',
    color: {
      text: 'text-secondary',
      border: 'border-secondary',
    }
  },
  {
    name: 'Media',
    tech: [
      '영상 촬영',
      '영상 편집',
      '자막 편집',
      '숏폼 제작',
    ],
    description: '',
    color: {
      text: 'text-accent',
      border: 'border-accent',
    }
  },
  {
    name: 'Strategy',
    tech: [
      'Branding',
      '전략/기획',
      'SNS Marketing',
      '채널 광고',
    ],
    description: '',
    color: {
      text: 'text-success',
      border: 'border-success',
    }
  },
  {
    name: 'Place/Promotion',
    tech: [
      '공간 디자인',
      '판촉물',
      '프로모션 기획',
      'Product Display',
    ],
    description: '',
    color: {
      text: 'text-success',
      border: 'border-success',
    }
  },
  {
    name: 'Writing',
    tech: [
      '콘텐츠 구성 기획',
      '카피문구 제작',
      '콘텐츠 작문',
    ],
    description: '',
    color: {
      text: 'text-error',
      border: 'border-error',
    }
  },
]


import banner_1 from "/images/13102.jpg";
import banner_2 from "/images/48.jpg";
import banner_3 from "/images/1042.jpg";


export const howto= [
  {
    title: 'Creative',
    subject: ['Design', 'Web Develope', 'Writing'],
    desc: '기존에 없던 희소성이 짙은 새로움을 추구합니다. 새로운 디자인, 새로운 콘텐츠, 새로운 기술들을 통한 창의적인 결과물을 만들어 냅니다. 고객의 니즈를 반영해 트렌디하고 새로운 창작물을 만드는데 최선을 다 할 것입니다. ',
    image: banner_1,
    color: {
      bg: 'bg-primary'
    }
  },
  {
    title: 'Technology',
    subject: ['Design', 'Web Develope', 'Media'],
    desc: '비즈니스에 걸맞는 최신의 기술을 사용합니다. 디자인 툴과 기술들, 프로그래밍 언어와 프레임 워크들, 촬영 장비와 편집 기술들 ',
    image: banner_2,
    color: {
      bg: 'bg-secondary'
    }
  },
  {
    title: 'Customize',
    desc: '비즈니스에 맞는 ',
    image: banner_3,
    color: {
      bg: 'bg-secondary'
    }
  }
]


export const characterTitle= [
  {
    title: 'differentiated service',
  },
  {
    title: 'reasonable price',
  }
]

export const characterDesc= [
      
  { 
    name: '남다른 경쟁력',
    desc: '비즈니스 환경을 고려한 프로세스를 구현합니다.'
  },
  { 
    name: '독창적 창의성',
    desc: '새롭고 감각적인 디자인을 제공합니다.'
  },
  { 
    name: '트렌디한 감성',
    desc: '대중이 공감할수 있는 트렌드를 반영합니다.'
  },
  { 
    name: '커스터마이징',
    desc: '환경과 특성에 맞는 구성과 방법을 제안드립니다.'
  },
  { 
    name: '차별화된 서비스',
    desc: '비즈니스에 가장 적합한 최고의 결과물을 제공할 것입니다.'
  },
  { 
    name: '비즈니스의 성격',
    desc: '모든 비즈니스가 최상의 결과물을 필요로 하진 않습니다.'
  },
  { 
    name: '제한된 예산',
    desc: '정해진 예산안에서 성격에 맞는 결과물을 만들고 싶죠.'
  },
  { 
    name: '빠른 결과물',
    desc: '보다 합리적인 가격을 유지하기 위해 빠른 처리과정이 필요합니다.'
  },
]



import character_1 from "/images/na.svg";
import character_2 from "/images/ce.svg";
import character_3 from "/images/sh.svg";
import character_4 from "/images/s.svg";
import character_5 from "/images/h.svg";
import character_6 from "/images/rr.svg";
import character_7 from "/images/jh.svg";

export const characters= [
  {
    name: '나용',
    img: character_1,
    title: service[0].name,
    subject: service[0].tech,
    desc: '',
  },
  {
    name: '찬의',
    img: character_2,
    title: service[2].name,
    subject: service[2].tech,
    desc: '',
  },
  {
    name: '승훈',
    img: character_3,
    title: service[3].name,
    subject: service[3].tech,
    desc: '',
  },
  {
    name: '선행',
    img: character_4,
    title: 'Singer',
    subject: ['미용','소찬휘','막말','비난', '욕설', '패드립'],
    desc: '',
  },
  {
    name: '라리',
    img: character_6,
    title: service[4].name,
    subject: service[4].tech,
    desc: '',
  },
  {
    name: '은지',
    img: character_5,
    title: 'Dance',
    subject: ['맘마미아', '소원을 말해봐', 'Step'],
    desc: '',
  },
  {
    name: 'JH',
    img: character_7,
    title: service[1].name,
    subject: service[1].tech,
    desc: '',
  },
  
]