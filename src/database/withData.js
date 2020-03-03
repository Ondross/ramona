import React from "react"

export default function withData(Component, defaultElement) {
    class newComponent extends React.Component {
        constructor(props) {
            super(props)
            this.mountListeners(props)
        }

        // TODO: use modern react
        componentWillReceiveProps(nextProps) {
            // TODO: give listeners identifiers so we don't always remount
            // const nextIdentifiers = Object.values(nextProps.listeners || {}).map(listener => listener.identifier)
            // const prevIdentifiers = Object.values(this.props.listeners || {}).map(listener => listener.identifier)

          //  if (!Util.objectEq(nextIdentifiers, prevIdentifiers)) {
                this.unmountListeners()
                this.mountListeners(nextProps)
           // }
        }

        componentWillUnmount() {
            this.unmountListeners()
        }

        mountListeners(props) {
            const listeners = props.listeners || []
            const cache = {}

            listeners.forEach((listener) => {
                cache[listener.shortName] = undefined

                listener.on((data) => {
                    cache[listener.shortName] = data
                    if (Object.values(cache).every(val => val)) {
                        this.gotData = true;
                        this.setState(cache)
                    }
                })
            })

            if (!Object.keys(listeners).length) {
                this.gotData = true
            }
        }

        unmountListeners() {
            this.listeners.forEach(l => l.off())
        }

        render() {
            const props = this.props
            if (this.gotData) {
                return <Component {...this.state} {...props} />
            } else if (defaultElement) {
                return defaultElement
            }
            return <div style={{ display: 'inline' }} className="react-loading">Loading</div>
        }
    }
    return newComponent
}
