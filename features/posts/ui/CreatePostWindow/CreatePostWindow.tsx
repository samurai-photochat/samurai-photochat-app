"use client"
import voidImage from "@/shared/assets/svg/voidImage.svg"
import Image from "next/image"
import s from "./CreatePostWindow.module.css"
import { Button } from "@/shared/ui"
import { useState } from "react"
import { ReactPhotoEditor, usePhotoEditor } from "react-photo-editor"

export const CreatePostWindow = () => {
  const [file, setFile] = useState<File>()

  const setFileData = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target?.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const {
    canvasRef,
    imageSrc,
    brightness,
    setBrightness,
    contrast,
    setContrast,
    saturate,
    setSaturate,
    grayscale,
    setGrayscale,
    rotate,
    setRotate,
    flipHorizontal,
    setFlipHorizontal,
    flipVertical,
    setFlipVertical,
    zoom,
    setZoom,
    mode,
    setMode,
    setLineColor,
    lineColor,
    setLineWidth,
    lineWidth,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
    handleWheel,
    downloadImage,
    resetFilters,
  } = usePhotoEditor({ file })

  return (
    <div className={s.window}>
      <input type="file" onChange={(e) => setFileData(e)} multiple={false} />
      {imageSrc && (
        <div className="canvas-container">
          <canvas
            style={{
              width: "100%",
              height: "503px",
              objectFit: "cover",
              minWidth: "100%",
              // maxHeight: "22rem",
              // maxWidth: "36rem",
              touchAction: "none",
            }}
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            // onWheel={handleWheel}
          />
        </div>
      )}

      <div className="controls">
        <div>
          <label>Brightness</label>
          <input
            type="range"
            min="0"
            max="200"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Contrast</label>
          <input
            type="range"
            min="0"
            max="200"
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Saturate</label>
          <input
            type="range"
            min="0"
            max="200"
            value={saturate}
            onChange={(e) => setSaturate(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Grayscale</label>
          <input
            type="range"
            min="0"
            max="100"
            value={grayscale}
            onChange={(e) => setGrayscale(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Rotate</label>
          <input type="range" min="0" max="360" value={rotate} onChange={(e) => setRotate(Number(e.target.value))} />
        </div>

        <div>
          <label>Zoom</label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>

        <div>
          <label>
            <input type="checkbox" checked={flipHorizontal} onChange={(e) => setFlipHorizontal(e.target.checked)} />
            Flip Horizontal
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" checked={flipVertical} onChange={(e) => setFlipVertical(e.target.checked)} />
            Flip Vertical
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={mode == "draw"}
              onChange={(e) => setMode(e.target.checked ? "draw" : "pan")}
            />
            Draw Mode
          </label>
        </div>

        {mode == "draw" && (
          <>
            <input type="color" onChange={(e) => setLineColor(e.target.value)} value={lineColor} />
            <input
              type="number"
              onChange={(e) => setLineWidth(Number(e.target.value))}
              value={lineWidth}
              min={2}
              max={100}
            />
          </>
        )}

        <div className="buttons rpe-flex rpe-gap-4">
          <button className="rpe-border rpe-p-1 rpe-rounded-md" onClick={resetFilters}>
            Reset
          </button>
          <button className="rpe-border rpe-p-1 rpe-rounded-md" onClick={downloadImage}>
            Save
          </button>
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className={s.window}>
  //     <h1 className={s.title}>Add Photo</h1>
  //     <div className={s.content}>
  //       <hr className={s.topBorder} />
  //       <div className={s.imageWrapper}>
  //         <Image src={voidImage} alt={"void image"} />
  //       </div>
  //       <div className={s.buttonsContainer}>
  //         <Button className={s.button} variant={"primary"}>
  //           <input accept={"image/png, image/jpeg, image/jpg"} type="file" multiple onChange={(e) => setFileData(e)} />
  //           Open from Computer
  //         </Button>
  //         <Button className={s.button} variant={"outlined"}>
  //           Open Draft
  //         </Button>
  //       </div>
  //     </div>
  //   </div>
  // )
}
