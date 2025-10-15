"use client"

import { useState } from "react"
import Image from "next/image"
import { PostModal } from "@/features/posts/ui/PostModal/PostModal"
import styles from "./MainPhotos.module.scss"
import { Post } from "@/features/posts/api/postsApi.types"

type Props = {
  posts: Post[]
}

export const ProfilePhotos = ({ posts }: Props) => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenPost = (postId: number) => {
    setSelectedPostId(postId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPostId(null)
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

      {/* Модальное окно с постом */}
      <PostModal isOpen={isModalOpen} postId={selectedPostId} onClose={handleCloseModal} />
    </>
  )
}
