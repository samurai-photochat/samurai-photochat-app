import { ReactNode } from "react"

type Props = {
  icon: ReactNode
}

const IconWrapper = ({ icon }: Props) => {
  return <span>{icon}</span>
}

export default IconWrapper
