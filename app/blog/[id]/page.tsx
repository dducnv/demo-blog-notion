import { notionServices } from "@/services/notion-services";

import { marked } from "marked";
async function getSinglePost(id: string) {
  const blogPost = await notionServices.getDetailNotionBlogPost(id);

  return blogPost;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getSinglePost(params.id);
  if (!post) {
    return {
      notFound: true,
    };
  }
  const { title, description, cover, date, tags } = post.post;
  return {
    title: title,
    description,
    image: cover,
    type: "article",
    date: date,
    images: [
      {
        url: cover,
      },
    ],
    site_name: "your site name",
    locale: "vi_VN",
    openGraph: {
      title,
      description,
      type: "article",
      date: date,
      images: [
        {
          url: cover,
        },
      ],
    },
    article: {
      published_time: date,
      section: "Blog",
      tag: tags.map((tag) => tag.name),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [cover],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const details = await getSinglePost(params.id);
  if (!details) {
    return {
      notFound: true,
    };
  }
  const { post, markdown } = details;
  return (
    <>
      <div className=" max-w-6xl m-auto py-11">
        {post.cover && (
          <div className="w-full h-[400px] relative md:mb-20 mb-7 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={post.cover}
              alt={post.title}
            />
          </div>
        )}
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100">
          {post.title}
        </h1>
        <div className="flex justify-start items-center mt-2 mb-8 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {new Date(post.date).toLocaleDateString()}
          </p>
        </div>
        <article
          className="prose prose-neutral dark:prose-invert mb-10"
          dangerouslySetInnerHTML={{
            __html: marked(markdown!),
          }}
        />
      </div>
    </>
  );
}
