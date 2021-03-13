import { formatCurrency } from '../helpers/helpers';
import { motion } from 'framer-motion';
import {
	titleAnim
} from '../Animations/animation';

export default function TrollyItem({
	price,
	amount,
	name,
	price_id,
	deleteFromShoppingCart,
   
}) {
	return (
		<motion.div key={price_id} variants={titleAnim}>
			<p className="text-400"> {name}</p>
			<p className="text-300">Items: {amount}</p>

			<p className="text-300">
				Price: {formatCurrency(price * amount * 1000)}
			</p>
			<button
				className={'btn text'}
				style={{
					backgroundColor: 'red',
					padding: '.2rem .5rem',
					fontSize: 'var(	--fs-300)',
					marginTop: '0.5rem',
                    border: '0px !important',
				}}
				onClick={() => {
					deleteFromShoppingCart(price_id);
				}}
			>
				Delete
			</button>
		</motion.div>
	);
}
