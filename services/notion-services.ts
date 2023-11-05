import { BlogPost, PostPage } from "@/types/schema";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notionSecret = process.env.NOTION_ACCESS_TOKEN;
const notionDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;
export const client = new Client({ auth: notionSecret });
export const n2m = new NotionToMarkdown({ notionClient: client });

export const notionServices = {
  getNotionBlogPosts: async (): Promise<BlogPost[]> => {
    const response = await client.databases.query({
      database_id: notionDatabaseId!,
      filter: {
        property: "Published", //sẽ lấy những bài viết có thuộc tính Published = true
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "CreatedTime", //sắp xếp theo thời gian tạo
          direction: "descending", //giảm dần
        },
      ],
    });

    return response.results.map((res: any) =>
      notionServices.pageToPostTransformer(res)
    );
  },

  getDetailNotionBlogPost: async (id: string): Promise<PostPage> => {
    let post, markdown; //khai báo 2 biến post và markdown
    const response = await client.databases.query({
      database_id: notionDatabaseId!,
    });

    //nếu không tìm thấy bài viết thì sẽ throw ra lỗi
    if (response.results.length == 0) {
      throw new Error("Not found");
    }

    //lấy ra bài viết đầu tiên
    const page = response.results[0];
    //lấy ra markdown của bài viết
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    //chuyển markdown thành chuỗi
    markdown = n2m.toMarkdownString(mdBlocks);
    //chuyển page thành post
    post = notionServices.pageToPostTransformer(page);

    return {
      post: post,
      markdown: markdown.parent,
    };
  },

  pageToPostTransformer: (page: any): BlogPost => {
    const cover =
      page.cover != null &&
      (page.cover.type === "file"
        ? page.cover.file
        : page.cover.type === "external"
        ? page.cover.external.url
        : "");

    return {
      id: page.id,
      cover,
      title: page.properties.Title.title[0].plain_text,
      tags: page.properties.Tags.multi_select,
      description: page.properties.Description.rich_text[0].plain_text,
      date: page.properties.CreatedTime.created_time,
    };
  },
};
