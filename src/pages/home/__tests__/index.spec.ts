
import { store } from '../_use-cases/store'

describe('THE USERS LIST', () => {

	const newusers = [
		{id: 1, name: 'Clark Kent'},
		{id: 2, name: 'Peter Park'}
	]

	test('Adding a users list', () => {
		store.dispatch('USERS_LIST_SET', { users: newusers })
		const { users } = store.getState()
		expect( users ).toEqual( newusers )
	})

	test('Removing a user from the list by id', () => {
		store.dispatch('USERS_LIST_REMOVE', { id : 1 })
		const { users } = store.getState()
		expect( users ).toEqual([newusers[1]])
	})
})
