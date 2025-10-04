"use client"

import { useState } from "react"
import s from "./testpost.module.css"
import { useGetPostsByParamsQuery } from "@/features/posts/api/postsApi"
import { PostModal } from "@/features/posts/ui/PostModal/PostModal"
import Image from "next/image"

export default function Profile() {
  const [showModal, setShowModal] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  // Загрузка данных постов
  const {
    data: posts,
    isError,
    isLoading,
  } = useGetPostsByParamsQuery({
    param: "klonirovan89",
    pageSize: 8,
  })

  const openPost = (postId: number) => {
    setSelectedPostId(postId)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  if (isError) {
    return <p>Error!</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className={s.profile}>
      <div className={s.content}>
        <h2>
          <span>Content</span>
        </h2>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {posts?.items.map((post) => (
            <ul key={post.id} className={s.list}>
              <li onClick={() => openPost(post.id)}>
                <Image
                  src={post.images[0].url}
                  alt="avatar"
                  width={post.images[0].width}
                  height={post.images[0].height}
                />
                <p>{new Date(post.updatedAt).toLocaleDateString()}</p>
              </li>
            </ul>
          ))}
        </div>

        <PostModal isOpen={showModal} postId={selectedPostId} onClose={closeModal} />
      </div>
    </div>
  )
}
