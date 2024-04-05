import { useDesigns } from '@/hooks'


const DesignDataProvider = ({ children }) => {
  useDesigns()
  return <>{children}</>
}

export default DesignDataProvider