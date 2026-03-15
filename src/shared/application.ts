import { type Component } from 'jails-js'
import { thirdParty } from 'jails.stdlib/third-party'
import { Lazyload } from 'jails.stdlib/lazyload-image' 

export default function application ({ main, on } : Component) {

	const analytics = thirdParty('analytics')

	main( _ => {
		onload()
		on('click', '[data-copy-paste]', oncopyinstall)
	})

	const onload = () => {
		new Lazyload({ elements_selector: 'img[data-src]' })
		analytics.then( _ => console.info('application/onload - Executing after analytics loaded') )
	}

	const oncopyinstall = (event : Event) => {
			
		const cmd = 'npm install jails-js'
		const icon = document.getElementById('copy-icon')

		navigator.clipboard.writeText(cmd).then(() => {
			icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>'
			setTimeout(() => {
				icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>';
			}, 2000)
		})
	}	
}