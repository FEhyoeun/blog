import { Activities } from '@shared/shared/types/activities';

export const activities: Activities[] = [
  {
    id: 1,
    category: 'Project',
    title: 'Portfolio Blog',
    description: 'Next.js와 Tailwind CSS로 구축한 개인 포트폴리오 블로그',
    skills: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Turborepo'],
    status: 'In Progress',
    teamSize: 1,
    role: 'All',
    githubURL: 'https://github.com/FEhyoeun/blog/tree/main/apps/client',
  },
  {
    id: 2,
    category: 'Project',
    title: 'Portfolio Blog Admin',
    description: '블로그를 관리하기 위한 관리자 페이지',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Turborepo'],
    status: 'In Progress',
    teamSize: 1,
    role: 'All',
    githubURL: 'https://github.com/FEhyoeun/blog/tree/main/apps/admin',
  },
  {
    id: 3,
    category: 'Project',
    title: 'MAVO - 내 목소리를 보여줘',
    description:
      '의사 표현이 어려운 장애 아동의 학습 의욕을 높이기 위한 소통 도구. TTS 기능과 카드 UI 구현',
    skills: ['React', 'TypeScript', 'Styled-components', 'Vite', 'Vercel'],
    status: 'Completed',
    teamSize: 5,
    role: 'Frontend & PM',
    githubURL: 'https://github.com/ourEzo/teoSprint',
    liveURL: 'https://mavo.vercel.app/profile',
  },

  {
    id: 4,
    category: 'Presentation',
    title: '주니어 탤런트 쇼 진행',
    description:
      '주니어들이 발언할 수 있는 팟캐스트 제작 및 진행, 주니어-시니어 개발자 소통 경험',
    skills: ['Podcast', 'Communication', 'Community', 'Leadership'],
    status: 'Completed',
    teamSize: 4,
    role: 'Host & Producer',
    articleURL:
      'https://velog.io/@june_summer/%EC%A3%BC%EB%8B%88%EC%96%B4-%ED%83%A4%EB%9F%B0%ED%8A%B8-%EC%87%BC-1%EA%B8%B0%EB%A5%BC-%EB%A7%88%EC%B9%98%EA%B3%A0',
  },
  {
    id: 5,
    category: 'Presentation',
    title: '소주콘 발표',
    description:
      '소문난 주니어 콘퍼런스 연사 참여, 취준생과 주니어 개발자의 고민 해결 방안 공유',
    skills: ['Public Speaking', 'Career Development', 'Mentoring'],
    status: 'Completed',
    role: 'Speaker',
    imageURLs: ['/images/소주콘.png'],
  },

  {
    id: 6,
    category: 'Study',
    title: '글또 7기',
    description:
      '글쓰는 개발자 모임 참여, 기술 블로그 작성 습관화 및 문제 해결 과정 기록',
    skills: ['Technical Writing', 'Blogging', 'Self-Development'],
    status: 'Completed',
    role: 'Member',
    articleURL:
      'https://velog.io/@june_summer/CDN-%ED%9B%91%EC%96%B4%EB%B3%B4%EA%B8%B0',
  },
  {
    id: 7,
    category: 'Study',
    title: '사내 스터디 진행',
    description:
      'Flitto 재직 중 사내 스터디 주도, 학습 내용을 실무에 적용한 경험',
    skills: ['Leadership', 'Knowledge Sharing', 'Team Building'],
    status: 'Completed',
    teamSize: 5,
    role: 'Member',
    imageURLs: ['/images/사내스터디1.png', '/images/사내스터디2.png'],
  },
  {
    id: 8,
    category: 'Study',
    title: 'Design Pattern 스터디',
    description:
      'EverEx 재직 중 JavaScript+React Design Pattern 서적 스터디 진행, 실무 리팩토링에 활용 예정',
    skills: ['Design Patterns', 'React', 'JavaScript', 'Refactoring'],
    status: 'In Progress',
    teamSize: 4,
    role: 'Member',
  },
];
