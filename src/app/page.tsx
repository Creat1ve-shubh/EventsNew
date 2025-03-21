import React from 'react'
import { TimelineDemo } from './sections/Events'
import { LampDemo } from './sections/Background'
import EventTracker from './components/Upcomingevents'

const Home = () => {
  return (
    <div className='overflow-hidden'>
      <LampDemo />
      <EventTracker />
      <TimelineDemo />
    </div>
  )
}

export default Home
