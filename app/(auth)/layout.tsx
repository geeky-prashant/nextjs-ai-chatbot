const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-rose-100 to-teal-100]">
      {children}
    </div>
  )
}

export default AuthLayout