import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute'
import LearningRoute from '../../routes/LearningRoute/LearningRoute'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import './App.css'
import { ContextProvider } from '../../Context'
import AnswerRoute from '../../routes/AnswerRoute/AnswerRoute'

export default class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    const { hasError } = this.state
    return (
        <ContextProvider>
          <div className='App'>
            <Header />
            <main>
              {hasError && (
                <p>There was an error! Oh no!</p>
              )}
              <Switch>
                <PrivateRoute
                  exact
                  path={'/'}
                  component={DashboardRoute}
                />
                <PrivateRoute
                  path={'/learn'}
                  component={LearningRoute}
                />
                <PrivateRoute
                  path={'/answer'}
                  component={AnswerRoute}
                />
                <PublicOnlyRoute
                  path={'/register'}
                  component={RegistrationRoute}
                />
                <PublicOnlyRoute
                  path={'/login'}
                  component={LoginRoute}
                />
                <Route
                  component={NotFoundRoute}
                />
              </Switch>
            </main>
          </div>
        </ContextProvider> 
    );
  }
}
