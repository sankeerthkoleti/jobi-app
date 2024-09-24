import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import JobItems from '../JobItems'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {
    job_details: {},
    similar_jobs: [],
    skills: [],
    life: {},
    cardstatus: 'loading',
  }

  geti = async () => {
    console.log(this.props)
    const jwt_token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
      method: 'GET',
    }

    let response = await fetch(url, options)

    if (response.ok === true) {
      response = await response.json()
      const {job_details, similar_jobs} = response
      const {life_at_company} = job_details
      this.setState({
        job_details,
        similar_jobs,
        skills: job_details.skills,
        life: life_at_company,
        cardstatus: 'success',
      })
    } else {
      this.setState({cardstatus: 'fail'})
    }
  }

  componentDidMount() {
    this.geti()
  }

  showcard = () => (
    <div className="total jk">
      <div className="job_item">
        <div className="top">
          <div className="logocon">
            <img
              src={this.state.job_details.company_logo_url}
              className="company_logo"
              alt="job details company logo"
            />
          </div>
          <div>
            <h1 className="company_name">{this.state.job_details.title}</h1>
            <div className="kpl">
              <div className="logocon">
                <FaStar color="#fbbf24" className="start" />
              </div>
              <p>{this.state.job_details.rating}</p>
            </div>
          </div>
        </div>
        <div className="O">
          <div className="op">
            <p>{this.state.job_details.location}</p>
            <p>{this.state.job_details.employment_type}</p>
          </div>
          <p>{this.state.job_details.package_per_annum}</p>
        </div>
        <hr />
        <div>
          <div>
            <h1 className="pl">Description</h1>
            <a
              href={this.state.job_details.company_website_url}
              target="_blank"
              rel="noreferrer"
            >
              Visit
            </a>
          </div>
          <p className="def">{this.state.job_details.job_description}</p>
        </div>
        <div>
          <h1 className="pl">Skills</h1>
          <ul className="sul">
            {this.state.skills.map(x => (
              <li className="li" key={x.name}>
                <div className="skillcon">
                  <img src={x.image_url} className="skillLogo" />
                </div>
                <p>{x.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <h1 className="pl">Life at Company</h1>
        <div>
          {this.state.life && (
            <div className="life">
              <p>{this.state.life.description}</p>
              <img src={this.state.life.image_url} alt="life at company" />
            </div>
          )}
        </div>
      </div>
      <div>
        <h1 className="pl">Similar Jobs</h1>
        <ul className="similar">
          {this.state.similar_jobs.map(x => (
            <JobItems props={x} key={x.id} />
          ))}
        </ul>
      </div>
    </div>
  )

  failure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.geti}>Retry</button>
    </div>
  )

  loader = () => (
    <div className="loader-container" data-testid="loader" className="opp">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  xa = () => {
    switch (this.state.cardstatus) {
      case 'fail':
        return this.failure()
      case 'success':
        return this.showcard()
      case 'loading':
        return this.loader()
    }
  }

  render() {
    console.log(this.state.life)
    return (
      <div>
        <Header />
        <div>{this.xa()}</div>
      </div>
    )
  }
}

export default JobItemDetails
