import { useMemo } from "react"

import { ContextMenuItem } from "@/shared/ui/DropdownMenu/DropdownMenu"

export type MenuAction = "follow-toggle" | "copy-link"

export type UsePostDropdownMenuActionsParams = {
  isOwnPost: boolean
  isFollowing: boolean
  onCopyLink: () => void
  onToggleFollow: () => void
}

export const usePostDropdownMenuActions = ({
  isOwnPost,
  isFollowing,
  onCopyLink,
  onToggleFollow,
}: UsePostDropdownMenuActionsParams) => {
  const items = useMemo<ContextMenuItem[]>(() => {
    if (isOwnPost) {
      return [
        {
          key: "copy-link",
          label: "Скопировать ссылку",
          onSelect: onCopyLink,
        },
      ]
    }

    return [
      {
        key: "follow",
        label: isFollowing ? "Отписаться" : "Подписаться",
        onSelect: onToggleFollow,
      },
      {
        key: "copy-link",
        label: "Скопировать ссылку",
        onSelect: onCopyLink,
      },
    ]
  }, [isOwnPost, isFollowing, onToggleFollow, onCopyLink])

  return items
}
