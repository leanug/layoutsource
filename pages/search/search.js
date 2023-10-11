/* import { GridLayouts, NoResults, Pagination } from "@/components/shared" */
import { DisplayDesigns } from "@/containers"
import { NoResults } from "@/components"
import { Layout } from "@/api";

const layoutCtrl = new Layout()

export default function SearchPage (props) {
  const { data } = props
  console.log(data);
  const { 
    designs, 
    searchText, 
    pagination 
  } = data || {}

  return (
    <section className="section-full">
     {
        designs?.length ? (
          <div>
            <div className="flex flex-row justify-between mb-6">
              <h1 className="text-center">Query: { searchText }</h1>
              <div>
                2020 results
                <button className="border rounded-full p-3 bg-slate-100">Filter</button>
              </div>
            </div>
            
            <DisplayDesigns 
              layouts={ designs } 
              slug={ slug }
              pagination={ pagination }
              fetchDesigns={ (s, page) => layoutCtrl.searchDesigns(s, page) }
            />
          </div>
        ) : (
          <NoResults text="No results" />
        )
      }
    </section>
  )
}