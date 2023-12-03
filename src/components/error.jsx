export const Error = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <p className="text-xl text-gray-100">{message}</p>
      </div>
    </div>
  )
}