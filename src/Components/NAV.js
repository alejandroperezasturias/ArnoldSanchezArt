import { Link } from 'react-router-dom';

export default function NAV() {
	return (
		<>
			<Link to={'/TATTOO'} className={'navigation-link'}>
				<div className={'hero-scroll-progress split center-center'}>
					<h2 className={'text-900'}>TATTOO</h2>
				</div>
			</Link>
			<Link to={'/'} className={'navigation-link'}>
				<div className={'hero-scroll-progress split center-center'}>
					<h2 className={'text-900'}>HERO</h2>
				</div>
			</Link>
			<Link to={'MERCH'} className={'navigation-link'}>
				<div className={'hero-scroll-progress split center-center'}>
					<h2 className={'text-900'}>MERCH</h2>
				</div>
			</Link>
		</>
	);
}
