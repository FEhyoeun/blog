import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import supabaseClient from "@/supabase";

import { Post } from "@shared/shared/types/post";
import { useAuth } from "@shared/admin-auth/src/AuthContext";
import { parseDatetimeToFormat } from "@shared/shared/utils/dateUtils";

function PostManagement() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const getDefaultNewPost = (): Partial<Post> => ({
    title: "",
    content: "",
    tags: [],
    status: "draft",
  });

  const [newPost, setNewPost] = useState<Partial<Post>>(getDefaultNewPost());

  const { user } = useAuth();

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabaseClient
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error.message);
        return;
      }

      if (data) setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    setLoading(true);

    setShowNewPostForm(false);

    try {
      const { error } = await supabaseClient.from("posts").insert([
        {
          title: newPost.title,
          content: newPost.content,
          tags: newPost.tags,
          status: newPost.status,
          author_id: user && user.id,
        },
      ]);

      if (error) {
        console.error(error);
        return;
      }

      setNewPost(getDefaultNewPost());
      setTagInput("");
      await fetchPosts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const [tagInput, setTagInput] = useState("");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const handleEditPostForm = (post: Post) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      content: post.content,
      tags: post.tags,
      status: post.status,
    });

    if (post.tags) setTagInput(post.tags.join(", "));
    setShowEditor(true);
  };

  const handleUpdatePost = async () => {
    setLoading(true);

    try {
      const { error } = await supabaseClient
        .from("posts")
        .update({
          title: newPost.title,
          content: newPost.content,
          tags: newPost.tags,
          status: newPost.status,
        })
        .eq("id", editingPost?.id);

      if (error) {
        console.error(error);
        return;
      }

      setEditingPost(null);
      setShowEditor(false);
      setNewPost(getDefaultNewPost());
      setTagInput("");
      await fetchPosts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;

    const inputTags = tagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    setNewPost({ ...newPost, tags: inputTags });
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags && newPost.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleRemovePost = async (post: Post) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    setLoading(true);

    try {
      const { error } = await supabaseClient
        .from("posts")
        .delete()
        .eq("id", post.id);

      if (error) {
        console.error(error);
        return;
      }

      await fetchPosts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    handleAddTag();
  };

  if (loading) return <p>loading...</p>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-slate-700">포스팅 관리</h2>
        {showNewPostForm ||
          (!showEditor && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors"
              onClick={() => setShowNewPostForm(true)}
            >
              새 포스트 작성
            </button>
          ))}
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
              {newPost.tags &&
                newPost.tags.map((tag, index) => (
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
                onChange={(value: string | undefined) =>
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
                setNewPost(getDefaultNewPost());
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
                      {post.tags &&
                        post.tags.map((tag, index) => (
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
                  <td className="px-4 py-3 text-gray-600">
                    {parseDatetimeToFormat(post.updated_at || post.created_at)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{post.views}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEditPostForm(post)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs mr-2 transition-colors"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleRemovePost(post)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
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
