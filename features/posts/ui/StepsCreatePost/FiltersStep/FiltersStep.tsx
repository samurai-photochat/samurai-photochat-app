import Image from "next/image"
import { Filter } from "./Filter/Filter"
import s from "./FiltersStep.module.scss"
type Props = {
  photo: string
}

type Filter = {
  id: number
  name: string
}
const filters: Array<Filter> = [
  { id: 1, name: "Normal" },
  { id: 2, name: "Clarendon" },
  { id: 3, name: "Lark" },
  { id: 4, name: "Gingham" },
  { id: 5, name: "Moon" },
  { id: 6, name: "Gingham" },
  { id: 7, name: "Gingham" },
  { id: 8, name: "Moon" },
  { id: 9, name: "Gingham" },
]

export const FilterStep = ({ photo }: Props) => {
  return (
    <div className={s.content}>
      <div className={s.photo}>
        <Image src={photo} alt={"фото"} width={490} height={503} />
      </div>
      <div className={s.filtersBlock}>
        {filters.map((filter) => {
          return <Filter key={filter.id} title={filter.name} img={photo} />
        })}
      </div>
    </div>
  )
}
