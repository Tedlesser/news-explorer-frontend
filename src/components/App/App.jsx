import './App.css'
import Main from '../Main/Main'
import About from '../About/About'
import Header from '../Header/Header'

function App() {
  return (
    <>
    <div className="page">
        <div className="page__content">
          <div className="page__style">
            <Header/>
            <Main/>
            <About/>
            </div>
        </div>
    </div>
    </>
  )
}

export default App;