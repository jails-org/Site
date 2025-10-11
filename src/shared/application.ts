import { type Component } from 'jails-js'
import { thirdParty } from 'jails.stdlib/third-party'
import { Lazyload } from 'jails.stdlib/lazyload-image' 

export default function application ({ main } : Component) {

	const analytics = thirdParty('analytics')

	main( _ => {
		onload()
	})

	const onload = () => {
		new Lazyload({ elements_selector: 'img[data-src]' })
		analytics.then( _ => console.info('application/onload - Executing after analytics loaded') )
	}
}