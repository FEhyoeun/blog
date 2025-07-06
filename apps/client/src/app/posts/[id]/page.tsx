'use client';

import { Post } from '@shared/shared/types/post';
import supabaseClient from '@/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { parseDatetimeToFormat } from '@shared/shared/utils/dateUtils';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  params: Promise<{ id: string }>;
}

export default function BlogDetailPage({ params }: Props) {
  const { id } = React.use(params);
  const queryClient = useQueryClient();
  const hasIncrementRef = useRef(false);

  const fetchPostDetail = async (): Promise<Post> => {
    const { data, error } = await supabaseClient
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  };

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: fetchPostDetail,
  });

  const incrementViewsMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabaseClient.rpc('increment_post_views', {
        p_post_id: parseInt(postId),
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
  });

  useEffect(() => {
    if (!post || hasIncrementRef.current) return;

    incrementViewsMutation.mutate(id);
    hasIncrementRef.current = true;
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8 w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            포스트를 불러올 수 없습니다
          </h1>
          <Link
            href="/posts"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            포스트 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 뒤로가기 버튼 */}
      <div className="mb-8">
        <Link
          href="/posts"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          포스트 목록으로
        </Link>
      </div>

      {/* 포스트 헤더 */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center text-gray-600 text-sm">
            <time>
              {parseDatetimeToFormat(post.updated_at || post.created_at)}
            </time>
            <span className="mx-2">•</span>
            <span>조회수 {post.views.toLocaleString()}</span>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* 포스트 내용 */}
      <div className="prose prose-lg max-w-none markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* 푸터 */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="text-center">
          <Link
            href="/posts"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            포스트 목록으로
          </Link>
        </div>
      </footer>
    </article>
  );
}
