import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function SuccessPage() {
	const history = useHistory();
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		}, 100);
	});

	return (
		<div style={{ minHeight: '50vh' }}>
			<div>
				<Confetti width={width} height={height} numberOfPieces={700} />
				<div style={{ height: '100vh' }} className="split center-center">
					<div className="flow-content" style={{ textAlign: 'center' }}>
						<h1>Your order is on its way</h1>
						<div>
							<button
								onClick={() => history.push('/MERCH')}
								className="btn gradient"
							>
								Back to Home
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
