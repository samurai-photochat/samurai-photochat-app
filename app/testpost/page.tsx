"use client"

import s from "./testpost.module.css"
import { Modal } from "@/features/posts/ui/PostModal/Modal/Modal"
import { useState } from "react"
import { PostContent } from "@/features/posts/ui/PostModal/Post/PostContent"
import { useGetAllPostsQuery } from "@/features/posts/api/postsApi"

export default function Profile() {
  const [showModal, setShowModal] = useState(false)
  const [showPostId, setShowPostId] = useState(1111)
  //8339
  //sonyhero klonirovan89
  const { data: posts, isError, isLoading } = useGetAllPostsQuery({ param: "klonirovan89", pageSize: 8 })
  console.log(posts)
  if (isError) {
    return <p>Error!</p>
  }

  const openModalHandler = () => {
    setShowModal(true)
  }

  const closeModalHandler = () => {
    setShowModal(false)
  }

  const openPost = (id: number) => {
    openModalHandler()
    setShowPostId(id)
  }

  console.log(showPostId)

  return (
    <div className={s.profile}>
      <div className={s.content}>
        <h2 onClick={openModalHandler}>
          <span>Content</span>
        </h2>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            posts?.items.map((p) => {
              return (
                <ul key={p.id} className={s.list}>
                  <li onClick={() => openPost(p.id)}>
                    <img src={p?.images[0].url} alt="avatar" />
                    <p>{new Date(p.updatedAt).toLocaleDateString()}</p>
                  </li>
                </ul>
              )
            })
          )}
        </div>
        <Modal open={showModal} onClose={closeModalHandler}>
          <PostContent postId={showPostId} />
        </Modal>
      </div>
    </div>
  )
}
