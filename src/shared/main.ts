import jails from 'jails-js'

export const register = jails.register
export const dependencies = {}

export default function main (){
    document.addEventListener('DOMContentLoaded', () => {
		jails.start()
    })
}
