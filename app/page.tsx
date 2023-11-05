import Link from "next/link";
import { notionServices } from "@/services/notion-services";
import { BlogPost } from "@/types/schema";

export default async function Home() {
  const blogPosts: BlogPost[] = await notionServices.getNotionBlogPosts();

  return (
    <>
      <section className="py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100">
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Danh sách bài viết</h2>
            <p className="font-serif text-sm dark:text-gray-400">
              Nơi chia sẻ những kiến thức về lập trình, kinh nghiệm làm việc,
              các bài viết về cuộc sống, tâm sự, chia sẻ về những điều mình
              thích.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {blogPosts.map((post) => (
              <>
                <article className="flex flex-col dark:bg-gray-900">
                  <img
                    alt=""
                    className="object-cover w-full h-52 dark:bg-gray-500"
                    src={post.cover}
                  />

                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex">
                      {post.tags.map((tag) => (
                        <>
                          <span className="mr-2 text-xs font-semibold text-blue-500 uppercase">
                            #{tag.name}
                          </span>
                        </>
                      ))}
                    </div>
                    <h3 className="flex-1 py-2 text-lg font-semibold leadi">
                      <Link
                        rel="noopener noreferrer"
                        href={`/blog/${post.id}`}
                        aria-label="Te nulla oportere reprimique his dolorum"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                      <time dateTime="2020-03-10">
                        {new Date(post.date).toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                </article>
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
