'use client';

import { useQuery } from '@tanstack/react-query';
import supabaseClient from '@/supabase';
import { Post } from '@shared/shared/types/post';
import { parseDatetimeToFormat } from '@shared/shared/utils/dateUtils';

export default function BlogPage() {
  const fetchPosts = async (): Promise<Post[]> => {
    const { data, error } = await supabaseClient
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  };

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading || error) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600">
          개발 경험과 학습 내용을 공유합니다
        </p>
      </div>

      <div className="space-y-8">
        {posts?.map((post: Post) => (
          <>
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
              <div key={post.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {parseDatetimeToFormat(post.updated_at || post.created_at)}
                </span>
                <div className="flex gap-2">
                  {post?.tags?.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        ))}

        <div className="text-center py-12">
          <p className="text-gray-500">더 많은 포스트가 곧 추가됩니다.</p>
        </div>
      </div>
    </div>
  );
}
