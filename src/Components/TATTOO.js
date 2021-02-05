
import {
	motion,

} from 'framer-motion';

const tattooVariants = {
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

export default function TATTOO() {
   
    return (
        <motion.div style={{minHeight: "100vh"}}  variants={tattooVariants} initial='hidden' animate="visible" exit="exit" >
            <h2>TATTO</h2>
        </motion.div>
    )
}
