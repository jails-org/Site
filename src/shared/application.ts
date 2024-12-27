import { type Component } from 'jails-js'
import { thirdPartyScript } from 'jails.pandora/third-party'

export default function application ({ main } : Component) {

	const analytics = thirdPartyScript('analytics')

	main( _ => {
		onload()
	})

	const onload = () => {
		analytics.then( _ => console.info('application/onload - Executing after analytics loaded') )
	}
}