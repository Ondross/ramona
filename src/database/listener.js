import {db} from "./initialize"

// export function collection(pathOrListener) {
//     this.off = () => { }
//     const on = (callback) => {
//         this.off = db
//             .collection(pathOrListener)
//             .onSnapshot(snapshots => {
//                 const data = {}
//                 snapshots.forEach(function (doc) {
//                     data[doc.id] = doc.data()
//                 })
//                 callback(data)
//             })
//     }

//     this.on = on
// }


// TODO: support collections, docs, and single key/strings
// TODO: test more nesting
// TODO: consolidate/cleanup the duplicate path resolving code (it's identical except on vs once)

export default function listener(path, shortName) {
    this.shortName = shortName

    const set = (val) => {
        const resolvedPath = []
        const unresolved = {}
        
        const writeData = () => {
            if (Object.keys(unresolved).length === 0) {
                db.doc(resolvedPath.join('/')).set(val)
            }
        }

        path.forEach((val, idx) => {
            if (typeof val === 'string') {
                resolvedPath[idx] = val
            } else {
                unresolved[idx] = true
                val.once().then((data) => {
                    resolvedPath[idx] = data
                    delete unresolved[idx]
                    writeData()
                })
            }
        })

        writeData()
    }

    const on = (callback) => {
        const resolvedPath = []
        const unresolved = {}
        let mainListenerOff = () => {}
        const readData = () => {
            if (Object.keys(unresolved).length === 0) {
                mainListenerOff()
                mainListenerOff = db.doc(resolvedPath.join('/')).onSnapshot(snapshot => {
                    callback(snapshot.data())
                })
            }
        }

        const offs = {}
        path.forEach((val, idx) => {
            if (typeof val === 'string') {
                resolvedPath[idx] = val
            } else {
                unresolved[idx] = true
                offs[idx] = val.on((data) => {
                    resolvedPath[idx] = data
                    delete unresolved[idx]
                    readData()
                })
            }
        })
        readData()

        return () => {
            mainListenerOff()
            Object.values(offs).forEach(off => off())
        }
    }

    const once = () => new Promise ((resolve) => {
        const resolvedPath = []
        const unresolved = {}

        const readData = () => {
            if (Object.keys(unresolved).length === 0) {
                db.doc(resolvedPath.join('/')).get().then(snapshot => {
                    resolve(snapshot.data())
                })            
            }
        }

        path.forEach((val, idx) => {
            if (typeof val === 'string') {
                resolvedPath[idx] = val
            } else {
                unresolved[idx] = true
                val.once().then((data) => {
                    resolvedPath[idx] = data
                    delete unresolved[idx]
                    readData()
                })
            }
        })

        readData()
    })

    this.on = on
    this.set = set
    this.once = once
}
