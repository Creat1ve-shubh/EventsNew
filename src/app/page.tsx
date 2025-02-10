import React from 'react'
import { TimelineDemo } from './sections/Events'
import { LampDemo, VortexDemo } from './sections/Background'
import EventTracker from './components/Upcomingevents'
import Minor from './sections/Minor'
import ScrollLinked from './components/Minorevents'

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
