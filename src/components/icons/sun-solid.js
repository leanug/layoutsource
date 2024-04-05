export const SunSolid = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="1em"
    height="1em"
    {...props}
  >
    <circle
      cx="256"
      cy="256"
      r="80"
      fill="none"
      stroke="currentColor"
      strokeWidth="32"
    />
    <path
      d="M256 32v64M256 416v64M96 96l64 64M416 96l-64 64M96 416l64-64M416 416l-64-64M32 256h64M416 256h64"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
  </svg>

)
