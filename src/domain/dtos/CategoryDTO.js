export class CategoryDTO {
	constructor({
		id,
		name,
		image,
		createdAt,
		updatedAt
	}) {
		this.id = id;
		this.name = name;
		this.image = image;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}
