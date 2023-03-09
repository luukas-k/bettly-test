import { useEffect, useRef, useState } from 'react'

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
    { name: 'Muu...' },
    { name: 'Luukas' }, 
    { name: 'Emilia' }, 
    { name: 'Henrik' }, 
    { name: 'Veera' }, 
    { name: 'Ilari' },
    { name: 'Aaron' },
    { name: 'Riikka' },
    { name: 'Henri' },
    { name: 'Patrik' }
  ])

  function select(p) {
    if(p.name === 'Muu...'){
      navigate(6)
    }
    else{
      setAgainst(p.name)
      navigate(2)
    }
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

function CustomPlayerSelection({ navigate, setAgainst }){
  const textRef = useRef()
  function select(){
    setAgainst(textRef.current.value)
    navigate(2)
  }
  return (
    <>
      <p>Valitse vastustajasi</p>
      <input type="text" ref={textRef} />
      <button onClick={select}>Save</button>
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
  function select(selection){
    setWager(selection)
    navigate(4)
  }
  return (
    <>
      <h3>Valitse panos</h3>
      <div className='icon-list'>
        <button onClick={() => select('Pizza')}><img src={Pizza} /></button>
        <button onClick={() => select('Burger')}><img src={Burger} /></button>
        <button onClick={() => navigate(5)}>Custom</button>
      </div>
    </>
  )
}

function CustomWagerSelection({ navigate, setWager }){
  const textRef = useRef()
  function select(){
    setWager(textRef.current.value)
    navigate(4)
  }
  return (
    <>
      <h3>Valitse panos</h3>
      <textarea ref={textRef} />
      <button onClick={select}>Save</button>
    </>
  )
}


function WagerOverview({ navigate, bet, create }){
  return (
    <div>
      <h2>Varmista tiedot</h2>
      <h3>Tyyppi</h3>
      <p>{bet.type} <img className='small' src={Edit} onClick={() => navigate(0)} /></p>
      <h3>Vastustaja</h3>
      <p>{bet.against} <img className='small' src={Edit} onClick={() => navigate(1)} /></p>
      <h3>Kuvaus</h3>
      <p>{bet.description} <img className='small' src={Edit} onClick={() => navigate(2)} /></p>
      <h3>Panos</h3>
      <p>{bet.wager} <img className='small' src={Edit} onClick={() => navigate(3)} /></p>
      <br />
      <button onClick={create}>Luo</button>
    </div>
  )
}

function CreateBet({ setAppNavigation, createBet }){
  const [step, setStep] = useState(0)
  const [bet, setBet] = useState({type:'1v1', against:'', description:'', wager: '', accepted: false})

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
    case 5: return <CustomWagerSelection navigate={(i) => setStep(i)} setWager={setWager} bet={bet} />
    case 6: return <CustomPlayerSelection navigate={(i) => setStep(i)} setAgainst={setAgainst} bet={bet} />
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

function BetInfo({ state, bet, onClick }){
  return (
    <div className='bet-info' onClick={onClick}>
      <h2>Sinä vs {bet.against}</h2>
      <p>{bet.description}</p>
    </div>
  )
}

function BetList({ name, bets, selectBet }){
  if(bets.length === 0){
    return (
      <>
        <h2>{name}</h2>
        <p>Ei aktiivisia vetoja.</p>
      </>
    )
  }
  return (
    <>
      <h2>{name}</h2>
      {bets.map((bet, i) => {
        return <BetInfo state={'accepted'} bet={bet} onClick={() => selectBet(bet)} key={i} />
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

function Home({ betList, setAppNavigation, selectBet }){
  const waitingBets = betList.filter(a => !a.accepted)
  const acceptedBets = betList.filter(a => a.accepted)
  return (
    <>
      {waitingBets.length ? <BetList name={'Vastaanotetut haasteet'} bets={waitingBets} selectBet={selectBet} /> : <></>}
      <BetList name={'Aktiiviset vedot'} bets={acceptedBets} selectBet={selectBet} />
      <div className='bottom-right-corner'>
        <RedPlus onClick={() => setAppNavigation('create-bet')} />
      </div>
    </>
  )
}

function ViewBet({ setAppNavigation, bet, accept, reject }){
  function acceptSelected(){
    accept()
    setAppNavigation('home')
  }
  function rejectSelected(){
    reject()
    setAppNavigation('home')
  }
  return (
    <>
      <h2>Sinä vastaan {bet.against}</h2>
      <h3>Tehtävänä on</h3>
      <p>{bet.description}</p>
      <h3>Panoksena on</h3>
      <p>{bet.wager}</p>
      <button onClick={() => setAppNavigation('home')}>Takaisin</button>
      {!bet.accepted ? <button onClick={acceptSelected}>Hyväksy veto</button> : <></>}
      {!bet.accepted ? <button onClick={rejectSelected}>Hylkää veto</button> : <></>}
      {bet.accepted ? <button onClick={rejectSelected}>Merkitse valmiiksi</button> : <></>}
    </>
  )
}

function App() {
  const [appNav, setAppNav] = useState('home')
  const [betList, setBetList] = useState([])
  const [selectedBet, setSelectedBet] = useState({})

  function createBet(bet){
    setBetList([bet, ...betList])
  }

  function viewBet(bet){
    setSelectedBet(bet)
    setAppNav('view-bet')
  }

  function accept(){
    setBetList(betList.map(b => b === selectedBet ? {...b, accepted: true} : b))
  }

  function reject(){
    setBetList(betList.filter(b => b !== selectedBet))
  }

  if(appNav === 'home'){
    return (
      <div className='app'>
        <div className='app-content'>
          <Header />
          <Home setAppNavigation={setAppNav} betList={betList} selectBet={viewBet} />
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
  else if(appNav === 'view-bet'){
    return (
      <div className='app'>
        <div className='app-content'>
          <Header />
          <ViewBet setAppNavigation={setAppNav} bet={selectedBet} accept={accept} reject={reject} />
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
