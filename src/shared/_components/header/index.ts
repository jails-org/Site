import { throttle } from 'shared/_utils'

export default function header ({ main, state }) {

    main( _ => [
        events
    ])

    const events = () => {
		window.addEventListener('scroll', throttle(onscroll, 50))
    }

	const onscroll = () => {
		const fixed = state.get()
		if( window.scrollY >= 145 && fixed !== true ) {
			state.set({ fixed : true })
		}else if( window.scrollY < 145 && fixed !== false ){
			state.set({ fixed : false })
		}
	}
}

export const model = {
	fixed : false
}
