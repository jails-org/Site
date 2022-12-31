
export const User = ({

	id = Number(),
	name = String(),
	email = String(),
	address = Object()

}) => ({
	id,
	name,
	email,
	address : UserAddress( address )
})


export const UserAddress = ({

	street 	= String(),
	suite 	= String(),
	city 	= String(),
	zipcode = String(),
	geo 	= String()

}) => {
	return `${street}, ${city}. ${suite} - ${zipcode}`
}
