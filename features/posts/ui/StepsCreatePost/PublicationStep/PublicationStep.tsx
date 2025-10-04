import { useAppSelector } from "@/app/hooks/useAppSelector"
import { useEffect, useRef, useState } from "react"
import { addPostAC, changeImageAC, selectImages } from "@/features/posts/model/postsSlice"
import { ImagesSlider } from "@/features/posts/ui/ImagesSlider/ImagesSlider"
import s from "./PublicationStep.module.scss"
import NextImage from "next/image"
import Pin from "@/shared/assets/svg/pin.svg"
import { Textarea } from "@/shared/ui/textarea/textarea"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { useCreatePostMutation, useDeletePostMutation, useUploadImagesMutation } from "@/features/posts/api/postsApi"
import { ApiErrorResultDto } from "@/features/auth/api/authApi.types"
import { setAppError } from "@/app/model/appSlice"

export const PublicationStep = () => {
  const images = useAppSelector(selectImages)
  const [position, setPosition] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const dispatch = useAppDispatch()

  const [createPost] = useCreatePostMutation()

  const [uploadImage] = useUploadImagesMutation()

  const [deletePost] = useDeletePostMutation()

  const [description, setDescription] = useState("")
  const [id, setId] = useState(8587)

  const setFilters = () => {
    images.forEach((image, index) => {
      const { file, src, zoom, scale, filter } = image
      const canvas = canvasRef.current
      const context = canvas?.getContext("2d")
      const imgElement = new Image()
      imgElement.src = src
      if (canvas && context) {
        const zoomedWidth = imgElement.width * zoom
        const zoomedHeight = imgElement.height * zoom
        const translateX = (imgElement.width - zoomedWidth) / 2
        const translateY = (imgElement.height - zoomedHeight) / 2

        canvas.width = imgElement.width
        canvas.height = imgElement.height

        if (canvas.width / scale > canvas.height) {
          canvas.width = canvas.height * scale
        } else canvas.height = canvas.width / scale

        context.clearRect(0, 0, imgElement.width, imgElement.height)

        context.filter = filter
        context.save()
        context.translate(translateX, translateY)
        context.scale(zoom, zoom)
        context.drawImage(
          imgElement,
          (canvas.width - imgElement.width) / 2,
          (canvas.height - imgElement.height) / 2,
          imgElement.width,
          imgElement.height
        )

        const fileExtension = (file.name.split(".").pop() || "").toLowerCase()
        let mimeType
        switch (fileExtension) {
          case "jpg":
          case "jpeg":
            mimeType = "image/jpeg"
            break
          case "png":
            mimeType = "image/png"
            break
          default:
            mimeType = "image/png"
        }

        canvas.toBlob((blob) => {
          if (blob) {
            const newFile = new File([blob], file.name, { type: blob.type })
            dispatch(changeImageAC({ index, image: { file: newFile } }))
          }
        }, mimeType)
      }
    })
  }

  useEffect(() => {
    setFilters()
  }, [])

  const createPostHandler = async () => {
    const formData = new FormData()
    images.forEach((image) =>
      formData.append(
        "file",
        image.file
        //   {
        //   ...image.file,
        //   type: "image/jpeg",
        // }
      )
    )
    uploadImage(formData)
      .then((imageRes) => {
        if (imageRes.error) {
          if ("data" in imageRes.error && imageRes.error.data) {
            const errorData = imageRes.error.data as ApiErrorResultDto
            dispatch(setAppError({ error: errorData.messages[0].message }))
          }
        } else {
          createPost({
            description,
            childrenMetadata: imageRes.data.images.map((image) => {
              return {
                uploadId: image.uploadId,
              }
            }),
          })
            .then((res) => {
              if (res.error) {
                if ("data" in res.error && res.error.data) {
                  const errorData = res.error.data as ApiErrorResultDto
                  dispatch(setAppError({ error: errorData.messages[0].message }))
                }
              } else {
                setId(res.data.id)
                dispatch(addPostAC({ post: res.data }))
              }
            })
            .catch((err) => dispatch(setAppError({ error: err?.data?.messages[0]?.message })))
        }
      })
      .catch((err) => dispatch(setAppError({ error: err?.data?.messages[0]?.message })))
  }

  const deletePostHandler = async (postId: number) => {
    deletePost({ postId })
      .then((res) => {
        if (res.error) {
          if ("data" in res.error && res.error.data) {
            const errorData = res.error.data as ApiErrorResultDto
            dispatch(setAppError({ error: errorData.messages[0].message }))
          }
        }
      })
      .catch((err) => dispatch(setAppError({ error: err?.data?.messages[0]?.message })))
  }

  return (
    <div className={s.content} style={{ position: "relative" }}>
      <button style={{ position: "absolute", zIndex: 100 }} onClick={createPostHandler}>
        create
      </button>
      <button style={{ position: "absolute", zIndex: 100, right: "0" }} onClick={() => deletePostHandler(id)}>
        delete
      </button>
      <ImagesSlider images={images} position={position} setPosition={setPosition} />
      <canvas style={{ position: "absolute", opacity: 0, width: "1px", height: "1px" }} ref={canvasRef}></canvas>
      <div className={s.PublicationBlock}>
        <div className={s.topContentWrap}>
          <div className={s.headerBlock}>
            <div className={s.userFhoto}>{/* фото User */}</div>
            <h3 className={s.userURL}>URLUser</h3>
          </div>
          <div className={s.textareaBlock}>
            <label htmlFor="message" className={s.label}>
              Add publication descriptions
            </label>
            <Textarea max={500} text={description} setText={setDescription} />
          </div>
        </div>
        <div className={s.bottomContentWrap}>
          <div className={s.inputLocationWrap}>
            <label className={s.label}>Add location</label>
            {/*<input className={s.locationInput} value={"New York"} />*/}
            <span className={s.span}>
              <NextImage src={Pin} alt="x" />
            </span>
          </div>
          <div className={s.locationWrap}>
            <label className={s.mainLocation}>New York</label>
            <label className={s.subLocation}>Washington Square Park</label>
          </div>
          <div className={s.locationWrap}>
            <label className={s.mainLocation}>New York</label>
            <label className={s.subLocation}>Washington Square Park</label>
          </div>
        </div>
      </div>
    </div>
  )
}
