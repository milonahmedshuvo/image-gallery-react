import { useState } from 'react'
import './App.css'
import DragAndDropList from './components/DragandDrop/DragandDrop'



function App() {
  

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <h1>hellow new Gallery</h1>

      <DragAndDropList></DragAndDropList>
      
    </div>
  )
}

export default App


