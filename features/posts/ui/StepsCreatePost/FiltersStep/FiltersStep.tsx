import { Filter } from "./Filter/Filter"
import s from "./FiltersStep.module.scss"
import { useAppSelector } from "@/shared/lib/redux/useAppSelector"
import { changeImageAC, selectImages } from "@/features/posts/model/postsSlice"
import { useState } from "react"
import { ImagesSlider } from "@/shared/ui/ImagesSlider/ImagesSlider"
import { useAppDispatch } from "@/shared/lib/redux/useAppDispatch"

export type FilterTemplate = {
  id: number
  title: string
  filter: string
}
const filterTemplates: Array<FilterTemplate> = [
  { id: 1, title: "Normal", filter: "" },
  { id: 2, title: "Clarendon", filter: "sepia(.15) contrast(1.25) brightness(1.25) hue-rotate(5deg)" },
  { id: 3, title: "Lark", filter: "sepia(.25) contrast(1.2) brightness(1.3) saturate(1.25)" },
  { id: 4, title: "Gingham", filter: "contrast(1.1) brightness(1.1)" },
  { id: 5, title: "Moon", filter: "brightness(1.4) contrast(.95) saturate(0) sepia(.35)" },
  { id: 6, title: "Juno", filter: "sepia(.35) contrast(1.15) brightness(1.15) saturate(1.8)" },
  { id: 7, title: "Ludwig", filter: "sepia(.25) contrast(1.05) brightness(1.05) saturate(2)" },
  { id: 8, title: "Sierra", filter: "sepia(.25) contrast(1.5) brightness(.9) hue-rotate(-15deg)" },
  { id: 9, title: "Willow", filter: "brightness(1.2) contrast(.85) saturate(.05) sepia(.2)" },
]

export const FilterStep = () => {
  const images = useAppSelector(selectImages)
  const [position, setPosition] = useState(0)
  const currentImage = images[position]

  const dispatch = useAppDispatch()

  return (
    <div className={s.content}>
      <ImagesSlider images={images} startPosition={position} action={setPosition} />
      <div className={s.filtersBlock}>
        {filterTemplates.map((filterTemplate) => {
          const filter = filterTemplate.filter
          const setFilter = () => {
            dispatch(changeImageAC({ index: position, image: { filter } }))
          }
          return (
            <Filter
              key={filterTemplate.id}
              filterTemplate={filterTemplate}
              img={currentImage.url}
              //aspectRatio={currentImage.scale}
              onClick={setFilter}
            />
          )
        })}
      </div>
    </div>
  )
}
