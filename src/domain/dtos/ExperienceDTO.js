class ExperienceDTO {
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
		category,
		image,
		user_id,
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
		this.category = category;
		this.image = image;
		this.user_id = user_id;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

module.exports = ExperienceDTO;
