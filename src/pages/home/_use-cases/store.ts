import onijs from '@javiani/onijs'
import * as usersList from './users-list'

const initialState = {
	...usersList.initialState
}

const actions = {
	...usersList.actions
}

export const store = onijs(initialState, actions)
