import voidImage from "@/shared/assets/svg/voidImage.svg"
import Image from "next/image"
import s from "./CreatePostWindow.module.css"
import {Button} from '@/shared/ui'

export const CreatePostWindow = () => {
  return (
    <div className={s.window}>
      <h1 className={s.title}>Add Photo</h1>
      <div className={s.content}>
          <hr className={s.topBorder} />
          <div className={s.imageWrapper}>
              <Image src={voidImage} alt={"void image"} />
          </div>
          <div className={s.buttonsContainer}>
              <Button className={s.button} variant={'primary'}>Select from Computer</Button>
              <Button className={s.button} variant={'outlined'}>Open Draft</Button>
          </div>
      </div>
    </div>
  )
}
