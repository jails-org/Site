import { type Component } from 'jails-js'
import { isVisible } from 'jails.stdlib/is-visible'

export default async function appExample ({ main, elm, state } : Component) {
	
	await isVisible(elm)

	const iframe = elm.querySelector('iframe') as HTMLIFrameElement

	main(() => {
		showIframe()		
	})

	const showIframe = () => {
		if( isMobileDevice() ) {
			return false 
		}
		iframe.style.display = 'block'
		iframe.src = 'https://stackblitz.com/edit/jails-todomvc?embed=1&file=todo-app.ts'
	}
}

const isMobileDevice = () => {
	return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
		navigator.userAgent
	)
}