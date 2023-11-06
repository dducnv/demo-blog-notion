// Định nghĩa cho Tag
export type Tag = {
  color: string; // Màu sắc
  id: string; // ID
  name: string; // Tên
};
// Định nghĩa cho các bài viết
export type BlogPost = {
  id: string; // ID
  cover: string; // Ảnh bìa
  title: string; // Tiêu đề
  slug: string; // Slug
  tags: Tag[]; // Danh sách tags
  description: string;
  date: string;
};

// Định nghĩa cho dữ liệu bài viết chi tiết
export type PostPage = {
  post: BlogPost; // Bài viết
  markdown: string; // Nội dung bài viết
};
