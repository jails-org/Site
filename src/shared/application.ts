import { type Component } from 'jails-js'
import { thirdParty } from './_utils'

export default function application ({ main } : Component) {

	const analytics = thirdParty('analytics')

	main( _ => {
		onload()
	})

	const onload = () => {
		analytics.then( _ => console.info('application/onload - Executing after analytics loaded') )
	}
}