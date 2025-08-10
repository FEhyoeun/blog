import Link from 'next/link';
import ExperienceCard from '@/app/about/components/ExperienceCard';
import { personalInfo, experiences, education, contact } from '@/mock/about';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About</h1>
        <p className="text-xl text-gray-600">
          저에 대해 좀 더 자세히 알아보세요
        </p>
      </div>

      <div className="space-y-12">
        {/* Personal Info */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">소개</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            {personalInfo.introduction.map((line, index) => (
              <p
                key={index}
                className={`text-gray-600 ${line === '' ? 'mb-4' : ''}`}
              >
                {line || ''}
              </p>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">경험</h2>
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              role={exp.role}
              companyName={exp.companyName}
              startDate={exp.startDate}
              endDate={exp.endDate}
            >
              <ul className="text-gray-600 space-y-2 list-disc ml-5">
                {exp.description.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </ExperienceCard>
          ))}
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">학력</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-600">{edu.school}</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {edu.period}
                  </span>
                </div>
                <p className="text-gray-600">{edu.status}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">연락처</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-600 mb-4">{contact.description}</p>
            <div className="flex flex-wrap gap-4">
              {contact.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
