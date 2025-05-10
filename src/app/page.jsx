
import './globals.css'
import desc from './descriptions.json'

function Header({ heading1, heading2 }) {

  return <div>
    <h1 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
      {heading1}
    </h1>
    <h2 class="text-center text-2xl"> {heading2} </h2>
  </div>
}

function Desclist({ obj }) {
  const listComp =
    <div class="basis-1/2 mt-12">
      <ul class="text-center">
        {obj.map((item) => {
          return <li key={item}>{item}</li>
        })}
      </ul>
    </div>

  return listComp
}

function Descimg() {
  return <div class="basis-1/2 mt-12"> <p class="text-center"> image here </p> </div>
}

function Comment() {
  return (
    <div>
      <label class="ml-5"> post a comment! </label>
      <input class="ml-5 bg-cyan-100" />
    </div>
  )
}

function Mylinks() {

  return (<div> <p class="text-right"> created by hamza | linked in | github | portfolio </p> </div>)
}

function Mainpage() {
  return (<div>
    <Header heading1={'LIFE'} heading2='simulating life using mathematical models' />

    <div class="grid grid-cols-2 my-12">
      <Desclist obj={desc.GOL} />
      <Descimg />
      <Desclist obj={desc.BOIDS} />
      <Descimg />
      <Desclist obj={desc.GALSIM} />
      <Descimg />
    </div>

    <Comment />

    <Mylinks />
  </div>

  )
}

export default function App() {
  return <Mainpage />
}
