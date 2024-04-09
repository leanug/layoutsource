export const LoadingIndicator = ({
  size = 'loading-md',
  color = 'dark:text-white',
}) => (
  <>
    <span className={`loading loading-spinner ${size} ${color}`}></span>
    <span className="sr-only">Loading...</span>
  </>
)
