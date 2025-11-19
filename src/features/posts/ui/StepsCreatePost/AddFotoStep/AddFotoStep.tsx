import Image from "next/image"
import voidImage from "@/shared/assets/svg/voidImage.svg"
import Button from "@/shared/ui/button/button"
import s from "./AddFotoStep.module.scss"
import { useAppSelector } from "@/shared/store/useAppSelector"
import { selectImages } from "@/features/posts/model/postsSlice"

type PropsOne = {
  draft?: true
  handle: (e: React.ChangeEvent<HTMLInputElement> | null) => void
  openDraft: () => void
}

export const AddFotoStep = ({ handle, openDraft, draft }: PropsOne) => {
  const images = useAppSelector(selectImages)

  return (
    <>
      <div className={s.imageWrapper}>
        <Image
          src={voidImage}
          // width={post && post.images[0].width}
          // height={post && post.images[0].height}
          alt={"void image"}
        />
      </div>
      <div className={s.buttonsContainer}>
        <Button className={s.button} variant={"primary"}>
          <input accept={"image/png, image/jpeg, image/jpg"} type="file" onChange={(e) => handle(e)} />
          Open from Computer
        </Button>
        {draft && (
          <Button className={s.button} variant={"outlined"} disabled={images.length === 0} onClick={openDraft}>
            Open Draft
          </Button>
        )}
      </div>
    </>
  )
}
