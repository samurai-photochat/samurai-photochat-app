import Image from "next/image"

import { Post } from "@/features/posts/api/postsApi.types"
import { DropdownMenu } from "@/shared/ui/DropdownMenu"

import s from "../ui/PostModal.module.scss"

type PostContentHeaderProps = {
  post: Post
  isOwnPost: boolean
  isAuth: boolean
}

export const PostContentHeader = ({ post, isOwnPost, isAuth }: PostContentHeaderProps) => {
  const menuItems = isOwnPost
    ? [
        { key: "edit", label: "Edit Post", onSelect: () => {} },
        { key: "delete", label: "Delete Post", onSelect: () => {} },
      ]
    : [{ key: "copy", label: "Copy Link", onSelect: () => {} }]
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
