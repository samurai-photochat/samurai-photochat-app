import { useGetUserPostsInfiniteQuery } from "@/features/posts/api/postsApi"
import { useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import s from "./PostsGrid.module.scss"
import { Loader } from "@/shared/ui/loader/Loader"

type PostsGridProps = {
  isOwner: boolean
  userId: number
}

export const PostsGrid = ({ isOwner, userId }: PostsGridProps) => {
  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetUserPostsInfiniteQuery({ userId })
  const loadRef = useRef<HTMLDivElement>(null)
  const posts = data?.pages.flatMap((page) => page.items) ?? []

  const loadMoreHandler = useCallback(() => {
    if (isOwner && hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }, [isOwner, hasNextPage, isFetching, fetchNextPage])

  useEffect(() => {
    if (!isOwner) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.length > 0 && entries[0].isIntersecting) {
          loadMoreHandler()
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    )
    const currentObserverRef = loadRef.current
    if (currentObserverRef) {
      observer.observe(currentObserverRef)
    }
    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef)
      }
    }
  }, [isOwner, loadMoreHandler])
  const visiblePosts = isOwner ? posts : posts.slice(0, 8)
  return (
    <div className={s.grid}>
      {visiblePosts.map((post) => (
        <div key={post.id}>
          <Image src={post.images[0]?.url} alt={post.description} />
        </div>
      ))}
      <div ref={loadRef} style={{ height: 1 }} />
      {isFetchingNextPage && <div>Loading</div>}
    </div>
  )
}
