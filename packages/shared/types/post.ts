export type Post = {
  id: number;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  status: "published" | "draft";
  views: number;
  updated_at?: string;
  tags?: string[];
};
