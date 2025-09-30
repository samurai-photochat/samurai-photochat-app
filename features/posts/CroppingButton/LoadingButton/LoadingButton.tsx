"use client"
import s from "./LoadingButton.module.css"
import { ImageOutlineIcon } from "@/shared/assets/icons/components/ImageOutlineIcon"
import { CroppingButton } from "@/features/posts/CroppingButton/CroppingButton"
import { PlusCircleOutlineIcon } from "@/shared/assets/icons/components/PlusCircleOutlineIcon"
import { CloseOutline } from "@/shared/assets/icons/components/CloseOutline"
import { CanvasImage } from "@/features/posts/ui/StepsCreatePost/CroppingStep/CroppingStep"

type Props = {
  images: CanvasImage[]
  deleteImage: (index: number) => void
  addImage: (e: React.ChangeEvent<HTMLInputElement> | null) => void
}

export const LoadingButton = ({ images, deleteImage, addImage }: Props) => {
  return (
    <CroppingButton
      hidden={
        <div className={s.window}>
          <div
            className={s.imageList}
            style={{ gridTemplateColumns: `${images.length < 4 ? "auto ".repeat(images.length) : "auto ".repeat(4)}` }}
          >
            {images.map((image, i) => {
              const file = image.file
              const deleteImageHandler = () => deleteImage(i)
              return (
                <div
                  key={i}
                  className={s.image}
                  style={{
                    backgroundImage: `url(${image.preview})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <button key={file.name} className={s.closeButton} onClick={deleteImageHandler}>
                    <CloseOutline />
                  </button>
                </div>
              )
            })}
          </div>
          <button className={s.addButton}>
            <PlusCircleOutlineIcon />
            <input accept={"image/png, image/jpeg, image/jpg"} type="file" multiple onChange={addImage} />
          </button>
        </div>
      }
      buttonChildren={<ImageOutlineIcon />}
    />
  )
}
