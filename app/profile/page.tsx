import Sidebar from "@/widgets/sidebar/sidebar"
import s from "./profile.module.css"
import { CreatePostWindow } from "@/features/posts/ui/CreatePostWindow/CreatePostWindow"

export default function Profile() {
  return (
    <div className={s.profile}>
      <Sidebar />
      <div className={s.content}>
        <h2>Content</h2>
        <CreatePostWindow />
      </div>
    </div>
  )
}
