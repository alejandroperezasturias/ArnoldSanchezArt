import boxingGloves from '../images/carousel/gloves.svg';
import apple from '../images/carousel/apple.svg';
import eye from '../images/carousel/eye.svg';
import skull from '../images/carousel/skull.svg';
import hand from '../images/carousel/hand.svg';
import { motion } from 'framer-motion';
import ScrollComponent from './ScrollComponent';
import GalleryImage from './GalleyImage';

export default function Gallery() {
	return (
		<div className="art-gallery" style={{minHeight: '100vh'}}>
			<div className="art-gallery-larger-images">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={{
						visible: {
							opacity: 1,
							transition: {
								duration: Math.random() * (1.7 - 0.4) + 0.4,
								delay: 1,
							},
						},
						hidden: {
							opacity: 0,
						},
					}}
				>
					<GalleryImage src={skull} alt={'skull Bembibre Leon Tattoo'} />
				</motion.div>
				<ScrollComponent threshold={0.4}>
					<GalleryImage src={hand} alt={'hand Bembibre Leon Tattoo'} />
				</ScrollComponent>
			</div>
			<div className="art-gallery-shorter-images">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={{
						visible: {
							opacity: 1,
							transition: {
								duration: Math.random() * (1.7 - 0.4) + 0.4,
								delay: 1,
							},
						},
						hidden: {
							opacity: 0,
						},
					}}
				>
					<GalleryImage src={apple} alt={'apple Bembibre Leon Tattoo'} />
				</motion.div>
				<motion.div
					initial="hidden"
					animate="visible"
					variants={{
						visible: {
							opacity: 1,
							transition: {
								duration: Math.random() * (1.7 - 0.4) + 0.4,
								delay: 1,
							},
						},
						hidden: {
							opacity: 0,
						},
					}}
				>
					<GalleryImage src={boxingGloves} alt={'boxingGloves  Bembibre Leon Tattoo'} />
				</motion.div>

				<ScrollComponent threshold={1}>
					<GalleryImage src={eye} alt={'eye'} />
				</ScrollComponent>
			</div>
		</div>
	);
}
