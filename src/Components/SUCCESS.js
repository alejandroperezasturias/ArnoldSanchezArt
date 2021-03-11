import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SuccessPage() {
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
            <div>
							<Link to="/CUSTOMER" className="btn gradient">
								Back to Home
							</Link>
						</div>
				<Confetti width={width} height={height} numberOfPieces={700} />
				<div style={{ height: '100vh' }} className="split center-center">
					<div className="flow-content" style={{ textAlign: 'center' }}>
						<h1>Your order is on its way</h1>
						<div>
							<Link to="/CUSTOMER" className="btn gradient">
								Back to Home
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
