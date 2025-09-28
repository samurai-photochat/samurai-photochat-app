import Image from "next/image"
import voidImage from "@/shared/assets/svg/voidImage.svg"
import Button from "@/shared/ui/button/button"
import s from "./AddFotoStep.module.scss"

type PropsOne = {
  handle: (e: React.ChangeEvent<HTMLInputElement> | null) => void
}

export const AddFotoStep = ({ handle }: PropsOne) => {
  return (
    <div>
      <div className={s.imageWrapper}>
        <Image src={voidImage} alt={"void image"} />
      </div>
      <div className={s.buttonsContainer}>
        <Button className={s.button} variant={"primary"}>
          <input accept={"image/png, image/jpeg, image/jpg"} type="file" multiple onChange={(e) => handle(e)} />
          Open from Computer
        </Button>
        <Button className={s.button} variant={"outlined"}>
          Open Draft
        </Button>
      </div>
    </div>
  )
}
