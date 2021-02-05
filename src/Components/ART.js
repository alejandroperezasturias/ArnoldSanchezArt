
import {
	motion,

} from 'framer-motion';

export default function ART() {
    const artVariants = {
		hidden: {
			opacity: 0,
			y: 10,
			transition: {
				duration: 1,
			},
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 1,
			},
		},
		exit: {
			opacity: 0,
			y: 10,
			
		}
	};
    return (
        <motion.div style={{minHeight: "100vh"}} variants={artVariants} initial='hidden' animate="visible" exit="exit">
            <h2>ART</h2>
        </motion.div>
    )
}
