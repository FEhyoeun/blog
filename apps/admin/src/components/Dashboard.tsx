import { useQuery } from "@tanstack/react-query";
import supabaseClient from "@/supabase";

import { useState } from "react";
import { Post } from "@shared/shared/types/post";

function Dashboard() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  const fetchStats = async () => {
    const { count: totalPosts } = await supabaseClient
      .from("posts")
      .select("*", { count: "exact", head: true });

    return {
      totalPosts,
      // mock 데이터
      todayVisitors: 0,
      weeklyVisitors: 0,
      totalVisitors: 0,
    };
  };

  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats,
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-700 mb-8">대시보드</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h3 className="text-sm text-gray-500 mb-2">전체 포스트</h3>
          <p className="text-3xl font-bold text-slate-700">
            {stats.totalPosts}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h3 className="text-sm text-gray-500 mb-2">오늘 방문자</h3>
          <p className="text-3xl font-bold text-slate-700">
            {stats.todayVisitors}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h3 className="text-sm text-gray-500 mb-2">이번 주 방문자</h3>
          <p className="text-3xl font-bold text-slate-700">
            {stats.weeklyVisitors}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h3 className="text-sm text-gray-500 mb-2">전체 방문자</h3>
          <p className="text-3xl font-bold text-slate-700">
            {stats.totalVisitors}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">최근 활동</h3>
        <ul className="space-y-3">
          {recentPosts.map((post: Post) => (
            <li
              key={post.id}
              className="py-2 border-b border-gray-100 last:border-b-0"
            >
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
