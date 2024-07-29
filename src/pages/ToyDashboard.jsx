import { MyChart } from "../cmps/MyChart";
import { useSelector } from 'react-redux'

export function ToyDashboard() {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  return (
    <section className="toy-dashboard">
      <div>Data only of the page that render in toy page,
      Inventory by label : Chart showing the percentage of toys that are in 
      stock by labels
      </div>
      <MyChart toys={toys} />
    </section>
  )
}
