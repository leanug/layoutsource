const Categories = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h3 className="mb-3">Categories</h3>
      <div className="space-x-2">
        {categories.map((cat) => (
          <span
            key={cat.id}
            className="inline-block bg-gray-50 dark:bg-gray-700 px-2.5 py-1.5 rounded-lg"
          >
            {cat.attributes.title}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Categories
