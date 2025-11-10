"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import styles from "./MainPhotos.module.scss"
import { Post } from "@/features/posts/api/postsApi.types"

type Props = {
  posts: Post[]
}

export const ProfilePhotos = ({ posts }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleOpenPost = (postId: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("postId", String(postId))
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.grid}>
          {posts.map((post) => (
            <div key={post.id} className={styles.card} onClick={() => handleOpenPost(post.id)}>
              {/* Фото поста */}
              {post.images && post.images.length > 0 && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={post.images[0].url}
                    alt={post.description || "Post image"}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 992px) 33vw, (max-width: 1200px) 25vw, 20vw"
                    style={{ objectFit: "cover" }}
                    quality={85}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
