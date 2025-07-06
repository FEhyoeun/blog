import { useState } from "react";
interface VisitorData {
  date: string;
  visitors: number;
  pageViews: number;
  topPages: string[];
}

function Analytics() {
  const [timeRange, setTimeRange] = useState("7days");

  const mockData: VisitorData[] = [
    {
      date: "2024-01-15",
      visitors: 45,
      pageViews: 123,
      topPages: ["/blog/react-18", "/about", "/projects"],
    },
    {
      date: "2024-01-14",
      visitors: 38,
      pageViews: 89,
      topPages: ["/blog/nextjs-guide", "/blog/react-18", "/"],
    },
    {
      date: "2024-01-13",
      visitors: 52,
      pageViews: 156,
      topPages: ["/", "/blog/typescript", "/about"],
    },
    {
      date: "2024-01-12",
      visitors: 41,
      pageViews: 98,
      topPages: ["/blog/react-18", "/", "/projects"],
    },
    {
      date: "2024-01-11",
      visitors: 33,
      pageViews: 76,
      topPages: ["/about", "/blog/nextjs-guide", "/"],
    },
    {
      date: "2024-01-10",
      visitors: 29,
      pageViews: 67,
      topPages: ["/", "/blog/typescript", "/projects"],
    },
    {
      date: "2024-01-09",
      visitors: 47,
      pageViews: 134,
      topPages: ["/blog/nextjs-guide", "/blog/react-18", "/"],
    },
  ];

  const totalVisitors = mockData.reduce((sum, day) => sum + day.visitors, 0);
  const totalPageViews = mockData.reduce((sum, day) => sum + day.pageViews, 0);
  const avgVisitorsPerDay = Math.round(totalVisitors / mockData.length);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-slate-700">데이터 관리</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7days">최근 7일</option>
          <option value="30days">최근 30일</option>
          <option value="90days">최근 90일</option>
        </select>
      </div>

      {/* 방문자 분석 섹션 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
          📊 방문자 분석
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <h4 className="text-sm text-gray-500 mb-2">총 방문자</h4>
            <p className="text-4xl font-bold text-blue-500">{totalVisitors}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <h4 className="text-sm text-gray-500 mb-2">일평균 방문자</h4>
            <p className="text-4xl font-bold text-blue-500">{avgVisitorsPerDay}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold text-slate-700 mb-4">
            일별 방문자 추이
          </h4>
          <div className="flex items-end justify-center gap-2 h-48 mt-4">
            {mockData.map((day, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="bg-gradient-to-t from-blue-500 to-blue-300 w-full min-h-2 rounded-t transition-all hover:from-blue-600 hover:to-blue-400"
                  style={{ height: `${(day.visitors / 60) * 100}%` }}
                  title={`${day.date}: ${day.visitors}명`}
                ></div>
                <span className="text-xs text-gray-500 mt-2">
                  {day.date.slice(-2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 페이지 분석 섹션 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
          📄 페이지 분석
        </h3>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <h4 className="text-sm text-gray-500 mb-2">총 페이지뷰</h4>
            <p className="text-4xl font-bold text-green-500">{totalPageViews}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold text-slate-700 mb-4">
            인기 페이지
          </h4>
          <div className="space-y-3">
            {[
              "/",
              "/blog/react-18",
              "/about",
              "/blog/nextjs-guide",
              "/projects",
              "/blog/typescript",
            ].map((page, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
              >
                <span className="font-mono text-slate-700">{page}</span>
                <span className="text-gray-500 text-sm">
                  {Math.floor(Math.random() * 200 + 50)} 조회
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 실시간 모니터링 섹션 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
          🔍 실시간 모니터링
        </h3>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold text-slate-700 mb-4">
            최근 방문자 로그
          </h4>
          <div className="space-y-2">
            {[
              {
                time: "14:23",
                ip: "192.168.1.***",
                page: "/blog/react-18",
                userAgent: "Chrome/Mac",
              },
              {
                time: "14:18",
                ip: "10.0.0.***",
                page: "/about",
                userAgent: "Safari/iPhone",
              },
              {
                time: "14:15",
                ip: "172.16.0.***",
                page: "/",
                userAgent: "Firefox/Windows",
              },
              {
                time: "14:12",
                ip: "192.168.1.***",
                page: "/projects",
                userAgent: "Chrome/Linux",
              },
              {
                time: "14:08",
                ip: "10.0.0.***",
                page: "/blog/typescript",
                userAgent: "Edge/Windows",
              },
            ].map((log, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 py-2 border-b border-gray-100 last:border-b-0 text-sm"
              >
                <span className="text-gray-500">{log.time}</span>
                <span className="font-mono text-red-500">{log.ip}</span>
                <span className="font-mono text-slate-700">{log.page}</span>
                <span className="text-gray-500">{log.userAgent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
