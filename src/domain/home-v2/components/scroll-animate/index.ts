import { type Component } from 'jails-js'
import { isVisible } from 'jails.stdlib/is-visible'

export default async function scrollAnimate ({ main, elm } : Component) {

	await isVisible( elm )

	main( _ => {
		elm.classList.add('in-view')
	})
}