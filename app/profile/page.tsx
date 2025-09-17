"use client"

import Sidebar from "@/widgets/sidebar/sidebar"
import s from "./profile.module.css"
import { Modal } from "@/shared/ui/modal/Modal"
import { useState } from "react"
import { MyPostContent } from "@/shared/ui/modal/contentModal/MyPostContent"

export default function Profile() {
  const [showModal, setShowModal] = useState(false)

  const openModalHandler = () => {
    setShowModal(true)
  }

  const closeModalHandler = () => {
    setShowModal(false)
  }

  return (
    <div className={s.profile}>
      <Sidebar />
      <div className={s.content}>
        <h2>Content</h2>

        <button onClick={openModalHandler}>open</button>

        <Modal open={showModal} onClose={closeModalHandler}>
          <MyPostContent />
        </Modal>
      </div>
    </div>
  )
}
