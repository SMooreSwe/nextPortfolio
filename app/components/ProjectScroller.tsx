'use client'
import { Project } from '@/types'
import { v4 as uuidv4 } from 'uuid';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import TimelineSection from './TimelineSection'
import { fetchProjects } from '../utils/calls';
import { buttonMaker } from '../utils/functions';


const ProjectScroller = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(()=> {
        fetchProjects().then(response => setProjects(response.data.projects));
    }, []);

    const scroller = useRef<HTMLDivElement>(null)
    
    const handleLeftClick = () => {
        const width = scroller.current?.scrollWidth
        const click = width!/projects.length
        const back = 0 - click
        scroller.current!.scrollBy({left: back, behavior: 'smooth'})
    }
  
    const handleRightClick = () => {
        const width = scroller.current?.scrollWidth
        const click = width!/projects.length
        scroller.current!.scrollBy({left: click, behavior: 'smooth'})
    }
  return (
    <>
        <button className='hidden md:block fixed left-2 lg:left-6 top-[55%]'>
            <FontAwesomeIcon icon={faArrowLeft} className="w-6 h-6" onClick={handleLeftClick}/>
        </button>
        <div ref={scroller} className='project-scroller mx-auto'>
            {projects.length != 0 && projects.map((project : Project) => {
            const buttonLinks = [buttonMaker('deployed', project.deployed,), buttonMaker('github', project.github)]
            return (
            <TimelineSection key={uuidv4()} name={project.heading} blurb={project.blurb} src={project.src} links={buttonLinks}/>
            )}
            )}
        </div>
        <button className='hidden md:block fixed right-2 lg:right-6 top-[55%]' onClick={handleRightClick}>
            <FontAwesomeIcon icon={faArrowRight} className="w-6 h-6"/>
        </button>
    </>
    )
}

export default ProjectScroller