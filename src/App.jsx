import './App.scss';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ListContainer from './components/ListContainer';
import Header from './components/Header';
import Create from './components/Create';
import Edit from './components/Edit';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='app'>
        <Routes>
            <Route path='*' element={ <NotFoundPage /> } />
            <Route path="/" element={ <ListContainer /> } />
            <Route path="/create" element={ <Create /> } />
            <Route path="/edit/:id" element={ <Edit /> } />
            <Route path="/edit/undefined" element={ <NotFoundPage /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;