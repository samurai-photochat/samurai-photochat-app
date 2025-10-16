import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { useGetPostByIdQuery } from "@/features/posts/api/postsApi"
import { Post } from "@/features/posts/api/postsApi.types"
import { useMeQuery } from "@/features/auth/api/authApi"

type PostModalContextValue = {
  post: Post | null
  isOpen: boolean
  isOwnPost: boolean
  isLoading: boolean
  onClose: () => void
}

type PostModalProviderProps = {
  postId: number | null
  isOpen: boolean
  children: ReactNode
  onDismiss: () => void
}

const PostModalContext = createContext<PostModalContextValue | null>(null)

export const usePostModalContext = () => {
  const context = useContext(PostModalContext)

  if (!context) {
    throw new Error("usePostModalContext must be used within PostModalContextProvider")
  }

  return context
}

export const PostModalContextProvider = ({ postId, isOpen, children, onDismiss }: PostModalProviderProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [shouldFetch, setShouldFetch] = useState(false)

  const actualPostId = postId ?? Number(searchParams.get("postId")) ?? null

  const {
    data: post,
    isFetching,
    isLoading,
  } = useGetPostByIdQuery(actualPostId ?? 0, {
    skip: !isOpen || !actualPostId || !shouldFetch,
  })
  const { data: me } = useMeQuery()

  useEffect(() => {
    if (isOpen && actualPostId) {
      setShouldFetch(true)
    }
  }, [isOpen, actualPostId])

  useEffect(() => {
    if (!isOpen) {
      setShouldFetch(false)
    }
  }, [isOpen])

  const isOwnPost = useMemo(() => {
    if (!post || !me) {
      return false
    }

    return post.ownerId === me.userId
  }, [post, me])

  const handleClose = useCallback(() => {
    if (actualPostId) {
      const params = new URLSearchParams(searchParams.toString())
      params.delete("postId")
      router.push(`?${params.toString()}`, { scroll: false })
    }

    onDismiss()
  }, [actualPostId, onDismiss, router, searchParams])

  const value = useMemo<PostModalContextValue>(
    () => ({
      post: post ?? null,
      isOpen,
      isOwnPost,
      isLoading: isLoading || isFetching,
      onClose: handleClose,
    }),
    [post, isOpen, isOwnPost, handleClose, isLoading, isFetching]
  )

  return <PostModalContext.Provider value={value}>{children}</PostModalContext.Provider>
}
