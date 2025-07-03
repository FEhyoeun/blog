export default function ProjectsPage() {
  const projects = [
    {
      title: 'Portfolio Blog',
      description: 'Next.js와 Tailwind CSS로 구축한 개인 포트폴리오 블로그',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      status: 'In Progress',
    },
    {
      title: 'React Dashboard',
      description: '사용자 친화적인 대시보드 애플리케이션',
      tech: ['React', 'TypeScript', 'Chart.js'],
      status: 'Planned',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
        <p className="text-xl text-gray-600">
          진행했거나 진행 중인 프로젝트들을 소개합니다
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {project.title}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  project.status === 'In Progress'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {project.status}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
