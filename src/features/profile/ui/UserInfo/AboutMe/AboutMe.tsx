import s from "./AboutMe.module.scss"
export const AboutMe = ({ aboutMe }: { aboutMe: string | undefined }) => {
  return (
    <div className={s.aboutMe}>
      <p>{aboutMe}</p>
    </div>
  )
}
