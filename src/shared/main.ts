import { start, register } from 'jails-js'
import * as application from './application'

export { register } from 'jails-js'
export const dependencies = {}

register('x-application', application, dependencies)

export const main = () => {
	start()
}