import { type Component } from 'jails-js'
import { isVisible } from 'jails.stdlib/is-visible'

export default async function iframe ({ main, elm } : Component) {
	
	const iframe = elm.querySelector('iframe')
	await isVisible( elm )

	main(() => {
		iframe.src = iframe.dataset.src
	})
}