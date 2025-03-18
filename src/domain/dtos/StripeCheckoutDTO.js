import { ProductItem } from "./ProductItem.js";

export class StripeCheckoutBuilder {
	constructor() {
		this.lineItems = [];
		this.mode = 'payment';
		this.successUrl = '';
		this.cancelUrl = '';
	}

	/**
	 * Añade uno o varios productos al carrito.
	 * @param {ProductItem | ProductItem[]} productItems - Instancia de ProductItem o array de instancias de ProductItem.
	 */
	addProducts(productItems) {
		if (!Array.isArray(productItems)) {
			productItems = [productItems]; // Si no es un array, lo convierte en uno
		}

		productItems.forEach((productItem) => {
			if (!(productItem instanceof ProductItem)) {
				throw new Error(
					'Todos los productos deben ser instancias de ProductItem.'
				);
			}
			const lineItem = productItem.toStripeLineItem();
			this.lineItems.push(lineItem);
		});

		return this; // Permite encadenamiento de métodos
	}

	/**
	 * Establece la URL de éxito.
	 * @param {string} url - URL a la que redirigir después de un pago exitoso.
	 */
	setSuccessUrl(url) {
		this.validateUrl(url, 'success_url');
		this.successUrl = url;
		return this; // Permite encadenamiento de métodos
	}

	/**
	 * Establece la URL de cancelación.
	 * @param {string} url - URL a la que redirigir si el usuario cancela el pago.
	 */
	setCancelUrl(url) {
		this.validateUrl(url, 'cancel_url');
		this.cancelUrl = url;
		return this; // Permite encadenamiento de métodos
	}

	/**
	 * Valida que una URL sea válida.
	 * @param {string} url - URL a validar.
	 * @param {string} fieldName - Nombre del campo para mensajes de error.
	 */
	validateUrl(url, fieldName) {
		if (typeof url !== 'string' || !this.isValidUrl(url)) {
			throw new Error(`La URL '${fieldName}' no es válida.`);
		}
	}

	/**
	 * Valida que una URL sea válida.
	 * @param {string} url - URL a validar.
	 * @returns {boolean} - Verdadero si la URL es válida.
	 */
	isValidUrl(url) {
		try {
			new URL(url);
			return true;
		} catch (e) {
			return false;
		}
	}

	/**
	 * Genera la estructura final para Stripe Checkout.
	 * @returns {Object} - Estructura de datos para Stripe Checkout.
	 */
	build() {
		if (!this.successUrl || !this.cancelUrl) {
			throw new Error('Las URLs de éxito y cancelación son obligatorias.');
		}
		return {
			line_items: this.lineItems,
			mode: this.mode,
			success_url: this.successUrl,
			cancel_url: this.cancelUrl
		};
	}
}
