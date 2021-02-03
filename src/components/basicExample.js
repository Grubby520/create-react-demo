// react-router-dom
import React from 'react'
import  { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Home = () => (
    <div>
        <h3>Home</h3>
    </div>
)

const About = () => (
    <div>
        <h3>About</h3>
    </div>
)

const Topic = (router) => {
    // console.log(router)
    const { match: { params } } = router
    return (
        <div>
            <h4>{params.topicId}</h4>
        </div>
    )
}

const DefaultComponent = () => (
    <div className="default-text">Please select a topic.</div>
)

const Topics = (router) => {
    // console.log(router)
    const { match } = router
    return (
        <div className="child-nav">
        <Router>
            <ul>
                <li>
                    <Link to={`${match.url}/first`}>first</Link>
                </li>
                <li>
                    <Link to={`${match.url}/second`}>second</Link>
                </li>
                <li>
                    <Link to={`${match.url}/third`}>third</Link>
                </li>
            </ul>
            <Route path={`${match.url}/:topicId`} component={Topic}></Route>
            {/* 默认值 */}
            <Route
                exact
                path={match.url}
                render={DefaultComponent}
            ></Route>
        </Router>
    </div>
    )
}

export const BasicExample = () => (
    <Router>
        <div className="basic-container">
            {/* 导航 */}
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/topics">Topics</Link>
                </li>
            </ul>
            {/* 类比 router-view 使用 \component\ property  exact 默认选中项? */}
            <Route exact path="/" component={Home}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/topics" component={Topics}></Route>
        </div>
    </Router>
)
