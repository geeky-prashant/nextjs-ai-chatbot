import { Loader2 } from "lucide-react"
import { ButtonProps, Button } from "./ui/button"

type LoadingButtonProps = {
  loading: boolean
} & ButtonProps;

export default function LoadingButton({ children, loading, ...props }: LoadingButtonProps) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
      {children}
    </Button>
  )
}