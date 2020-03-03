import listener from "./listener"
import { currentUser } from "./initialize"


const schema = {
    users: ["users"],
    user: ["users", ""],
}

function listeners () {
    const self = this
    // special listener that doesn't have a path
    self.currentUser = () => new currentUser()

    Object.keys(schema).forEach((name) => {
        self[name] = (...args) => {
            args = args || []
            const pathTemplate = schema[name]
            if (args.length !== pathTemplate.length - 1) {
                throw Error(`Wrong number of arguments to ${name}: ${args}`)
            }

            const path = []
            let i = 0
            pathTemplate.forEach(step => {
                path.push(step ? step : args[i++])
            })

            return new listener(path, name)
        }
    })
}

export default new listeners()
