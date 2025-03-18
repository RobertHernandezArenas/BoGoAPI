export class ProductItem {
	/**
	 * Crea una instancia de ProductItem.
	 * @param {string} name - Nombre del producto.
	 * @param {string} description - Descripción del producto.
	 * @param {string[]} images - Array de URLs de imágenes del producto.
	 * @param {string} currency - Moneda del precio (por ejemplo, 'eur').
	 * @param {number} price - Precio en la unidad más pequeña de la moneda (por ejemplo, céntimos).
	 * @param {number} quantity - Cantidad del producto.
	 */
	constructor(name, description, images, currency, price, quantity) {
		this.validateString(name, 'name');
		this.validateString(description, 'description');
		this.validateImages(images);
		this.validateCurrency(currency);
		this.validatePrice(price);
		this.validateQuantity(quantity);

		this.name = name;
		this.description = description;
		this.images = images;
		this.currency = currency;
		this.price = price;
		this.quantity = quantity;
	}

	/**
	 * Valida que un campo sea una cadena no vacía.
	 * @param {string} value - Valor a validar.
	 * @param {string} fieldName - Nombre del campo para mensajes de error.
	 */
	validateString(value, fieldName) {
		if (typeof value !== 'string' || value.trim() === '') {
			throw new Error(`El campo '${fieldName}' debe ser una cadena no vacía.`);
		}
	}

	/**
	 * Valida que el campo images sea un array de URLs válidas.
	 * @param {string[]} images - Array de URLs de imágenes.
	 */
	validateImages(images) {
		if (!Array.isArray(images) || images.length === 0) {
			throw new Error('El campo "images" debe ser un array no vacío.');
		}
		images.forEach((image, index) => {
			if (typeof image !== 'string' || !this.isValidUrl(image)) {
				throw new Error(
					`La imagen en la posición ${index} no es una URL válida.`
				);
			}
		});
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
	 * Valida que la moneda sea una cadena válida.
	 * @param {string} currency - Moneda (por ejemplo, 'eur').
	 */
	validateCurrency(currency) {
		const validCurrencies = ['eur', 'usd', 'gbp']; // Ejemplo de monedas válidas
		if (!validCurrencies.includes(currency.toLowerCase())) {
			throw new Error(
				`La moneda '${currency}' no es válida. Monedas permitidas: ${validCurrencies.join(', ')}.`
			);
		}
	}

	/**
	 * Valida que el precio sea un número entero positivo.
	 * @param {number} price - Precio en la unidad más pequeña de la moneda.
	 */
	validatePrice(price) {
		if (typeof price !== 'number' || price <= 0 || !Number.isInteger(price)) {
			throw new Error('El precio debe ser un número entero positivo.');
		}
	}

	/**
	 * Valida que la cantidad sea un número entero positivo.
	 * @param {number} quantity - Cantidad del producto.
	 */
	validateQuantity(quantity) {
		if (
			typeof quantity !== 'number' ||
			quantity <= 0 ||
			!Number.isInteger(quantity)
		) {
			throw new Error('La cantidad debe ser un número entero positivo.');
		}
	}

	/**
	 * Genera la estructura de datos para un producto en Stripe Checkout.
	 * @returns {Object} - Estructura de datos para un producto.
	 */
	toStripeLineItem() {
		return {
			price_data: {
				currency: this.currency,
				product_data: {
					name: this.name,
					description: this.description,
					images: this.images
				},
				unit_amount: this.price
			},
			quantity: this.quantity
		};
	}
}
