import { useRouter } from "next/router"

export default function CollectionPage () {
  const router = useRouter()
  console.log(router);

  return (
    <section className="section-full">
      <h1>Collection</h1>
    </section>
  )
}