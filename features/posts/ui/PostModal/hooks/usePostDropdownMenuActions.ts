import { useMemo } from "react"

import { ContextMenuItem } from "@/shared/ui/DropdownMenu/DropdownMenu"

/**
 * Тип действия в выпадающем меню поста
 * @typedef {"follow-toggle" | "copy-link"} MenuAction
 */
export type MenuAction = "follow-toggle" | "copy-link"

/**
 * Параметры хука usePostDropdownMenuActions
 * @property isOwnPost - Флаг, указывающий, является ли текущий пользователь владельцем поста
 * @property isFollowing - Флаг, указывающий, подписан ли текущий пользователь на автора поста
 * @property onCopyLink - Callback-функция для копирования ссылки на пост
 * @property onToggleFollow - Callback-функция для переключения подписки на автора поста
 */
export type UsePostDropdownMenuActionsParams = {
  isOwnPost: boolean
  isFollowing: boolean
  onCopyLink: () => void
  onToggleFollow: () => void
}

/**
 * Хук для формирования списка действий в выпадающем меню поста
 * 
 * Возвращает массив пунктов меню в зависимости от того, является ли пользователь
 * владельцем поста. Для собственных постов доступно только копирование ссылки,
 * для чужих постов - подписка/отписка и копирование ссылки.
 * 
 * @param {UsePostDropdownMenuActionsParams} params - Параметры хука
 * @returns {ContextMenuItem[]} Массив пунктов контекстного меню
 */
export const usePostDropdownMenuActions = ({
  isOwnPost,
  isFollowing,
  onCopyLink,
  onToggleFollow,
}: UsePostDropdownMenuActionsParams) => {
  // Мемоизируем массив пунктов меню для оптимизации производительности
  // Пересчитываем только при изменении зависимостей
  const items = useMemo<ContextMenuItem[]>(() => {
    // Если это пост текущего пользователя, показываем только копирование ссылки
    if (isOwnPost) {
      return [
        {
          key: "copy-link",
          label: "Скопировать ссылку",
          onSelect: onCopyLink,
        },
      ]
    }

    // Для чужих постов показываем подписку/отписку и копирование ссылки
    return [
      {
        key: "follow",
        // Динамически меняем текст в зависимости от статуса подписки
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
