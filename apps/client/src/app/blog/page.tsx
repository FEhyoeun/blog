export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600">
          개발 경험과 학습 내용을 공유합니다
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            첫 번째 블로그 포스트
          </h2>
          <p className="text-gray-600 mb-4">
            블로그를 시작하며 앞으로 공유하고 싶은 내용들에 대해 이야기합니다.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">2024.01.01</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              일반
            </span>
          </div>
        </div>

        <div className="text-center py-12">
          <p className="text-gray-500">더 많은 포스트가 곧 추가됩니다.</p>
        </div>
      </div>
    </div>
  );
}
