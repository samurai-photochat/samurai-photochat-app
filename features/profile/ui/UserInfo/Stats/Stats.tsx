import s from "./Stats.module.scss"

type StatsProps = {
  following: number | undefined
  followers: number | undefined
  publications: number | undefined
}

export const Stats = ({ following, followers, publications }: StatsProps) => {
  return (
    <div className={s.profileStats}>
      <div className={s.statsContainer}>
        <span className={s.statsCount}>{following}</span>
        <span className={s.statsLabel}>Following</span>
      </div>
      <div className={s.statsContainer}>
        <span className={s.statsCount}>{followers}</span>
        <span className={s.statsLabel}>Followers</span>
      </div>
      <div className={s.statsContainer}>
        <span className={s.statsCount}>{publications}</span>
        <span className={s.statsLabel}>Publications</span>
      </div>
    </div>
  )
}
