import './index.css'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'

const JobItems = r => {
  const {props} = r
  const {id} = props
  console.log(props)
  return (
    <Link to={`/jobs/${id}`} className="link item">
      <li className="job_item">
        <div className="top">
          <div className="logocon">
            <img
              src={props.company_logo_url}
              className="company_logo"
              alt="company logo"
            />
          </div>
          <div>
            <h1 className="company_name">{props.title}</h1>
            <div className="kpl">
              <div className="logocon">
                <FaStar color="#fbbf24" className="start" />
              </div>
              <p>{props.rating}</p>
            </div>
          </div>
        </div>
        <div className="O">
          <div className="op">
            <p>{props.location}</p>
            <p>{props.employment_type}</p>
          </div>
          <p>{props.package_per_annum}</p>
        </div>
        <hr />
        <div>
          <h1 className="pl">Description</h1>
          <p className="def">{props.job_description}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobItems
