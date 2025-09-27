"use client"

import s from "./profile.module.css"
import { Modal } from "@/shared/ui/modal/Modal"
import { useState } from "react"
import { MyPostContent } from "@/shared/ui/modal/contentModal/MyPostContent"
import { useGetAllPostsQuery, useGetPostQuery } from "@/features/posts/api/postsApi"

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
        <h2>Content</h2>
        <button onClick={openModalHandler}>open</button>
        <button onClick={() => console.log("posts")}>get posts</button>
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
          <MyPostContent postId={showPostId} />
        </Modal>
      </div>
    </div>
  )
}
