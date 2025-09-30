import Image from "next/image"
import s from "./Filter.module.scss"
import { FilterTemplate } from "@/features/posts/ui/StepsCreatePost/FiltersStep/FiltersStep"

type Props = {
  filterTemplate: FilterTemplate
  img: string
  //aspectRatio: number
  onClick: () => void
}
export const Filter = ({ filterTemplate, img, onClick }: Props) => {
  const { title, filter } = filterTemplate
  return (
    // Надо сделать кнопкой
    <div className={s.filter}>
      <button className={s.img} style={{ position: "relative", objectFit: "cover" }} onClick={onClick}>
        <Image
          src={img}
          alt={`${title}`}
          layout="responsive"
          width={0}
          height={0}
          style={{
            // aspectRatio: aspectRatio,
            minWidth: "100%",
            minHeight: "100%",
            objectFit: "cover",
            filter: filter,
          }}
        />
      </button>
      <div className={s.titleBox}>
        <h4 className={s.title}>{title}</h4>
      </div>
    </div>
  )
}
