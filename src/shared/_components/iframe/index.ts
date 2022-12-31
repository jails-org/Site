import { isInViewport, throttle } from 'shared/_utils'

export default function iframe ({ main, elm }) {

	const iframe = elm.querySelector('iframe')

	main( _ => [
		events,
		check
	])

	const events = () => {
		window.addEventListener('scroll', onscroll)
	}

	const check = () => {
		if(isInViewport(elm)) {
			iframe.src = iframe.dataset.src
			window.removeEventListener('scroll', onscroll)
		}
	}

	const onscroll = throttle(check, 150)
}
