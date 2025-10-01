import { type Component } from 'jails-js'

export default function appPhone ({ main, elm }: Component) {

	const iframe = elm.querySelector('iframe') as HTMLIFrameElement

	main(() => {
		renderIframe()
	})

	const renderIframe = () => {
		if( !('touchstart' in window) ) {
			iframe.setAttribute('src', iframe.dataset.src)
		}
	}
}