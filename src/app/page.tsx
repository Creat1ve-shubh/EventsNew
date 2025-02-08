import React from 'react'
import { TimelineDemo } from './sections/Events'
import { VortexDemo } from './sections/Background'
import EventTracker from './components/Upcomingevents'

const Home = () => {
  return (
    <div className='overflow-hidden'>
      <VortexDemo />
      <EventTracker />
      <TimelineDemo />
    </div>
  )
}

export default Home
