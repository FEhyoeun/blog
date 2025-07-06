import { useQuery } from "@tanstack/react-query";
import supabaseClient from "@/supabase";
import { Post } from "@shared/shared/types/post";
import { parseDatetimeToFormat } from "@shared/shared/utils/dateUtils";

type RecentPost = Pick<Post, "id" | "title" | "created_at" | "status">;

function Dashboard() {
  const fetchRecentPosts = async (): Promise<RecentPost[]> => {
    const { data, error } = await supabaseClient
      .from("posts")
      .select("id, title, created_at, status")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) throw error;
    return data || [];
  };

  const { data: recentPosts } = useQuery<RecentPost[]>({
    queryKey: ["recent-posts"],
    queryFn: fetchRecentPosts,
    initialData: [],
  });

  const fetchStats = async () => {
    const { count: totalPosts } = await supabaseClient
      .from("posts")
      .select("*", { count: "exact", head: true });

    return {
      totalPosts,
      // Todo mock 데이터
      todayVisitors: 0,
      weeklyVisitors: 0,
      totalVisitors: 0,
    };
  };

  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats,
    initialData: {
      totalPosts: 0,
      todayVisitors: 0,
      weeklyVisitors: 0,
      totalVisitors: 0,
    },
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
        <h3 className="text-lg font-semibold text-slate-700 mb-4">
          최근 발행된 포스트
        </h3>
        <ul className="space-y-2">
          {recentPosts.map((post: RecentPost) => (
            <li
              key={post.id}
              className="py-3 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-slate-700 truncate pr-4">
                  {post.title}
                </h4>
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {parseDatetimeToFormat(post.created_at)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
