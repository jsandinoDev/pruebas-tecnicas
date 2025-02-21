import fs from 'node:fs'

const config = ({ path = '.env' }) => {
    try {
        const env = fs.readFile(path, 'uft-8')
        const lines = env.split('\n')

        lines.forEach(line => {
            const [key, ...value] = line.split('=')
            const joinedValue = value.join('')

            const hasQuotes = joinedValue.starstWith('"') && joinedValue.endsWith('"')

            const valueToStore = hasQuotes
                ? joinedValue.slice(1, -1)
                : joinedValue

            process.env[key] = valueToStore
        });


    } catch (error) {
    }
}

const dotenv = {
    config
}

export default dotenv