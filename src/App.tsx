import './App.css'
import Footer from './components/layouts/Footer'
import Header from './components/layouts/Header'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Header>Task manager app</Header>

      <Home />

      <Footer>Simple task management app by Okazakee</Footer>
    </>

  )
}

export default App