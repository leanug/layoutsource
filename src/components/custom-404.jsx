export const Custom404 = ({ message }) => {
  return (
    <section>
      <div className="section-full">
        <h1>404 - Page Not Found</h1>
        {
          message ? (
            <p>{ message }</p>
          ) : (
            <p>Oops! It seems like you've taken a wrong turn. While you're here, explore some of our popular designs that match the color palette.</p>
          )
        }
      </div>
    </section>
  )
}