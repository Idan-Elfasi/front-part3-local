import { Link } from 'react-router-dom'
import { ToyPreview } from './ToyPreview'

export function ToyList({ toys, onRemoveToy, loggedinUser }) {
  return (
    <section className="toy-list">
      <ul>
        {toys.map(toy => (
          <li key={toy._id}>
            <ToyPreview toy={toy} />
            {!loggedinUser ? <button>no user login</button> : !loggedinUser.isAdmin ? <div>the user not admin</div>
              : <div>
                <button>
                  <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                </button>
                <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
              </div>}
          </li>
        ))}
      </ul>
    </section>
  )
}
