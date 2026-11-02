import { AnimatePresence, MotionConfig } from 'framer-motion'
import SceneTransition from './components/SceneTransition'
import SoundToggle from './components/SoundToggle'
import { SCENE_TRANSITIONS, type MemoryRoomId } from './data/sceneConfig'
import { useSceneNavigation } from './hooks/useSceneNavigation'
import ChocolateRoom from './memory-rooms/ChocolateRoom'
import DreamPlannersRoom from './memory-rooms/DreamPlannersRoom'
import ParkRoom from './memory-rooms/ParkRoom'
import BirthdayScene from './scenes/BirthdayScene'
import CakeScene from './scenes/CakeScene'
import EnvelopeScene from './scenes/EnvelopeScene'
import FinalScene from './scenes/FinalScene'
import LoveLetterScene from './scenes/LoveLetterScene'
import MemoryMenuScene from './scenes/MemoryMenuScene'
import PinScene from './scenes/PinScene'
import RoomScene from './scenes/RoomScene'

export default function App() {
  const { scene, go, reset, memoriesOrigin, runId } = useSceneNavigation()
  const backToMemories = () => go('memories')

  let view: React.ReactNode
  switch (scene) {
    case 'pin':
      view = <PinScene onUnlock={() => go('envelope')} />
      break
    case 'envelope':
      view = <EnvelopeScene onDone={() => go('room')} />
      break
    case 'room':
      view = <RoomScene onDone={() => go('birthday')} />
      break
    case 'birthday':
      view = <BirthdayScene onNext={() => go('cake')} />
      break
    case 'cake':
      view = <CakeScene onDone={() => go('memories', 'story')} />
      break
    case 'memories':
      view = (
        <MemoryMenuScene
          origin={memoriesOrigin}
          onOpenRoom={(id: MemoryRoomId) => go(id)}
          onNext={() => go('letters')}
          onBackToFinale={() => go('finale')}
        />
      )
      break
    case 'chocolate':
      view = <ChocolateRoom onBack={backToMemories} />
      break
    case 'park':
      view = <ParkRoom onBack={backToMemories} />
      break
    case 'dream-planners':
      view = <DreamPlannersRoom onBack={backToMemories} />
      break
    case 'letters':
      view = <LoveLetterScene onNext={() => go('finale')} />
      break
    case 'finale':
      view = <FinalScene onReplay={reset} onRevisit={() => go('memories', 'finale')} />
      break
  }

  return (
    <MotionConfig reducedMotion="never">
      <main className="relative h-[100svh] w-full overflow-hidden bg-ivory" data-scene={scene}>
        <SoundToggle />
        <AnimatePresence mode="wait">
          <SceneTransition key={`${runId}-${scene}`} kind={SCENE_TRANSITIONS[scene]}>
            {view}
          </SceneTransition>
        </AnimatePresence>
      </main>
    </MotionConfig>
  )
}
