import { Outlet } from 'react-router-dom';
import { Header } from './components/index';
import ScrollToTop from './utils/ScrollToTop';

function App() {
	return (
		<>
			<Header />
			<main>
				<ScrollToTop />
				<Outlet />
			</main>
		</>
	);
}

export default App;
