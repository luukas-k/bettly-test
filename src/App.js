import { useRef, useState } from 'react'

import './App.css'
import Person from './Person.svg'
import Group from './Group.svg'
import Pizza from './Pizza.svg'
import Edit from './Edit.svg'
import Burger from './Burger.png'

function BetType({ navigate, setType }){
  function select1v1(){
    setType('1v1')
    navigate(1)
  }
  function select1vAll(){
    setType('1vAll')
    navigate(2)
  }
  return (
    <div className='button-container'>
      <button onClick={select1v1}>
        <img src={Person} />
        <p>1 vs 1</p>
      </button>
      <button onClick={select1vAll}>
        <img src={Group} />
        <p>1 vs All</p>
      </button>
    </div>
  )
}

function Profile({ player }){
  return (
    <div className='player-container'>
      <img src={Person} />
      <p>{player.name}</p>
    </div>
  )
}

function PlayerSelection({ navigate, setAgainst }){
  const [players, setPlayers] = useState([
    { name: 'Luukas' }, 
    { name: 'Emilia'}, 
    {name: 'Henrik'}, 
    {name: 'Veera'}, 
    {name:'Ilari'},
    {name:'Aaron'},
    {name: 'Riikka'},
    {name: 'Henri'},
    {name: 'Patrik'}
  ])

  function select(p) {
    setAgainst(p.name)
    navigate(2)
  }

  return (
    <>
      <p>Valitse vastustajasi</p>
      <div className='icon-list'>
        {players.map((p, i) => {
          return (
            <button onClick={() => select(p)} key={i}>
              <Profile player={p} />
            </button>
          ) 
        })}
      </div>
    </>
  )
}

function WagerDescription({ navigate, setDescription }){
  const textAreaRef = useRef()

  function updateDescription(){
    const text = textAreaRef.current.value
    setDescription(text)
    navigate(3)
  }

  return (
    <>
      <h2>Haaste</h2>
      <textarea ref={textAreaRef} />
      <button onClick={updateDescription}>Next</button>
    </>
  )
}

function WagerSelection({ navigate, setWager }){
  return (
    <>
      <p>Valitse panos</p>
      <div className='icon-list'>
        <button onClick={() => {setWager('Pizza');navigate(4)}}><img src={Pizza} /></button>
        <button onClick={() => {setWager('Burger');navigate(4)}}><img src={Burger} /></button>
      </div>
    </>
  )
}

function WagerOverview({ navigate, bet, create }){
  return (
    <div>
      <h2>Varmista tiedot</h2>
      <p>Tyyppi: {bet.type}<img className='small' src={Edit} /></p>
      <p>Vastustaja: {bet.against}<img className='small' src={Edit} /></p>
      <p>Kuvaus: {bet.description}<img className='small' src={Edit} /></p>
      <p>Panos: {bet.wager}<img className='small' src={Edit} /></p>
      <button onClick={create}>Luo</button>
    </div>
  )
}

function CreateBet({ setAppNavigation, createBet }){
  const [step, setStep] = useState(0)
  const [bet, setBet] = useState({type:'1v1', against:'', description:'', wager: ''})

  function setType(type){
    setBet({
      ...bet,
      type: type
    })
  }
  function setWager(wager){
    setBet({
      ...bet,
      wager: wager
    })
  }
  function setAgainst(against){
    setBet({
      ...bet,
      against: against
    })
  }
  function setDescription(desc){
    setBet({
      ...bet,
      description: desc
    })
  }
  function create(){
    createBet(bet)
    setAppNavigation('home')
  }

  switch(step){
    case 0: return <BetType navigate={(i) => setStep(i)} setType={setType} />
    case 1: return <PlayerSelection navigate={(i) => setStep(i)} setAgainst={setAgainst} />
    case 2: return <WagerDescription navigate={(i) => setStep(i)} setDescription={setDescription} />
    case 3: return <WagerSelection navigate={(i) => setStep(i)} setWager={setWager} />
    case 4: return <WagerOverview navigate={(i) => setStep(i)} create={create} bet={bet} />
    default: return <p>Unknown</p>
  }
}

function Header(){
  return (
    <div>
      <h1>Bettly</h1>
    </div>
  )
}

function BetInfo({ state, bet }){
  return (
    <div className='bet-info'>
      <h2>Sinä vs {bet.against}</h2>
      <p>{bet.description}</p>
    </div>
  )
}

function BetList({ name, bets }){
  if(bets.length == 0){
    return (
      <p>No bets.</p>
    )
  }
  return (
    <>
      <h2>{name}</h2>
      {bets.map((bet, i) => {
        return <BetInfo state={'accepted'} bet={bet} key={i} />
      })}
    </>
  )
}

function RedPlus({ onClick }){
  return (
    <div className='red-plus' onClick={onClick}>
      <p>+</p>
    </div>
  )
}

function Home({ waitingBets, betList, setAppNavigation }){
  return (
    <>
      <BetList name={'Aktiiviset vedot'} bets={betList} />
      <div className='bottom-right-corner'>
        <RedPlus onClick={() => setAppNavigation('create-bet')} />
      </div>
    </>
  )
}

function App() {
  const [appNav, setAppNav] = useState('home')
  const [betList, setBetList] = useState([])

  function createBet(bet){
    setBetList([bet, ...betList])
  }

  const body = <Home />
  if(appNav === 'home'){
    return (
      <div className='app'>
        <div className='app-content'>
          <Header />
          <Home setAppNavigation={setAppNav} betList={betList} />
        </div>
      </div>
    )
  }
  else if(appNav === 'create-bet'){
    return (
      <div className='app'>
        <div className='app-content'>
          <Header />
          <CreateBet setAppNavigation={setAppNav} createBet={createBet} />
        </div>
      </div>
    )
  }
  else{
    return (
      <p>err</p>
    )
  }
}

export default App;
