import "./Main.css";
import SearchForm from "../SearchForm/SearchForm"

function Main () {
    return (
        <div className="main"> 
            <div className="main__content">
            <h1 className="main__title">Whats going on in the world?</h1>
          <p className="main__subtitle">Find the news on any topic and save them in your personal account.</p>
          <SearchForm/>
        </div>
        </div>
    )
}

export default Main;