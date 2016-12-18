import Promise from 'bluebird'

export default function xhr(params) {
    if (!params.url) {
        throw new Error('Url parameter missing')
    }
    params.method = params.method ? params.method : 'GET'
    params.isBinary = params.isBinary ? params.isBinary : false
    
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest()
        if (params.isBinary) {
            request.responseType = 'arraybuffer'
        }
        request.open(params.method, params.url, true)
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