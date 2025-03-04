class UserDTO {
	constructor({
		id,
		email,
		name,
		surname,
		address,
		avatar,
		birthdate,
		city,
		country,
		dni,
		gender,
		isActive,
		phone,
		role,
		zipcode,
		createdAt,
		updatedAt
	}) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.surname = surname;
		this.address = address;
		this.avatar = avatar;
		this.birthdate = birthdate;
		this.city = city;
		this.country = country;
		this.dni = dni;
		this.gender = gender;
		this.isActive = isActive;
		this.phone = phone;
		this.role = role;
		this.zipcode = zipcode;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

module.exports = UserDTO;
