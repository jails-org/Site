import { type Component } from 'jails-js'
import { thirdPartyScript } from 'jails.pandora/third-party'
import Lazyload from 'jails.pandora/lazyload' 

export default function application ({ main } : Component) {

	const analytics = thirdPartyScript('analytics')

	main( _ => {
		onload()
	})

	const onload = () => {
		new Lazyload({ elements_selector: 'img[data-src]' })
		analytics.then( _ => console.info('application/onload - Executing after analytics loaded') )
	}
}