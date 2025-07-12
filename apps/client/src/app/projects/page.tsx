'use client';

import { ProjectCategory } from '@shared/shared/types/project';
import { projects } from '@/mock/project';
import { useState } from 'react';

export default function ProjectsPage() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const getCategoryIcon = (category: ProjectCategory) => {
    switch (category) {
      case 'Project':
        return '💻';
      case 'Study':
        return '📚';
      case 'Presentation':
        return '🎤';
      default:
        return '💻';
    }
  };

  const handleCardClick = (projectId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
        <p className="text-xl text-gray-600">
          진행했거나 진행 중인 프로젝트들을 소개합니다
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map(project => {
          const isFlipped = flippedCards.has(project.id);
          return (
            <div
              key={project.id}
              className="relative h-64 cursor-pointer"
              onClick={() => handleCardClick(project.id)}
            >
              <div
                className={`absolute inset-0 w-full h-full transition-transform duration-700 ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 앞면 */}
                <div
                  className="absolute inset-0 w-full h-full bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      {getCategoryIcon(project.category)} {project.title}
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

                  <p className="text-gray-600 mb-6 h-12 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.skills.slice(0, 4).map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 4 && (
                      <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-sm">
                        +{project.skills.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
                    클릭하여 더보기 →
                  </div>
                </div>

                {/* 뒷면 */}
                <div
                  className="absolute inset-0 w-full h-full bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-bold text-gray-900">
                      {getCategoryIcon(project.category)} {project.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        👥 {project.teamSize}명
                      </span>
                      <span className="flex items-center gap-1">
                        💼 {project.role}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {project.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {(project.githubURL || project.liveURL) && (
                      <div className="flex gap-2">
                        {project.githubURL && (
                          <a
                            href={project.githubURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors flex items-center gap-1"
                            onClick={e => e.stopPropagation()}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            GitHub
                          </a>
                        )}
                        {project.liveURL && (
                          <a
                            href={project.liveURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center gap-1"
                            onClick={e => e.stopPropagation()}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            Live Demo
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
                    ← 클릭하여 닫기
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
