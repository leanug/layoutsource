export function DesignItem (props) {
  const { layout: { title, url } } = props
 
  return (
    <>
      <div className="max-w-xl w-full mx-auto bg-gray-50 rounded-xl shadow-md overflow-hidden">
        <img className="h-48 w-full object-cover" src="https://via.placeholder.com/300" alt="Placeholder Image" />
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800">{ title }</h3>
          <p className="text-base text-gray-600">{ title }: <a href={ url } className="text-blue-500 hover:underline">{ url }</a></p>
        </div>
      </div>
    </>
  )
}