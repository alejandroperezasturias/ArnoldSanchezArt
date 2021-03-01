import {
	changeExitPropRight,
	routeVariantsNormal,
	changeExitPropHomet,
} from '../Animations/animation';
import { motion } from 'framer-motion';
import SectionChangeLink from '../Animations/SectionChangeLink';


export default function FloatingLinks() {
    return (
        <div>
        <motion.div
            style={{ position: 'fixed', bottom: 40 }}
            variants={routeVariantsNormal}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <SectionChangeLink
                weGoTo={'/'}
                exitAnimationDirection={changeExitPropHomet}
                title={'HOME'}
                direction={'rtl'}
            />
        </motion.div>
        <motion.div
            style={{ position: 'fixed', bottom: 40, right: 16 }}
            variants={routeVariantsNormal}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <SectionChangeLink
                weGoTo={'/CONTACT'}
                exitAnimationDirection={changeExitPropRight}
                title={'CONTACT'}
                direction={'initial'}
            />
        </motion.div>
    </div>
    )
}

