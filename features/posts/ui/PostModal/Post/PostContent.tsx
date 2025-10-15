import Image from "next/image"
import "./PostContent.css"
import { useGetPostByIdQuery, useUpdatePostMutation } from "@/features/posts/api/postsApi"
import { Textarea } from "@/shared/ui/textarea/textarea"
import React, { useRef, useState } from "react"
import { Button } from "@/shared/ui"
import { DropdownMenu } from "@/shared/ui/DropdownMenu"
import { EditOutline } from "@/shared/assets/icons/components/EditOutline"
import { TrashOutline } from "@/shared/assets/icons/components/TrashOutline"
import { useOutsideClick } from "@/app/hooks/useOutsideClick"
import { ModalWindow } from "@/features/auth/ui/Register/ModalWindow/ModalWindow"

type PostIdType = {
  postId: number
}

// Функция для форматирования времени "X минут назад"
const getTimeAgo = (date: string): string => {
  const now = new Date()
  const postDate = new Date(date)
  const diffInMs = now.getTime() - postDate.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) return "только что"
  if (diffInMinutes < 60) return `${diffInMinutes} мин назад`
  if (diffInHours < 24) return `${diffInHours} ч назад`
  if (diffInDays < 7) return `${diffInDays} дн назад`

  return postDate.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
}

export function PostContent({ postId }: PostIdType) {
  const { data, isLoading, error } = useGetPostByIdQuery(postId)

  const [text, setText] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [updatePost, { isLoading: isUpdatePostLoading }] = useUpdatePostMutation()

  const ref = useRef<HTMLDivElement | null>(null)
  // callback
  useOutsideClick({
    ref,
    action: () => {
      if (editMode) {
        setEditModal(true)
      }
    },
  })

  if (isLoading) {
    return (
      <div className="container">
        <p className="h3" style={{ padding: "20px", textAlign: "center" }}>
          Загрузка...
        </p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="container">
        <p className="h3" style={{ padding: "20px", textAlign: "center", color: "red" }}>
          Ошибка загрузки поста
        </p>
      </div>
    )
  }

  const formattedDate = getTimeAgo(data.createdAt)
  const fullDate = new Date(data.createdAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const editHandler = () => {
    setEditMode(true)
    setText(data?.description)
  }

  const changePostHandler = async () => {
    if (editMode) {
      await updatePost({ postId, description: text })
      setEditMode(false)
    }
  }

  return (
    <div ref={ref} className="container">
      <div className="photoPanel">
        {data.images && data.images.length > 0 && (
          <Image
            src={data.images[0].url}
            alt={data.description || "Post image"}
            width={data.images[0].width}
            height={data.images[0].height}
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </div>
      <div className="right-panel">
        {/* Заголовок с аватаром и именем */}
        <div className="posts-header">
          {data.avatarOwner ? (
            <Image
              src={data.avatarOwner}
              alt={data.userName}
              className="post-avatar"
              width={32}
              height={32}
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <div className="post-avatar" style={{ width: "32px", height: "32px", background: "#ccc" }} />
          )}
          <p className="h3">{data.userName}</p>
          {!editMode && (
            <div className="menu">
              <DropdownMenu align={"end"} sideOffset={6}>
                <Button onClick={editHandler}>
                  <EditOutline />
                  <span style={{ marginLeft: 8 }}>Edit Post</span>
                </Button>
                <Button>
                  <TrashOutline />
                  <span style={{ marginLeft: 8 }}>Delete Post</span>
                </Button>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Описание поста */}
        <div className="posts-list regular-text-14">
          {editMode ? (
            <div className="textarea-block">
              <label htmlFor="message" className="label">
                Add publication descriptions
              </label>
              <Textarea max={500} text={text} setText={setText} />
              <Button
                variant={"primary"}
                className={"editButton"}
                onClick={changePostHandler}
                disabled={isUpdatePostLoading}
              >
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="post">
              {data.avatarOwner && (
                <Image
                  src={data.avatarOwner}
                  alt={data.userName}
                  className="post-avatar"
                  width={32}
                  height={32}
                  style={{ borderRadius: "50%" }}
                />
              )}
              <div className="post-content">
                <p className="post-text">
                  <span className="bold-text-14">{data.userName}</span> {data.description || "Без описания"}
                </p>
                <span className="post-time">{formattedDate}</span>
              </div>
            </div>
          )}
        </div>

        {/* Футер с лайками и датой */}
        {!editMode && (
          <div className="posts-footer">
            <div className="posts-like">
              <p className="posts-counter h3">{data.likesCount.toLocaleString("ru-RU")} </p>
              <span className="regular-text-14" style={{ marginLeft: "4px" }}>
                {data.likesCount === 1 ? "лайк" : "лайков"}
              </span>
            </div>
            <p className="post-time">{fullDate}</p>
          </div>
        )}
        <ModalWindow isOpen={editModal} title={"Close"} isClose={() => setEditModal(false)}>
          <p className="text">
            Do you really want to close the edition of the publication?
            <br /> If you close changes won’t be saved
          </p>
          <div className="button-box">
            <Button
              variant="outlined"
              className="modal-button"
              onClick={() => {
                setEditMode(false)
                setEditModal(false)
              }}
            >
              Yes
            </Button>
            <Button
              className="modal-button"
              onClick={() => {
                setEditModal(false)
              }}
            >
              No
            </Button>
          </div>
        </ModalWindow>
      </div>
    </div>
  )
}
