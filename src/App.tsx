import Header from './Layout/Header/Header';
import Login from './Pages/Login/Login';
import Map from './Pages/Map/Map';
import { useLoadScript } from '@react-google-maps/api';
import Registration from './Pages/Registration/Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/PageLayout/PageLayout';

function App() {
  const { isLoaded } = useLoadScript({
		googleMapsApiKey: 'AIzaSyDBaWV6UYaOYLjYHEc0KHTAcs5bFQW51k0',
		libraries: ['places'],
	});
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/map' element={isLoaded ? <Map /> : null} />
          </Route>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Registration/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
