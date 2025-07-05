import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  status: "published" | "draft";
  createdAt: string;
  views: number;
}

function PostManagement() {
  const [posts, _] = useState<Post[]>([
    {
      id: 1,
      title: "React 18 새 기능 소개",
      content:
        "# React 18 새 기능\n\nReact 18에서 추가된 새로운 기능들을 소개합니다.",
      tags: ["React", "Frontend", "JavaScript"],
      status: "published",
      createdAt: "2024-01-15",
      views: 234,
    },
    {
      id: 2,
      title: "Next.js 최적화 가이드",
      content:
        "# Next.js 최적화\n\n웹 애플리케이션 성능을 향상시키는 방법들을 다룹니다.",
      tags: ["Next.js", "Performance", "Web"],
      status: "published",
      createdAt: "2024-01-10",
      views: 189,
    },
    {
      id: 3,
      title: "TypeScript 활용법",
      content: "# TypeScript 기초\n\n타입스크립트 기본 활용법을 알아봅시다.",
      tags: ["TypeScript", "Programming"],
      status: "draft",
      createdAt: "2024-01-08",
      views: 0,
    },
  ]);

  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState<{
    title: string;
    content: string;
    tags: string[];
    status: "draft" | "published";
  }>({
    title: "",
    content: "",
    tags: [],
    status: "draft",
  });
  const [tagInput, setTagInput] = useState("");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const handleCreatePost = () => {
    console.log("새 포스트:", newPost);
    setShowNewPostForm(false);
    setNewPost({ title: "", content: "", tags: [], status: "draft" });
    setTagInput("");
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      content: post.content,
      tags: post.tags,
      status: post.status,
    });
    setTagInput(post.tags.join(", "));
    setShowEditor(true);
  };

  const handleUpdatePost = () => {
    console.log("포스트 업데이트:", { ...editingPost, ...newPost });
    setEditingPost(null);
    setShowEditor(false);
    setNewPost({ title: "", content: "", tags: [], status: "draft" });
    setTagInput("");
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      const newTags = tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag && !newPost.tags.includes(tag));
      setNewPost({ ...newPost, tags: [...newPost.tags, ...newTags] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
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

      {(showNewPostForm || showEditor) && (
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            {editingPost ? "포스트 수정" : "새 포스트 작성"}
          </h3>

          <input
            type="text"
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              태그
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {newPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="태그 입력 (쉼표로 구분)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddTag}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                추가
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                마크다운 에디터
              </label>
              <MDEditor
                value={newPost.content}
                onChange={(value) =>
                  setNewPost({ ...newPost, content: value || "" })
                }
                preview="edit"
                height={400}
                data-color-mode="light"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                미리보기
              </label>
              <div className="border border-gray-300 rounded-md p-4 h-96 overflow-y-auto bg-gray-50">
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {newPost.content || "*미리보기가 여기에 표시됩니다*"}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

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
              onClick={editingPost ? handleUpdatePost : handleCreatePost}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              {editingPost ? "수정" : "저장"}
            </button>
            <button
              onClick={() => {
                setShowNewPostForm(false);
                setShowEditor(false);
                setEditingPost(null);
                setNewPost({
                  title: "",
                  content: "",
                  tags: [],
                  status: "draft",
                });
                setTagInput("");
              }}
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
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  제목
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  태그
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  상태
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  작성일
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  조회수
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  액션
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{post.title}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {post.status === "published" ? "발행됨" : "임시저장"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{post.createdAt}</td>
                  <td className="px-4 py-3 text-gray-600">{post.views}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs mr-2 transition-colors"
                    >
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
