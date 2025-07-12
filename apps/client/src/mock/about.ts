export const personalInfo = {
  introduction: [
    '안녕하세요! 사용자 중심의 웹 애플리케이션을 만드는 것을 좋아하는',
    '4년차 프론트엔드 개발자 김효은입니다.',
    '',
    'React와 TypeScript를 주로 사용하여 개발하며,',
    '사용자 경험을 개선하고 지속 가능한 코드를 작성하는 것에 관심이 많습니다.',
    '',
    '새로운 기술을 학습하고 경험을 공유하는 것을 즐기며,',
    '이 블로그를 통해 개발 과정에서 얻은 인사이트를 나누고 있습니다.',
  ],
};

export const experiences = [
  {
    role: 'Frontend Developer',
    companyName: 'EverEx',
    startDate: '2023-12',
    endDate: 'Now',
    description: [
      'AI 기반 의료기기 서비스에서 환자 관리, 운동 프로그램 처방, 실시간 모니터링 및 billing 시스템 개발',
      '25,000줄의 레거시 코드 리팩토링 및 JavaScript에서 TypeScript 마이그레이션',
      '전역 스토어 의존성 분리 및 episode flow 개선을 통한 코드 품질 향상',
      'Queue 기반 API 요청 관리로 토큰 만료 시 요청 누락 문제 해결',
      'dayjs를 활용한 다국가 타임존 지원 및 Jest 기반 테스트 환경 구축',
      '디자인 시스템 기반 공통 컴포넌트 개발 및 iframe을 통한 크로스 도메인 통신 구현',
      'Vue3, React18, TypeScript, Redux-toolkit, Tanstack Query 등 모던 기술 스택 활용',
    ],
  },
  {
    role: 'Frontend Developer',
    companyName: 'FLITTO',
    startDate: '2022-06',
    endDate: '2023-08',
    description: [
      '언어 데이터 및 번역 서비스 기업에서 메인 페이지 신규 개발 및 유지보수',
      'OAuth 로그인, 회원가입 시스템 구현 및 쿠키 기반 토큰 인증 개발',
      'Storybook을 활용한 공통 UI 컴포넌트 개발로 디자인 시스템 구축',
      'SEO 최적화 (사이트맵, hreflang) 및 GA4 도입을 통한 데이터 기반 분석 환경 구축',
      '유동형 그리드 시스템 제작으로 팀 내 개발 효율성 향상',
      'Vue2/3, Vuex, Pinia, Storybook, Webpack, Vite 등 모던 프론트엔드 기술 활용',
    ],
  },
  {
    role: 'Frontend Developer',
    companyName: 'Coinvest',
    startDate: '2021-08',
    endDate: '2022-05',
    description: [
      '핀테크 스타트업에서 Vue.js 기반 암호화폐 거래소 및 결제 서비스 개발',
      '실시간 채팅 시스템 구현 (Polling 방식으로 관리자-사용자 간 소통 기능)',
      '관리자 페이지 구축 및 사용자 경험 개선',
      'Vue2, Vuex, Webpack, SCSS를 활용한 모던 웹 애플리케이션 개발',
    ],
  },
];

export const education = [
  {
    degree: '컴퓨터과학과',
    school: '한국방송통신대학교',
    period: '2025.03 - 2027.02 (예정)',
    status: '졸업 예정',
  },
  {
    degree: 'SW 응용소프트웨어 과정',
    school: '교육과정',
    period: '2020.03 - 2020.09',
    status: '과정 이수',
  },
  {
    degree: '심리학과',
    school: '영남대학교',
    period: '2011.03 - 2015.08',
    status: '학사 졸업',
  },
];

export const contact = {
  description:
    '프로젝트 제안이나 협업에 관심이 있으시다면 언제든 연락해주세요!',
  links: [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/fehyoeun/',
      external: true,
    },
    {
      label: 'Email',
      url: 'mailto:khyoeun92@gmail.com',
      external: false,
    },
  ],
};
