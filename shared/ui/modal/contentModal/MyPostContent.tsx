import Image from "next/image"
import bigPhoto from "@/shared/assets/img/posts/bigPhoto.png"
import palmaPhoto from "@/shared/assets/img/posts/palmaPhoto.png"
import postPhoto from "@/shared/assets/img/posts/bigPhoto.png"
import postPhoto1 from "@/shared/assets/img/posts/postPhoto1.png"
import postPhoto2 from "@/shared/assets/img/posts/postPhoto2.png"
import postPhoto3 from "@/shared/assets/img/posts/postPhoto3.png"
import photoLike1 from "@/shared/assets/img/posts/photoLike1.png"
import photoLike2 from "@/shared/assets/img/posts/photoLike2.png"

import "./MyPostContent.css"
import { useGetPostQuery } from "@/features/posts/api/postsApi"

type PostIdType = {
  postId: number
}
export function MyPostContent({ postId }: PostIdType) {
  const { data, isLoading } = useGetPostQuery(postId)

  console.log(data)

  const formattedDate = data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : null

  if (isLoading) {
    return <p>LOADING...</p>
  }
  return (
    <div className="container">
      <div className="photoPanel">
        <img src={data?.images[0].url} alt="ManPhoto" />
      </div>
      <div className="right-panel">
        <div className="posts-header">
          <img src={data?.images[0].url} alt="Avatar" className="post-avatar" />
          <p className="h3">{data?.userName}</p>
        </div>

        <div className="posts-list regular-text-14">
          <div className="post">
            <Image src={postPhoto} alt="Avatar" className="post-avatar" />
            <div className="post-content">
              <p className="post-text">
                <span className="bold-text-14">UserName</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <span className="post-time">2 hours ago</span>
            </div>
          </div>

          <div className="post">
            <Image src={postPhoto3} alt="Avatar" className="post-avatar" />
            <div className="post-content">
              <p className="post-text">
                <span className="bold-text-14">UserName</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <span className="post-time">{formattedDate}</span>
            </div>
          </div>
          <div className="post">
            <Image src={postPhoto1} alt="Avatar" className="post-avatar" />
            <div className="post-content">
              <p className="post-text">
                <span className="bold-text-14">UserName</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <span className="post-time">2 hours ago</span>
              <p>
                <span className="post-time">---- View Answers (1)</span>
              </p>
            </div>
          </div>
          <div className="post">
            <Image src={postPhoto2} alt="Avatar" className="post-avatar" />
            <div className="post-content">
              <p className="post-text">
                <span className="bold-text-14">UserName</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <span className="post-time">14:46</span>
            </div>
          </div>
        </div>

        <div className="posts-footer">
          <div className="posts-like">
            <Image src={photoLike1} alt="PhotoLike" className="post-photolike first" />
            <Image src={photoLike2} alt="PhotoLike" className="post-photolike" />
            <Image src={postPhoto} alt="PhotoLike" className="post-photolike" />

            <p className="posts-counter h3">2 243 "Like"</p>
          </div>
          <p className="post-time">July 3, 2025</p>
        </div>
      </div>
    </div>
  )
}
