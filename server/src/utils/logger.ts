const warnEmoji: string = '⚠️'
const errorEmoji: string = '❗'

namespace Logger {
    export function info(message: string): void {
        console.log(`${new Date().toLocaleTimeString()}: ${message}`)
    }

    export function warn(message: string): void {
        console.log(`${new Date().toLocaleTimeString()} ${warnEmoji} ${message}`)
    }

    export function error(message: string): void {
        console.log(`${new Date().toLocaleTimeString()} ${errorEmoji} ${message}`)
    }
}

export default Logger