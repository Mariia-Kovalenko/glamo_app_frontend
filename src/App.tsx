import Header from './Layout/Header/Header';
import Map from './Pages/Map/Map';
import { useLoadScript } from '@react-google-maps/api';

function App() {
  const { isLoaded } = useLoadScript({
		googleMapsApiKey: 'AIzaSyDBaWV6UYaOYLjYHEc0KHTAcs5bFQW51k0',
		libraries: ['places'],
	});
  return (
    <div className="App">
      <Header/>
      {
        isLoaded ? <Map /> : null
      }
    </div>
  );
}

export default App;
