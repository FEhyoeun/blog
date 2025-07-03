import { useState } from "react";
interface Post {
  id: number;
  title: string;
  status: "published" | "draft";
  createdAt: string;
  views: number;
}

function PostManagement() {
  const [posts] = useState<Post[]>([
    {
      id: 1,
      title: "React 18 새 기능 소개",
      status: "published",
      createdAt: "2024-01-15",
      views: 234,
    },
    {
      id: 2,
      title: "Next.js 최적화 가이드",
      status: "published",
      createdAt: "2024-01-10",
      views: 189,
    },
    {
      id: 3,
      title: "TypeScript 활용법",
      status: "draft",
      createdAt: "2024-01-08",
      views: 0,
    },
  ]);

  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    status: "draft" as const,
  });

  const handleCreatePost = () => {
    console.log("새 포스트:", newPost);
    setShowNewPostForm(false);
    setNewPost({ title: "", content: "", status: "draft" });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-slate-700">포스팅 관리</h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors"
          onClick={() => setShowNewPostForm(true)}
        >
          새 포스트 작성
        </button>
      </div>

      {showNewPostForm && (
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">새 포스트 작성</h3>
          <input
            type="text"
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="내용"
            value={newPost.content}
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
            rows={10}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 resize-y min-h-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-wrap gap-4 items-center">
            <select
              value={newPost.status}
              onChange={(e) =>
                setNewPost({
                  ...newPost,
                  status: e.target.value as "draft" | "published",
                })
              }
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">임시저장</option>
              <option value="published">발행</option>
            </select>
            <button 
              onClick={handleCreatePost}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              저장
            </button>
            <button 
              onClick={() => setShowNewPostForm(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">제목</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">상태</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">작성일</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">조회수</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{post.title}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === "published" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {post.status === "published" ? "발행됨" : "임시저장"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{post.createdAt}</td>
                  <td className="px-4 py-3 text-gray-600">{post.views}</td>
                  <td className="px-4 py-3">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs mr-2 transition-colors">
                      수정
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors">
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PostManagement;
