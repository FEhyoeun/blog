function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-700 mb-8">대시보드</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h3 className="text-sm text-gray-500 mb-2">전체 포스트</h3>
          <p className="text-3xl font-bold text-slate-700">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h3 className="text-sm text-gray-500 mb-2">오늘 방문자</h3>
          <p className="text-3xl font-bold text-slate-700">42</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h3 className="text-sm text-gray-500 mb-2">이번 주 방문자</h3>
          <p className="text-3xl font-bold text-slate-700">287</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h3 className="text-sm text-gray-500 mb-2">전체 방문자</h3>
          <p className="text-3xl font-bold text-slate-700">1,234</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">최근 활동</h3>
        <ul className="space-y-3">
          <li className="py-2 border-b border-gray-100 last:border-b-0">
            새 포스트 "React 18 새 기능" 발행됨
          </li>
          <li className="py-2 border-b border-gray-100 last:border-b-0">
            댓글 5개가 승인 대기 중
          </li>
          <li className="py-2 border-b border-gray-100 last:border-b-0">
            방문자 100명이 "Next.js 가이드" 페이지 조회
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard