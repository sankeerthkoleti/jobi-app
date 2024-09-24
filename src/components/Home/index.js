import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = props => {
  const change_route = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div>
      <div className="home-container">
        <Header />
        <div className="home-content">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="find-jobs-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
