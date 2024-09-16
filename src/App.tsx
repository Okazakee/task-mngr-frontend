import './App.css'
import Footer from './components/layouts/Footer'
import Header from './components/layouts/Header'
import Home from './pages/Dashboard'

function App() {

  return (
    <>
      <Header>Task manager</Header>

      <Home />

      <Footer>Simple task management app by Okazakee</Footer>
    </>

  )
}

export default App