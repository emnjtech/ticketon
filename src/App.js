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
import 'react-toastify/dist/ReactToastify.css';
import GenerateReceipt from './generateReceipt'
import ReprintTicket from './reprintTicket'
import MyBookings from './MyBookings'
import Footer from './Footer'
import HealthAndWellness from './HealthAndWellness'
import Music from './music'
import Picknics from './Picknics'
import Food from './Food'
import Religion from './Religion'
import Seminars from './Seminars'

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
              <Footer />
          </>
        } />

        <Route path="/eventSummary/:eventId" element={
          <><TopNavBar />
              <EventFullDisplay />
              <Footer />
          </>
        } />
        <Route path="/create-event" element={
          <><TopNavBar />
              <CreateEvent />
              <Footer />
          </>
        } />

        <Route path="/signIn" element={
          <><TopNavBar />
              <SignIn />
              <Footer />
          </>
        } />
        <Route path="/searchResults" element={
          <><TopNavBar />
              <SearchResults />
              <Footer />
          </>
        } />
          
          <Route path="generateTicket" element={
            <><TopNavBar />
              <GenerateReceipt />
              <Footer />
            </>
          } />

          <Route path="reprintTicket" element={
            <><TopNavBar />
              <ReprintTicket />
              <Footer />
            </>
          } />


          <Route path="myBookings" element={
            <><TopNavBar />
              <MyBookings />
              <Footer />
            </>
          } />

          <Route path="healthAndWellness" element={
            <><TopNavBar />
              <HealthAndWellness />
              <Footer />
            </>
          } />
          <Route path="musicConcertsFestivals" element={
            <><TopNavBar />
              <Music />
              <Footer />
            </>
          } />

          <Route path="Picknics" element={
            <><TopNavBar />
              <Picknics/>
              <Footer />
            </>
          } />
          <Route path="foodAndBeverages" element={
            <><TopNavBar />
            <Food />
              <Footer />
            </>
          } />
          <Route path="religion" element={
            <><TopNavBar />
            <Religion />
              <Footer />
            </>
          } />

          <Route path="seminars" element={
            <><TopNavBar />
             <Seminars/>
              <Footer />
            </>
          } />


      </Routes>
    </div>
    </ErrorBoundary >
    
  )
}