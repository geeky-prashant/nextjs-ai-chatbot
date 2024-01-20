const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex items-center justify-center h-full bg-white">
      {children}
    </div>
  )
}

export default AuthLayout