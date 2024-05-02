export const LoadingIndicator = ({
  size = 'loading-md',
  color = '',
  centered = false,
}) => (
  <div
    className={
      centered
        ? 'flex text-center items-center justify-center my-12 w-full h-full'
        : ''
    }
  >
    <span className={`loading loading-spinner ${size} ${color}`}></span>
    <span className="sr-only">Loading...</span>
  </div>
)
