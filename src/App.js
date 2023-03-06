
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import {Outlet, Route , Routes} from 'react-router-dom'
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';


const Layout = () =>{
  return(
    <div >
      <Nav/>

      <Outlet />

      <Footer />
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={process.env.PUBLIC_URL + '/'} element={<Layout/>}>
          <Route index element={<MainPage/>} />
          <Route path={process.env.PUBLIC_URL + ':movied'} element={<DetailPage/>} />
          <Route path ={process.env.PUBLIC_URL + "search"} element={<SearchPage />}/>
        </Route>
      </Routes>
      
      
    </div>
    
  );
}

export default App;
