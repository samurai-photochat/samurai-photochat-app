import Image from "next/image"
import postPhoto from "@/shared/assets/img/posts/bigPhoto.png"
import postPhoto1 from "@/shared/assets/img/posts/postPhoto1.png"
import postPhoto2 from "@/shared/assets/img/posts/postPhoto2.png"
import postPhoto3 from "@/shared/assets/img/posts/postPhoto3.png"
import photoLike1 from "@/shared/assets/img/posts/photoLike1.png"
import photoLike2 from "@/shared/assets/img/posts/photoLike2.png"

import "./PostContent.css"
import { useGetPostQuery } from "@/features/posts/api/postsApi"

type PostIdType = {
  postId: number
}
export function PostContent({ postId }: PostIdType) {
  const { data, isLoading } = useGetPostQuery(postId)

  console.log(data)

  const formattedDate = data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : null

  const comments = [
    {
      photo: postPhoto,
      time: "2 hours ago",
      showAnswers: false,
    },
    {
      photo: postPhoto3,
      time: formattedDate,
      showAnswers: false,
    },
    {
      photo: postPhoto1,
      time: "2 hours ago",
      showAnswers: true,
    },
    {
      photo: postPhoto2,
      time: "14:46",
      showAnswers: false,
    },
  ]

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
          {comments.map((comment, index) => (
            <div key={index} className="post">
              <Image src={comment.photo} alt="Avatar" className="post-avatar" />
              <div className="post-content">
                <p className="post-text">
                  <span className="bold-text-14">UserName</span> Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <span className="post-time">{comment.time}</span>

                {comment.showAnswers && (
                  <p>
                    <span className="post-time">---- View Answers (1)</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="posts-footer">
          <div className="posts-like">
            <Image src={photoLike1} alt="PhotoLike" className="post-photolike first" />
            <Image src={photoLike2} alt="PhotoLike" className="post-photolike" />
            <Image src={postPhoto} alt="PhotoLike" className="post-photolike" />

            <p className="posts-counter h3">2 243 </p>
          </div>
          <p className="post-time">July 3, 2025</p>
        </div>
      </div>
    </div>
  )
}
