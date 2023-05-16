'use client'

import { useInView } from 'framer-motion'
import { useRef } from 'react'

type TimelineProps = {
  name: string,
  key: string,
}

const TimelineSection = (props: TimelineProps) => {
  const { name } = props
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true})

  return (
    <section className='project-section'>
      <h2 className="Projects__timeline-header" ref={ref} style={{
      transform: isInView ? "none" : "translateY(-100%)",
      opacity: isInView ? 1 : 0,
      transition: "ease-in 1s 0.5s"
      }}>{name}</h2>
    <div className='project-section__content'>
      <img src="/project-example.jpg" alt="view of [project Project]" className='object-scale-down' />
      <aside>This is the text that describes the site</aside>
    </div>
      
    </section>
  )
}

export default TimelineSection