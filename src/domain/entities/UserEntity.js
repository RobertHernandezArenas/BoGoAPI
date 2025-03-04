class UserEntity {
	constructor({
		id,
		email,
		password,
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
		token,
		zipcode,
		createdAt,
		updatedAt
	}) {
		this.id = id;
		this.email = email;
		this.password = password;
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
		this.token = token;
		this.zipcode = zipcode;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	// Métodos de negocio (opcional)
	activate() {
		this.isActive = true;
	}

	deactivate() {
		this.isActive = false;
	}
}

module.exports = UserEntity;
