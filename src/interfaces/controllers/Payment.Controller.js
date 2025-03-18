import Stripe from 'stripe';
import { AppConfig } from './../../config/index.js';
import { ProductItem } from '../../domain/dtos/ProductItem.js';
import { StripeCheckoutBuilder } from '../../domain/dtos/StripeCheckoutDTO.js';

const stripe = new Stripe(AppConfig.CONSTANTS.STRIPE.SECRET_KEY_DEMO);

export class PaymentController {
	/**
	 * Obtiene una sesión de pago de Stripe.
	 * @param {Object} req - Objeto de solicitud HTTP.
	 * @param {Object} res - Objeto de respuesta HTTP.
	 */
	async getSession(req, res) {
		try {
			// Validamos que los productos estén presentes en el cuerpo de la solicitud
			const { products } = req.body;

			if (!Array.isArray(products) || products.length === 0) {
				return res.status(400).json({
					error: true,
					message:
						'Se requiere al menos un producto en el cuerpo de la solicitud.'
				});
			}

			// Convertimos los productos recibidos en instancias de ProductItem
			const productItems = products.map((product) => {
				try {
					return new ProductItem(
						product.name,
						product.description,
						product.images,
						product.currency,
						product.price,
						product.quantity
					);
				} catch (error) {
					throw new Error(
						`Error al crear el producto '${product.name}': ${error.message}`
					);
				}
			});

			// Construimos la estructura para Stripe Checkout
			const stripeCheckout = new StripeCheckoutBuilder()
				.addProducts(productItems)
				.setSuccessUrl('http://localhost:8000/success')
				.setCancelUrl('http://localhost:8000/cancel')
				.build();

			// Creamos la sesión de pago en Stripe
			const session = await stripe.checkout.sessions.create(stripeCheckout);

			session.payment_method_types = ['card'];

			return res.status(200).json({
				error: false,
				data: {
					url: session.url,
					session
				}
			});
		} catch (error) {
			console.error('Error en getSession:', error.message);
			return res.status(500).json({ error: true, message: error.message });
		}
	}

	/**
	 * Maneja la respuesta de éxito del pago.
	 * @param {Object} req - Objeto de solicitud HTTP.
	 * @param {Object} res - Objeto de respuesta HTTP.
	 */
	async getSuccess(req, res) {
		try {
			return res.status(200).json({
				error: false,
				data: 'Pago exitoso'
			});
		} catch (error) {
			return res.status(500).json({ error: true, message: error.message });
		}
	}

	/**
	 * Maneja la respuesta de cancelación del pago.
	 * @param {Object} req - Objeto de solicitud HTTP.
	 * @param {Object} res - Objeto de respuesta HTTP.
	 */
	async getCancel(req, res) {
		try {
			return res.status(200).json({
				error: false,
				data: 'Pago cancelado'
			});
		} catch (error) {
			return res.status(500).json({ error: true, message: error.message });
		}
	}
}

export const paymentController = new PaymentController();
