import { ReactNode } from "react"

type Props = {
  icon: ReactNode
}

const IconWrapper = ({ icon }: Props) => {
  return <span style={{ margin: 0 }}>{icon}</span>
}

export default IconWrapper
