import s from "./Username.module.scss"

export const Username = ({ username }: { username: string | undefined }) => {
  return (
    <div className={s.username}>
      <span>{username}</span>
    </div>
  )
}
