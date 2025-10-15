"use client"
import { useGetUserPostsPaginationInfiniteQuery } from "@/features/posts/api/postsApi"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import s from "./PostsGrid.module.scss"
import { PostModal } from "@/features/posts/ui"
type PostsGridProps = {
  isOwner: boolean
  userId: number
}

export const PostsGrid = ({ isOwner, userId }: PostsGridProps) => {
  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetUserPostsPaginationInfiniteQuery({
    userId,
  })
  const loadRef = useRef<HTMLDivElement>(null)
  const posts = data?.pages.flatMap((page) => page.items) ?? []
  useEffect(() => {
    if (!isOwner || !loadRef.current) return
    const ref = loadRef.current
    const observer = new IntersectionObserver(
      async (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage && !isFetching) {
          observer.unobserve(ref)
          const prevScrollHeight = document.body.scrollHeight
          await fetchNextPage()
          const newScrollHeight = document.body.scrollHeight
          const heightDifference = newScrollHeight - prevScrollHeight
          window.scrollBy({ top: -heightDifference, behavior: "instant" })
          observer.observe(ref)
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    )
    observer.observe(ref)
    return () => observer.disconnect()
  }, [isOwner, hasNextPage, isFetchingNextPage, isFetching, fetchNextPage])
  const visiblePosts = isOwner ? posts : posts.slice(0, 8)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const handleOpenPost = (postId: number) => {
    setSelectedPostId(postId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPostId(null)
  }
  return (
    <div className={s.grid}>
      {visiblePosts.map((post) => (
        <div key={post.id} onClick={() => handleOpenPost(post.id)}>
          <Image
            width={post.images[0].width}
            height={post.images[0].height}
            className={s.postImage}
            src={post.images[0]?.url}
            alt={post.description}
          />
        </div>
      ))}
      <div ref={loadRef} style={{ height: 1 }} />
      {isFetchingNextPage && <div>Loading...</div>}
      <PostModal isOpen={isModalOpen} postId={selectedPostId} onClose={handleCloseModal} />
    </div>
  )
}
