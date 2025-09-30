import { CroppingButton } from "@/features/posts/ui/CreatePostWindow/CroppingButton/CroppingButton"
import s from "./ResizingButton.module.css"
import { ImageOutlineIcon } from "@/shared/assets/icons/components/ImageOutlineIcon"
import { OneByOneModeIcon } from "@/shared/assets/icons/components/OneByOneModeIcon"
import { FourByFiveModeIcon } from "@/shared/assets/icons/components/FourByFiveModeIcon"
import { SixteenByNineModeIcon } from "@/shared/assets/icons/components/SixteenByNineModeIcon"
import { ExpandOutlineIcon } from "@/shared/assets/icons/components/ExpandOutlineIcon"

type Props = {
  setScale: (scale: number) => void
  defaultScale: number
}

export const ResizingButton = ({ setScale, defaultScale }: Props) => {
  return (
    <CroppingButton
      hidden={
        <div className={s.menu}>
          <button onClick={() => setScale(defaultScale)}>
            <span>Оригинал</span>
            <span style={{ marginRight: "-3px" }}>
              <ImageOutlineIcon />
            </span>
          </button>
          <button onClick={() => setScale(1)}>
            <span>1:1</span>
            <OneByOneModeIcon />
          </button>
          <button onClick={() => setScale(4 / 5)}>
            <span>4:5</span>
            <FourByFiveModeIcon />
          </button>
          <button onClick={() => setScale(16 / 9)}>
            <span>16:9</span>
            <SixteenByNineModeIcon />
          </button>
        </div>
      }
      buttonChildren={<ExpandOutlineIcon />}
    />
  )
}
