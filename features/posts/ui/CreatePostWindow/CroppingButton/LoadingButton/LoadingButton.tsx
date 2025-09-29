"use client"
import s from "./LoadingButton.module.css"
import { ImageOutlineIcon } from "@/shared/assets/icons/components/ImageOutlineIcon"
import { CroppingButton } from "@/features/posts/ui/CreatePostWindow/CroppingButton/CroppingButton"
import { CanvasEditor } from "@/features/posts/ui/CreatePostWindow/CanvasEditor/CanvasEditor"
import { useAppSelector } from "@/app/hooks/useAppSelector"
import { addFileAC, selectFiles, selectImages } from "@/features/posts/model/postsSlice"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { PlusCircleOutlineIcon } from "@/shared/assets/icons/components/PlusCircleOutlineIcon"

type Props = {
  setCurentImage: (index: number) => void
}

export const LoadingButton = ({ setCurentImage }: Props) => {
  const files = useAppSelector(selectFiles)
  const images = useAppSelector(selectImages)

  const dispatch = useAppDispatch()

  const setFilesData = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target?.files && e.target.files.length > 0) {
      dispatch(addFileAC({ file: e.target.files[0] }))
    }
  }

  return (
    <CroppingButton
      hidden={
        <div className={s.imageList} style={{ display: "flex", gap: "10px", position: "absolute", bottom: "100%" }}>
          {files.map((file, i) => {
            return (
              <button key={file.name} className={s.canvasButton} onClick={() => setCurentImage(i)}>
                <CanvasEditor
                  key={file.name}
                  file={file}
                  imageSrc={images[i].imageSrc}
                  className={s.canvas}
                ></CanvasEditor>
              </button>
            )
          })}
          <button className={s.addButton}>
            <PlusCircleOutlineIcon />
            <input accept={"image/png, image/jpeg, image/jpg"} type="file" multiple onChange={(e) => setFilesData(e)} />
          </button>
        </div>
      }
      buttonChildren={<ImageOutlineIcon />}
    />
  )
}
