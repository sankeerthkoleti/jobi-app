import Header from '../Header'
import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {FaSearch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import JobItems from '../JobItems'

class Jobs extends Component {
  state = {
    profile: {},
    employment_type: '',
    minimum_package: '',
    search: '',
    jobs_list: [],
    profilestatus: 'loading',
    jobitemsstatus: 'loading',
  }

  get_details = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    let response = await fetch(url, options)

    if (response.ok === true) {
      response = await response.json()
      const {profile_details} = response
      console.log(response, profile_details)
      this.setState({profile: profile_details, profilestatus: 'success'})
    } else {
      this.setState({profilestatus: 'fail'})
    }
  }

  get_jobs = async () => {
    const {employment_type, minimum_package, search} = this.state

    const jwt_token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employment_type}&minimum_package=${minimum_package}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
      method: 'GET',
    }
    let response = await fetch(url, options)
    if (response.ok === true) {
      response = await response.json()
      const {jobs} = response
      this.setState({jobs_list: jobs, jobitemsstatus: 'success'})
    } else {
      this.setState({jobitemsstatus: 'Fail'})
    }
  }

  componentDidMount() {
    this.get_details()
    this.get_jobs()
  }

  fulltime = () => {
    if (this.state.employment_type === '') {
      this.setState(
        p => ({
          employment_type: `${p.employment_type}FULLTIME`,
        }),
        this.get_jobs,
      )
    } else {
      this.setState(
        p => ({
          employment_type: `${p.employment_type},FULLTIME`,
        }),
        this.get_jobs,
      )
    }
  }

  parttime = () => {
    if (this.state.employment_type === '') {
      this.setState(
        p => ({
          employment_type: `${p.employment_type}PARTTIME`,
        }),
        this.get_jobs,
      )
    } else {
      this.setState(
        p => ({
          employment_type: `${p.employment_type},PARTTIME`,
        }),
        this.get_jobs,
      )
    }
  }

  freelance = () => {
    if (this.state.employment_type === '') {
      this.setState(
        p => ({
          employment_type: `${p.employment_type}FREELANCE`,
        }),
        this.get_jobs,
      )
    } else {
      this.setState(
        p => ({
          employment_type: `${p.employment_type},FREELANCE`,
        }),
        this.get_jobs,
      )
    }
  }

  internship = () => {
    if (this.state.employment_type === '') {
      this.setState(
        p => ({
          employment_type: `${p.employment_type}INTERNSHIP`,
        }),
        this.get_jobs,
      )
    } else {
      this.setState(
        p => ({
          employment_type: `${p.employment_type},INTERNSHIP`,
        }),
        this.get_jobs,
      )
    }
  }

  ten = () => {
    if (this.state.employment_type === '') {
      this.setState(
        p => ({
          minimum_package: `${p.employment_type}1000000`,
        }),
        this.get_jobs,
      )
    } else {
      this.setState(
        p => ({
          minimum_package: `${p.employment_type},1000000`,
        }),
        this.get_jobs,
      )
    }
  }

  twenty = () => {
    if (this.state.employment_type === '') {
      this.setState(
        p => ({
          minimum_package: `${p.employment_type}2000000`,
        }),
        this.get_jobs,
      )
    } else {
      this.setState(
        p => ({
          minimum_package: `${p.employment_type},2000000`,
        }),
        this.get_jobs,
      )
    }
  }

  thirty = () => {
    if (this.state.employment_type === '') {
      this.setState(
        p => ({
          minimum_package: `${p.employment_type}3000000`,
        }),
        this.get_jobs,
      )
    } else {
      this.setState(
        p => ({
          minimum_package: `${p.employment_type},3000000`,
        }),
        this.get_jobs,
      )
    }
  }

  fourty = () => {
    if (this.state.employment_type === '') {
      this.setState(
        p => ({
          minimum_package: `${p.employment_type}4000000`,
        }),
        this.get_jobs,
      )
    } else {
      this.setState(
        p => ({
          minimum_package: `${p.employment_type},4000000`,
        }),
        this.get_jobs,
      )
    }
  }

  xkl = event => {
    this.setState({search: event.target.value})
  }

  profile_card = () => (
    <div className="profile-card">
      <img
        src={this.state.profile.profile_image_url}
        className="profile-logo"
        alt="profile"
      />
      <h1 className="profile_name">{this.state.profile.name}</h1>
      <p className="profile-description">{this.state.profile.short_bio}</p>
    </div>
  )

  profile_failure = () => <button onClick={this.get_details}>Retry</button>

  load = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  x = () => {
    switch (this.state.profilestatus) {
      case 'fail':
        return this.profile_failure()
      case 'loading':
        return this.load()
      case 'success':
        return this.profile_card()
    }
  }

  co = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  po = () => (
    <ul className="jobList">
      {this.state.jobs_list.map(x => (
        <JobItems key={x.id} props={x} />
      ))}
    </ul>
  )

  showList = () => (
    <div>{this.state.jobs_list.length !== 0 ? this.po() : this.co()}</div>
  )

  job_failure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <button onClick={this.get_jobs}>Retry</button>
      <h1>Oops! Something Went Wrong</h1>
    </div>
  )

  y = () => {
    switch (this.state.jobitemsstatus) {
      case 'fail':
        return this.job_failure()
      case 'loading':
        return this.load()
      case 'success':
        return this.showList()
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="total">
          <div className="left">
            <div>{this.x()}</div>

            <hr />
            <div>
              <p className="e">Types of Employment</p>
              <ul className="te">
                <li>
                  <div>
                    <input type="checkbox" id="f" onChange={this.fulltime} />
                    <label htmlFor="f">Full Time</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input type="checkbox" id="p" onChange={this.parttime} />
                    <label htmlFor="p">Part Time</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input type="checkbox" id="fr" onChange={this.freelance} />
                    <label htmlFor="fr">Freelance</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input type="checkbox" id="i" onChange={this.internship} />
                    <label htmlFor="i">Internship</label>
                  </div>
                </li>
              </ul>
            </div>
            <hr />
            <div>
              <h1 className="e">Salary Range</h1>
              <ul className="te">
                <li>
                  <div>
                    <input type="radio" id="fk" onChange={this.ten} />
                    <label htmlFor="fk">10 LPA and above</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input type="radio" id="pk" onChange={this.twenty} />
                    <label htmlFor="pk">20LPA and above</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input type="radio" id="fk" onChange={this.thirty} />
                    <label htmlFor="fk">30LPA and above</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input type="radio" id="ik" onChange={this.fourty} />
                    <label htmlFor="ik">40LPA and above</label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="right">
            <div className="search">
              <input
                type="search"
                className="k"
                placeholder="search"
                onChange={this.xkl}
                value={this.state.search}
              />
              <button
                onClick={this.get_jobs}
                className="searchbtn"
                data-testid="searchButton"
              >
                <FaSearch color="white" />
              </button>
            </div>
            <div>{this.y()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
