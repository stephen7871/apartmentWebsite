import { useState } from 'react';

import spatula from '../assets/spatula.jpg';
import StripeContainer from './StripeContainer';

import Card from '../../ui/Card';
import './StripeContainerApp.module.css'

function App() {
	const [showItem, setShowItem] = useState(false);
	return (
		<div >
		
			<h1>The Spatula Store</h1>
			{showItem ? (
                
                <Card>
				<StripeContainer />
                </Card>
            
			) : (
				<>
					<h3>$10.00</h3>
					<img src={spatula} alt='Spatula' />
					<button onClick={() => setShowItem(true)}>Purchase Spatula</button>
				</>
			)}
		</div>
	);
}

export default App;