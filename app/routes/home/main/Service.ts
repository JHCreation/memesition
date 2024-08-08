
export const service= [
  {
    name: 'Design',
    tech: [
      '웹 디자인',
      'UI/UX',
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
    name: 'Web Develope',
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
    name: 'Marketing',
    tech: [
      'SNS 피드',
      '채널 광고',
      '인플루언서 협찬',
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
    desc: '기존에 없던 희소성이 짙은 새로움을 추구합니다. 새로운 디자인, 새로운 콘텐츠',
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