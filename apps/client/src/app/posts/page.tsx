'use client';

import { useQuery } from '@tanstack/react-query';
import getSupabaseClient from '@/supabase';
import { Post } from '@shared/shared/types/post';
import { parseDatetimeToFormat } from '@shared/shared/utils/dateUtils';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';

interface PaginationResponse<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
}

const PAGE = 10;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [searchCount, setSearchCount] = useState(0);

  const fetchPosts = async (
    page: number
  ): Promise<PaginationResponse<Post>> => {
    const startPage = (page - 1) * PAGE;
    const endPage = startPage + PAGE - 1;

    const { count } = await getSupabaseClient()
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    const { data, error } = await getSupabaseClient()
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .range(startPage, endPage);

    if (error) throw error;
    return {
      data: data || [],
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / PAGE),
    };
  };

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchPosts(currentPage),
  });

  // 검색 포스팅 검색
  const fetchIncludingPosts = async (
    searchKeyword: string,
    page: number = 1
  ): Promise<PaginationResponse<Post>> => {
    const startPage = (page - 1) * PAGE;
    const endPage = startPage + PAGE - 1;

    const { count } = await getSupabaseClient()
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published')
      .or(`title.ilike.%${searchKeyword}%, content.ilike.%${searchKeyword}%`);

    const { data, error } = await getSupabaseClient()
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.%${searchKeyword}%, content.ilike.%${searchKeyword}%`)
      .order('created_at', { ascending: false })
      .range(startPage, endPage);

    if (error) throw error;
    return {
      data: data || [],
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / PAGE),
    };
  };

  const executeSearch = async (searchKeyword: string) => {
    try {
      setCurrentPage(1);

      const { data: results, totalCount } =
        await fetchIncludingPosts(searchKeyword);
      setSearchResults(results);
      setSearchCount(totalCount);
    } catch (error) {
      console.error(error);
      setSearchResults([]);
      setSearchCount(0);
    }
  };

  const displayPosts = keyword.trim() ? searchResults : posts?.data || [];
  const totalPages = keyword.trim()
    ? Math.ceil(searchCount / PAGE)
    : posts?.totalPages || 0;

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (keyword.trim()) {
        await executeSearch(keyword);
        return;
      }

      setSearchResults([]);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [keyword]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setKeyword(keyword);
  };

  const generatePageNumbers = (currentPage: number, totalPage: number) => {
    const pages = [];
    const COUNT_PER_PAGE = 5;

    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPage, start + COUNT_PER_PAGE - 1);

    // 끝이 5개가 안 될 때
    if (end - start < COUNT_PER_PAGE - 1) {
      start = Math.max(1, end - COUNT_PER_PAGE + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (isLoading || error) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Posts</h1>
        <p className="text-xl text-gray-600">
          개발 경험과 학습 내용을 공유합니다
        </p>
      </div>

      {/* 검색 영역 */}
      <div className="mb-8 max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="제목이나 내용으로 검색..."
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={e => handleSearchKeyword(e)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
          <svg
            className="w-5 h-5 text-gray-400 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-6">
        {displayPosts?.map((post: Post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
            <div className="flex items-center justify-between">
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
          </Link>
        ))}

        {/* 포스트가 없을 때 */}
        {displayPosts?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-12">
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            {/* 모바일용 */}
            <button className="relative inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              이전
            </button>
            <button className="relative ml-3 inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              다음
            </button>
          </div>

          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-600">
                총{' '}
                <span className="font-medium text-gray-900">
                  {posts?.totalCount}
                </span>
                개의 포스트
              </p>
            </div>

            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="relative inline-flex items-center px-3 py-2 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-r border-gray-200"
                disabled={currentPage <= 1}
              >
                <span className="sr-only">이전</span>
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {generatePageNumbers(currentPage, totalPages).map(pageNumber => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border-r border-gray-200 ${currentPage === pageNumber ? 'bg-gray-700 text-white' : 'text-gray-700 hover:bg-gray-50 transition-colors'}`}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                className="relative inline-flex items-center px-3 py-2 text-gray-400 hover:bg-gray-50 transition-colors"
                disabled={currentPage >= totalPages}
              >
                <span className="sr-only">다음</span>
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
