import { useEffect, useRef } from 'react';
import { Main } from './templates/main';
import { stats } from './organism/gameboard/ui/stats';

function App() {
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (statsRef.current) {
      stats.dom.style.cssText = 'position:fixed;bottom:0;right:0;cursor:pointer;opacity:0.9;z-index:10000';
      statsRef.current.appendChild(stats.dom)
    }
  }, [])


  return (
    <div className="App" style={{padding: '10px 20px 40px'}} ref={statsRef}>
      <Main />
    </div>
  )
}

export default App
