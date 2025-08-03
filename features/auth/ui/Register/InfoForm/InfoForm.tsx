import Image, { StaticImageData } from "next/image"
import s from "./InfoForm.module.css"
import Button from "@/shared/ui/button/button"
import { Form } from "radix-ui"
import { TextField } from "@/shared/ui/text-field/text-field"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpInputs, signUpSchema } from "@/shared/lib/signUpSchema/signUpSchema"

type Props = {
  title: string
  text: string
  textBtn: string
  img: StaticImageData
  isInput: boolean
  href?: string
}

export const InfoForm = ({ title, text, textBtn, isInput, img, href }: Props) => {
  // Валидация React-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<SignUpInputs>>({
    resolver: zodResolver(signUpSchema.partial()),
    defaultValues: { email: "" },
  })

  const onSubmit = () => {
    reset()
  }

  return (
    <div className={s.container}>
      <h3 className={s.title}>{title}</h3>
      <div className={s.text_container}>
        <p>{text}</p>
      </div>
      {isInput ? (
        <Form.Root className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={"Email"}
            type={"text"}
            {...register("email")}
            errorMessage={errors.email?.message}
            // className={s.field} доделать
          />
          <Button>{textBtn}</Button>
        </Form.Root>
      ) : (
        <div className={s.container_button}>
          <Button as={"a"} href={href}>
            {textBtn}
          </Button>
        </div>
      )}
      <Image className={s.img} src={img} alt="x" />
    </div>
  )
}
