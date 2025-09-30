import s from "./ZoomingButton.module.css"
import { CroppingButton } from "@/features/posts/CroppingButton/CroppingButton"
import { MaximizeOutlineIcon } from "@/shared/assets/icons/components/MaximizeOutlineIcon"

type Props = {
  zoom: number
  setZoom: (zoom: number) => void
}

export const ZoomingButton = ({ zoom, setZoom }: Props) => {
  return (
    <CroppingButton
      hidden={
        <div className={s.zoom}>
          <input
            className={s.zoomInput}
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>
      }
      buttonChildren={<MaximizeOutlineIcon />}
    />
  )
}
