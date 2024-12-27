
export const initialState = {
	users: []
}

export const actions = {

	USERS_LIST_SET: (state, { users }) => ({
		users
	}),

	USERS_LIST_REMOVE: (state, { id }) => ({
		users: state.users.filter( user => user.id !== id )
	})
}
