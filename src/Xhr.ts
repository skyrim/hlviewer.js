export type ProgressCallback = (request: XMLHttpRequest, progress: number) => void

export interface XhrParams {
  method: string
  isBinary: boolean
  progressCallback: ProgressCallback
}

export function xhr(url: string, params: XhrParams) {
  const method = params.method || 'GET'
  const isBinary = params.isBinary
  const progressCallback = params.progressCallback

  if (!url) {
    throw new Error('Url parameter missing')
  }

  return new Promise<any>((resolve, reject) => {
    const request = new XMLHttpRequest()

    if (isBinary) {
      request.responseType = 'arraybuffer'
    }

    if (isBinary && progressCallback) {
      request.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          progressCallback(request, event.loaded / event.total)
        } else {
          // HACK!
          const totalStr = request.getResponseHeader('content-length')
          let total = 0
          if (totalStr) {
            total = Number.parseFloat(totalStr)
          }
          const encoding = request.getResponseHeader('content-encoding')
          if (total && encoding && encoding.indexOf('gzip') > -1) {
            // assuming average gzip compression ratio to be 25%
            total *= 4
            const loadedPercent = Math.min(0.99, event.loaded / total)
            progressCallback(request, loadedPercent)
            // END OF HACK
          } else {
            progressCallback(request, 0)
          }
        }
      })
    }

    request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 200) {
        if (progressCallback) {
          progressCallback(request, 1)
        }

        resolve(request.response)
      } else {
        reject({
          status: request.status
        })
      }
    })

    request.open(method, url, true)
    request.send()
  })
}
