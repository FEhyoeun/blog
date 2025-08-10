export default function Home() {
  const technicalSkills = [
    'React',
    'TypeScript',
    'Next.js',
    'JavaScript',
    'Vue',
    'Nuxt',
    'Redux Toolkit',
    'Vuex',
    'Pinia',
    'HTML/CSS',
    'SCSS',
    'Styled-components',
    'Tailwind CSS',
    'Webpack',
    'Vite',
    'Jest',
    'Git',
  ];

  const softSkills = [
    '코드 리뷰',
    '문서화',
    '팀 협업 프로세스 정립',
    '프로세스 개선',
    '문제 해결',
    '커뮤니케이션',
    '애자일/스크럼',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-4xl animate-wave">👋</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            안녕하세요, 효은입니다
          </h1>
          <p className="text-xl text-gray-600 mb-2 max-w-2xl mx-auto">
            사용자 중심의 웹 애플리케이션을 만드는 Frontend Developer입니다.
          </p>
          <p className="text-lg text-gray-500 mb-6 max-w-2xl mx-auto">
            {`Hello, I'm Hyoeun, a Frontend Developer who creates user-centered
            web applications.`}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/about"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Tech Stack & Career
            </a>
            <a
              href="/activities"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              활동 보기
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Skills & Technologies
        </h2>

        {/* Technical Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Technical Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technicalSkills.map(skill => (
              <span
                key={skill}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Soft Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {softSkills.map(skill => (
              <span
                key={skill}
                className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
