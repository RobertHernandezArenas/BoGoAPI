import Stripe from 'stripe';
import { AppConfig } from './../../config/index.js';

const stripe = new Stripe(AppConfig.CONSTANTS.STRIPE.SECRET_KEY_DEMO);

export class PaymentController {
	async getSession(req, res) {
		try {
			const session = await stripe.checkout.sessions.create({
				line_items: [
					{
						price_data: {
							currency: 'eur',
							product_data: {
								name: 'T-shirt',
								description: 'Comfortable cotton t-shirt',
								images: [
									'http://localhost:8000/images/gift.gif',
									'https://plus.unsplash.com/premium_photo-1682050733502-f58b7f499490?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
									'https://plus.unsplash.com/premium_photo-1669357657851-f15e1417ea08?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
									'https://plus.unsplash.com/premium_photo-1669357656838-2255f3882263?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
								]
							},
							unit_amount: 50 // 20€
						},
						quantity: 1
					}
				],
				mode: 'payment',
				success_url: 'http://localhost:8000/success',
				cancel_url: 'http://localhost:8000/cancel'
			});

			session.payment_method_types = ['card'];

			return res.status(200).json({
				error: false,
				data: {
					url: session.url,
					session,
				}
			});
		} catch (error) {
			res.status(500).json({ error: error.message, data: false });
		}
	}

	async getSuccess(req, res) {
		try {
			res.status(200).json({
				error: false,
				data: 'Payment success'
			});
		} catch (error) {
			res.status(500).json({
				error: error.message,
				data: false
			});
		}
	}

	async getCancel(req, res) {
		try {
			res.status(200).json({
				error: false,
				data: 'Payment cancel'
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

export const paymentController = new PaymentController();
