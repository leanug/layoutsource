const DesignDetails = ({ design }) => {
  const { likes, views, updatedAt, link, fonts, title } = design

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-lg px-8 py-6">
      <div className="mb-4">
        <span className="font-semibold">Title:</span> {title}
      </div>

      <div className="mb-4">
        <span className="font-semibold">Likes:</span> {likes}
      </div>

      <div className="mb-4">
        <span className="font-semibold">Views:</span> {views}
      </div>

      <div className="mb-4">
        <span className="font-semibold">Updated at:</span> {updatedAt}
      </div>

      <div className="mb-4">
        <span className="font-semibold">Visit:</span>{' '}
        <a href={link} className="text-blue-500 hover:underline">
          {link}
        </a>
      </div>

      {fonts && (
        <p className="mt-4">
          {fonts.map((font, index) => (
            <span key={index} className="mr-2 py-1 px-3 text-sm font-semibold">
              {font}
            </span>
          ))}
        </p>
      )}
    </div>
  );
};

export default DesignDetails
