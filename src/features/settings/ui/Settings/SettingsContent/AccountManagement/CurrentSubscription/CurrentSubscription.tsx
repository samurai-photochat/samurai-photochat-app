import CustomCheckbox from "@/shared/ui/checkbox/checkbox"
import s from "./CurrentSubscription.module.scss"

type Props = {
  date: string | undefined
  autoRenewal: boolean | undefined
  handler: () => void
}

export const CurrentSubscription = (props: Props) => {
  const { date, autoRenewal, handler } = props

  // Проверка на undefined
  const newDate = date ? new Date(Date.parse(date)) : new Date()
  const checket = autoRenewal ? autoRenewal : false
  // Дата следующего платежа
  const NextPaumentDate = new Date(newDate)
  NextPaumentDate.setDate(NextPaumentDate.getDate() + 1)

  return (
    <div className={s.wrapper}>
      <h3 className={s.label}>Current Subscription:</h3>
      <div className={s.container}>
        <div className={s.box}>
          <p className={s.title}>Expire at</p>
          <span className={s.date}>{`${newDate.toLocaleDateString("ru-RU", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })}`}</span>
        </div>
        <div className={s.box}>
          <p className={s.title}>Next payment</p>
          <span className={s.date}>{`${NextPaumentDate.toLocaleDateString("ru-RU", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })}`}</span>
        </div>
      </div>
      <CustomCheckbox checked={checket} label="Auto-Renewal" onChange={handler} disabled={autoRenewal === undefined} />
    </div>
  )
}
