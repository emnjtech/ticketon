import React from 'react'
import Hero from './hero'
import TopNavBar from './TopNavBar'
import { Route, Routes } from 'react-router-dom'
import NewHome from './NewHome'
import EventFullDisplay from './EventFullDisplay'
import CreateEvent from './CreateEvent'
import SignIn from './signIn'
import SearchResults from './searchResults'
import { ErrorBoundary } from 'react-error-boundary';

function ErrorHandler({ error }) {
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <div>
      <Routes>
        <Route path="/" element={
          <><TopNavBar />
            <Hero />
            <NewHome />
          </>
        } />

        <Route path="/eventSummary/:eventId" element={
          <><TopNavBar />
            <EventFullDisplay />
          </>
        } />
        <Route path="/create-event" element={
          <><TopNavBar />
            <CreateEvent />
          </>
        } />

        <Route path="/signIn" element={
          <><TopNavBar />
            <SignIn />
          </>
        } />
        <Route path="/searchResults" element={
          <><TopNavBar />
            <SearchResults />
          </>
        } />


            
      </Routes>
    </div>
    </ErrorBoundary >
    
  )
}