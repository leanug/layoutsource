import { useRef, useDebugValue, useEffect } from "react"

export function useRenderCount() {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current++
  });
  useDebugValue(`Renders: ${renderCount.current}`)
  console.log(`Renders: ${renderCount.current}`)

  return renderCount.current;
}