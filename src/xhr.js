export default function xhr(url, {method, isBinary, progressCallback} = {}) {
    method = method || 'GET'
    isBinary = isBinary || false
    progressCallback = progressCallback || null

    if (!url) {
        throw new Error('Url parameter missing')
    }
    
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest()
        if (isBinary) {
            request.responseType = 'arraybuffer'
        }
        if (isBinary && progressCallback) {
            request.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    progressCallback(request, event.loaded / event.total)
                } else {
                    progressCallback(request, 0)
                }
            })
        }
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
        request.open(method, url, true)
        request.send()
    })
}