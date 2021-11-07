import type { NextPage } from 'next'
import Focus from "../src/configurations/Focus";

const Home: NextPage = () => {
  return (
    <div style={{width: '100%', height: '100%'}}>
      <Focus></Focus>
    </div>
  )
}

export default Home
