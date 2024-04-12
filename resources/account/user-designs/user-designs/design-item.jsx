const DesignItem = ({ item }) => (
  <li
    key={item.id}
    className={`
      flex flex-row justify-between rounded-md 
      bg-gray-50 dark:bg-gray-700 px-4 py-2.5
    `}
  >
    <div>{item.attributes.title}</div>
    <div>{item.attributes.status ? 'Accepted' : 'Submited'}</div>
  </li>
)

export default DesignItem
