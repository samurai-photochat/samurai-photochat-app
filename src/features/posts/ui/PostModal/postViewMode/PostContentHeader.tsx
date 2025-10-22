import Image from "next/image"
import { useCallback } from "react"

import { Post } from "@/features/posts/api/postsApi.types"
import { DropdownMenu } from "@/shared/ui/DropdownMenu"

import s from "../PostModal.module.scss"
import { usePostDropdownMenuActions } from "@/features/posts/ui/PostModal/hooks"
import { usePostModalContext } from "@/features/posts/ui/PostModal/context/PostModalContext"

type PostContentHeaderProps = {
  post: Post
  isOwnPost: boolean
  isAuth: boolean
}

export const PostContentHeader = ({ post, isOwnPost, isAuth }: PostContentHeaderProps) => {
  const { setEditMode, setDeleteMode } = usePostModalContext()

  const handleCopyLink = useCallback(() => {
    const link = `${window.location.origin}/posts/${post.id}`
    console.log("Ссылка скопирована:", link)
    alert("Copy")
  }, [post.id])

  // Коллбэк подписки/отписки (заглушка, добавь реальную логику)
  const handleToggleFollow = () => {
    console.log("Отписка от пользователя или Подписка на пользователя")
    alert("Follow")
  }

  const handleEditMode = () => setEditMode(true)
  const handleDeleteMode = () => setDeleteMode(true)

  // Получаем пункты меню из хука
  const menuItems = usePostDropdownMenuActions({
    isOwnPost,
    onCopyLink: handleCopyLink,
    onToggleFollow: handleToggleFollow,
    onEdit: handleEditMode,
    onDelete: handleDeleteMode,
  })

  return (
    <div className={s.header}>
      <div className={s.ownerInfo}>
        {post.avatarOwner ? (
          <Image src={post.avatarOwner} alt={post.userName} width={40} height={40} style={{ borderRadius: "50%" }} />
        ) : (
          <div className={s.ownerAvatarPlaceholder} />
        )}
        <span>{post.userName}</span>
      </div>
      {isAuth && <DropdownMenu align="end" sideOffset={8} items={menuItems} />}
    </div>
  )
}
