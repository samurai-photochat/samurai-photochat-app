import Image from "next/image"
import s from "./Filter.module.scss"
type Props = {
  title: string
  img: string
}
export const Filter = ({ title, img }: Props) => {
  return (
    // Надо сделать кнопкой
    <div className={s.filter}>
      <div className={s.img}>
        <Image src={img} alt={`${title}`} width={108} height={108} />
      </div>
      <div className={s.titleBox}>
        <h4 className={s.title}>{title}</h4>
      </div>
    </div>
  )
}
