import { Project } from '@shared/shared/types/project';

export const projects: Project[] = [
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
];
