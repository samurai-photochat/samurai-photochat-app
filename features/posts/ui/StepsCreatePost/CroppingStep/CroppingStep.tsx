import Button from "@/shared/ui/button/button"
import Image from "next/image"
import FormatIcon from "@/shared/assets/svg/expand-outline.svg"
import ScaleIcon from "@/shared/assets/svg/maximize-outline.svg"
import GroupIcon from "@/shared/assets/svg/Layer 2.svg"
import s from "./CroppingStep.module.scss"
export const CroppingStep = () => {
  return (
    <div className={s.buttonPanel}>
      <div className={s.boxButton}>
        <Button className={s.cropinngButton} variant="text">
          <Image src={FormatIcon} alt="закрыть" />
        </Button>
        <Button className={s.cropinngButton} variant="text">
          <Image src={ScaleIcon} alt="закрыть" />
        </Button>
      </div>
      <Button className={s.cropinngButton} variant="text">
        <Image src={GroupIcon} alt="закрыть" />
      </Button>
    </div>
  )
}
