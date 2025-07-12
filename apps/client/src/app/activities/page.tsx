'use client';

import { ActivitiesCategory } from '@shared/shared/types/activities';
import { activities } from '@/mock/activity';
import { useState } from 'react';

export default function ActivitiesPage() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const getCategoryIcon = (category: ActivitiesCategory) => {
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

  const handleCardClick = (activityId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
      } else {
        newSet.add(activityId);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Activities</h1>
        <p className="text-xl text-gray-600">
          개발 프로젝트, 발표, 스터디 등 다양한 활동들을 소개합니다
        </p>
      </div>

      <div className="space-y-8">
        {activities.map(activity => {
          const isFlipped = flippedCards.has(activity.id);

          return (
            <div
              key={activity.id}
              className="relative h-96 cursor-pointer"
              onClick={() => handleCardClick(activity.id)}
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
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-start gap-4 flex-1">
                      {activity.imageURLs && activity.imageURLs.length > 0 && (
                        <img
                          src={activity.imageURLs[0]}
                          alt={activity.title}
                          className="w-24 h-24 rounded-lg object-contain bg-gray-50 flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 break-keep mb-3">
                          {getCategoryIcon(activity.category)} {activity.title}
                        </h2>
                        <p className="text-gray-600 text-base leading-relaxed mb-4">
                          {activity.description}
                        </p>

                        {/* 앞면에 추가 정보 표시 */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            {activity.teamSize && (
                              <span className="flex items-center gap-1">
                                👥 {activity.teamSize}명
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              💼 {activity.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm flex-shrink-0 ${
                        activity.status === 'In Progress'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {activity.skills.slice(0, 6).map(skill => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {activity.skills.length > 6 && (
                      <span className="px-4 py-2 bg-gray-50 text-gray-500 rounded-full text-sm">
                        +{activity.skills.length - 6}
                      </span>
                    )}
                  </div>

                </div>

                {/* 뒷면 */}
                <div
                  className="absolute inset-0 w-full h-full bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow overflow-y-auto"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'transparent transparent',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.scrollbarColor =
                      '#d1d5db transparent';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.scrollbarColor =
                      'transparent transparent';
                  }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 break-keep">
                      {getCategoryIcon(activity.category)} {activity.title}
                    </h2>
                  </div>

                  {activity.imageURLs && activity.imageURLs.length > 0 && (
                    <div className="mb-6">
                      {activity.imageURLs.length === 1 ? (
                        <img
                          src={activity.imageURLs[0]}
                          alt={activity.title}
                          className="w-full h-72 rounded-lg object-contain"
                        />
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {activity.imageURLs
                            .slice(0, 4)
                            .map((imageUrl, index) => (
                              <img
                                key={index}
                                src={imageUrl}
                                alt={`${activity.title} ${index + 1}`}
                                className="w-full h-60 rounded-lg object-contain"
                              />
                            ))}
                        </div>
                      )}
                      {activity.imageURLs.length > 4 && (
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          +{activity.imageURLs.length - 4}개 더
                        </p>
                      )}
                    </div>
                  )}

                  <div className="space-y-5">
                    <div className="flex items-center gap-4 text-base text-gray-600">
                      {activity.teamSize && (
                        <span className="flex items-center gap-1">
                          👥 {activity.teamSize}명
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        💼 {activity.role}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {activity.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {(activity.githubURL ||
                      activity.liveURL ||
                      activity.articleURL) && (
                      <div className="flex flex-wrap gap-3">
                        {activity.githubURL && (
                          <a
                            href={activity.githubURL}
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
                        {activity.liveURL && (
                          <a
                            href={activity.liveURL}
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
                        {activity.articleURL && (
                          <a
                            href={activity.articleURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors flex items-center gap-1"
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
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                            아티클
                          </a>
                        )}
                      </div>
                    )}
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
