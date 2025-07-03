import Link from 'next/link';
import ExperienceCard from '@/app/about/components/ExperienceCard';

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
            <p className="text-gray-600">
              안녕하세요! 사용자 중심의 웹 애플리케이션을 만드는 것을 좋아하는
            </p>
            <p className="text-gray-600 mb-4">
              프론트엔드 개발자 김효은입니다.
            </p>

            <p className="text-gray-600">
              React와 TypeScript를 주로 사용하여 개발하며,
            </p>
            <p className="text-gray-600 mb-4">
              사용자 경험을 개선하고 지속 가능한 코드를 작성하는 것에 관심이
              많습니다.
            </p>
            <p className="text-gray-600">
              새로운 기술을 학습하고 경험을 공유하는 것을 즐기며,
            </p>
            <p className="text-gray-600">
              이 블로그를 통해 개발 과정에서 얻은 인사이트를 나누고 있습니다.
            </p>
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">경험</h2>
          <ExperienceCard
            role="Frontend Developer"
            companyName="EverEx"
            startDate="2023-12"
            endDate="Now"
          >
            <ul className="text-gray-600 space-y-2 list-disc ml-5">
              {/*todo: 내용 정리*/}
              <li>React와 TypeScript를 활용한 웹 애플리케이션 개발</li>
              <li>사용자 경험 개선을 위한 UI/UX 최적화</li>
              <li>컴포넌트 기반 아키텍처 설계 및 구현</li>
              <li>반응형 웹 디자인 및 크로스 브라우저 호환성 확보</li>
            </ul>
          </ExperienceCard>

          <ExperienceCard
            role="Frontend Developer"
            companyName="FLITTO"
            startDate="2022-06"
            endDate="2023-08"
          >
            <ul className="text-gray-600 space-y-2 list-disc ml-5">
              <li>React와 TypeScript를 활용한 웹 애플리케이션 개발</li>
              <li>사용자 경험 개선을 위한 UI/UX 최적화</li>
              <li>컴포넌트 기반 아키텍처 설계 및 구현</li>
              <li>반응형 웹 디자인 및 크로스 브라우저 호환성 확보</li>
            </ul>
          </ExperienceCard>

          <ExperienceCard
            role="Frontend Developer"
            companyName="Coinvest"
            startDate="2021-08"
            endDate="2022-05"
          >
            <ul className="text-gray-600 space-y-2 list-disc ml-5">
              <li>React와 TypeScript를 활용한 웹 애플리케이션 개발</li>
              <li>사용자 경험 개선을 위한 UI/UX 최적화</li>
              <li>컴포넌트 기반 아키텍처 설계 및 구현</li>
              <li>반응형 웹 디자인 및 크로스 브라우저 호환성 확보</li>
            </ul>
          </ExperienceCard>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">연락처</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-600 mb-4">
              프로젝트 제안이나 협업에 관심이 있으시다면 언제든 연락해주세요!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://www.linkedin.com/in/fehyoeun/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="mailto:khyoeun92@gmail.com"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Email
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
