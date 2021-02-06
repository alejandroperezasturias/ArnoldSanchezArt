import React, { useEffect, useCallback, useState } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import boxingGloves from '../images/boxing.svg';
import apple from '../images/apple.svg';
import eye from '../images/eye.svg';
const viewportCss = {
	overflow: 'hidden',
};
const containerCss = {
	display: 'flex',
};
const slideCss = {
	position: 'relative',
	minWidth: '40%',
	transform: ' translate(-50%, 0)',
};

const EmblaCarousel = () => {
	const [emblaRef, embla] = useEmblaCarousel({ loop: false });

	const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
	const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

	useEffect(() => {}, [embla]);

	useEffect(() => {
		window.addEventListener('wheel', (e) => {
			console.log(e);
			if (embla) {
			}
		});
	}, [window]);

	return (
		<div style={viewportCss} className="embla__viewport" ref={emblaRef}>
			<div style={containerCss}>
				<div style={slideCss}>
					<img src={eye} className="embla__slide__img" alt="eye"></img>
				</div>
				<div style={slideCss}>
					<img src={eye} className="embla__slide__img" alt="eye"></img>
				</div>
				<div style={slideCss}>
					<img src={eye} className="embla__slide__img" alt="eye"></img>
				</div>
				<div style={slideCss}>
					<img src={eye} className="embla__slide__img" alt="eye"></img>
				</div>
				<div style={slideCss}>
					<img src={eye} className="embla__slide__img" alt="eye"></img>
				</div>
			</div>
		</div>
	);
};

export default EmblaCarousel;
