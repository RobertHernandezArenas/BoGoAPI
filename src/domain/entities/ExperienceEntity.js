class ExperienceEntity {
	constructor({
		id,
		name,
		description,
		price,
		duration,
		dateTo,
		dateFrom,
		location,
		capacity,
		stock,
		availability,
		category_id,
		image,
		user_id,
		isFavorite,
		createdAt,
		updatedAt
	}) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.duration = duration;
		this.dateTo = dateTo;
		this.dateFrom = dateFrom;
		this.location = location;
		this.capacity = capacity;
		this.stock = stock;
		this.availability = availability;
		this.category_id = category_id;
		this.image = image;
		this.user_id = user_id;
		this.isFavorite = isFavorite;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	// Métodos de negocio (opcional)
	reduceStock(quantity) {
		if (this.stock >= quantity) {
			this.stock -= quantity;
		} else {
			throw new Error('Stock insuficiente');
		}
	}
}

module.exports = ExperienceEntity;
