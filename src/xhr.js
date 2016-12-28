import Promise from 'bluebird'

export default function xhr(url, {method, isBinary} = {}) {
    method = method || 'GET'
    isBinary = isBinary || false

    if (!url) {
        throw new Error('Url parameter missing')
    }
    
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest()
        if (isBinary) {
            request.responseType = 'arraybuffer'
        }
        request.open(method, url, true)
        request.addEventListener('readystatechange', (event) => {
            if (event.target.readyState !== 4) {
                return
            }

            if (event.target.status === 200) {
                resolve(event.target.response)
            } else {
                reject({
                    status: event.target.status,
                    message: event.target.responseText
                })
            }
        })
        request.send()
    })
}