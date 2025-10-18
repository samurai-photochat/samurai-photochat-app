import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { useGetPostByIdQuery } from "@/features/posts/api/postsApi"
import { Post } from "@/features/posts/api/postsApi.types"
import { useMeQuery } from "@/features/auth/api/authApi"

/**
 * Тип значения контекста модального окна поста
 * @property post - Данные поста или null, если пост не загружен
 * @property isOpen - Флаг открытия модального окна
 * @property isOwnPost - Флаг, указывающий, является ли текущий пользователь владельцем поста
 * @property isLoading - Флаг загрузки данных поста
 * @property onClose - Функция для закрытия модального окна
 */
type PostModalContextValue = {
  post: Post | null
  isOpen: boolean
  isOwnPost: boolean
  isLoading: boolean
  onClose: () => void
  isAuth: boolean
  editMode: boolean
  setEditMode: (value: boolean) => void
  deleteMode: boolean
  setDeleteMode: (value: boolean) => void
  title: string
  setTitle: (value: string) => void
}

/**
 * Пропсы провайдера контекста модального окна поста
 * @property postId - ID поста для отображения (может быть null)
 * @property isOpen - Флаг открытия модального окна
 * @property children - Дочерние компоненты
 * @property onDismiss - Callback-функция, вызываемая при закрытии модального окна
 */
type PostModalProviderProps = {
  postId: number | null
  isOpen: boolean
  children: ReactNode
  onDismiss: () => void
}

// Создаем контекст для модального окна поста
const PostModalContext = createContext<PostModalContextValue | null>(null)

/**
 * Хук для использования контекста модального окна поста
 * @throws {Error} Если хук используется вне PostModalContextProvider
 * @returns {PostModalContextValue} Значение контекста модального окна
 */
export const usePostModalContext = () => {
  const context = useContext(PostModalContext)

  if (!context) {
    throw new Error("usePostModalContext must be used within PostModalContextProvider")
  }

  return context
}

/**
 * Провайдер контекста модального окна поста
 * Управляет состоянием модального окна, загрузкой данных поста и синхронизацией с URL
 */
export const PostModalContextProvider = ({ postId, isOpen, children, onDismiss }: PostModalProviderProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  // Флаг для контроля момента начала загрузки данных поста
  const [shouldFetch, setShouldFetch] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [title, setTitle] = useState("")

  // Определяем актуальный ID поста: из пропсов или из URL параметров
  const actualPostId = postId ?? Number(searchParams.get("postId")) ?? null

  // Загружаем данные поста с помощью RTK Query
  // skip: true предотвращает загрузку, пока модальное окно не открыто или нет ID поста
  const {
    data: post,
    isFetching,
    isLoading,
  } = useGetPostByIdQuery(actualPostId ?? 0, {
    skip: !isOpen || !actualPostId || !shouldFetch,
  })
  // Получаем данные текущего пользователя для проверки владения постом
  const { data: me } = useMeQuery()
  useEffect(() => {
    if (isOpen && actualPostId) {
      setShouldFetch(true)
    }
  }, [isOpen, actualPostId])

  // Эффект для сброса флага загрузки при закрытии модального окна
  // Это помогает избежать ненужных запросов к API
  useEffect(() => {
    if (!isOpen) {
      setShouldFetch(false)
    }
  }, [isOpen])

  // Мемоизированная проверка, является ли текущий пользователь владельцем поста
  const isOwnPost = useMemo(() => {
    if (!post || !me) {
      return false
    }

    return post.ownerId === me.userId
  }, [post, me])

  const isAuth = useMemo(() => {
    if (!me) {
      return false
    }
    return !!me
  }, [me])
  /**
   * Обработчик закрытия модального окна
   * Удаляет параметр postId из URL и вызывает callback onDismiss
   */
  const handleClose = useCallback(() => {
    if (actualPostId) {
      // Создаем новые параметры URL без postId
      const params = new URLSearchParams(searchParams.toString())
      params.delete("postId")
      // Обновляем URL без перезагрузки страницы и без прокрутки
      router.push(`?${params.toString()}`, { scroll: false })
    }

    // Вызываем callback для уведомления родительского компонента о закрытии
    onDismiss()
  }, [actualPostId, onDismiss, router, searchParams])

  // Мемоизированное значение контекста для оптимизации производительности
  const value = useMemo<PostModalContextValue>(
    () => ({
      post: post ?? null,
      isOpen,
      isOwnPost,
      isLoading: isLoading || isFetching, // Объединяем оба флага загрузки
      onClose: handleClose,
      isAuth,
      editMode,
      setEditMode,
      title,
      setTitle,
      deleteMode,
      setDeleteMode,
    }),
    [
      post,
      isOpen,
      isOwnPost,
      handleClose,
      isLoading,
      isFetching,
      isAuth,
      editMode,
      setEditMode,
      title,
      deleteMode,
      setDeleteMode,
    ]
  )

  return <PostModalContext.Provider value={value}>{children}</PostModalContext.Provider>
}
