import { type Component } from 'jails-js'

export default function appPhone ({ main, elm }: Component) {

	const iframe = elm.querySelector('iframe') as HTMLIFrameElement

	main(() => {
		iframe.addEventListener('load', onload)
		renderIframe()
	})

	const onload = () => {
		iframe.classList.add('loaded')
	}

	const renderIframe = () => {
		if( !('touchstart' in window) ) {
			iframe.setAttribute('src', iframe.dataset.src)
		}
	}
}