import { Observable, ProgressCb, ErrorCb, CompleteCb } from './Observable'

type XhrMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export function xhr(
  url: string,
  params: {
    method?: XhrMethod
    isBinary: false
  }
): Observable<string>

export function xhr(
  url: string,
  params: {
    method?: XhrMethod
    isBinary: true
  }
): Observable<ArrayBuffer>

export function xhr<T>(
  url: string,
  params: {
    method?: XhrMethod
    isBinary?: boolean
  }
): Observable<T> {
  const method = params.method || 'GET'
  const isBinary = params.isBinary

  if (!url) {
    throw new Error('Url parameter missing')
  }

  const request = new XMLHttpRequest()

  if (isBinary) {
    request.responseType = 'arraybuffer'
  }

  const onProgress: ProgressCb[] = []
  const onError: ErrorCb[] = []
  const onComplete: CompleteCb<T>[] = []

  if (isBinary) {
    request.addEventListener('progress', event => {
      if (!onProgress.length) {
        return
      }

      if (event.lengthComputable) {
        onProgress.forEach(cb => cb(event.loaded / event.total))
      } else {
        // HACK!
        const totalStr = request.getResponseHeader('content-length')
        let total = totalStr ? parseFloat(totalStr) : 0
        const encoding = request.getResponseHeader('content-encoding')
        if (total && encoding && encoding.indexOf('gzip') > -1) {
          // assuming average gzip compression ratio to be 25%
          total *= 4
          const loadedPercent = Math.min(0.99, event.loaded / total)
          onProgress.forEach(cb => cb(loadedPercent))
          // END OF HACK
        } else {
          onProgress.forEach(cb => cb(0))
        }
      }
    })
  }

  request.addEventListener('readystatechange', (event: any) => {
    if (event.target.readyState !== 4) {
      return
    }

    if (event.target.status === 200) {
      onProgress.forEach(cb => cb(1))
      onComplete.forEach(cb => cb(event.target.response))
    } else {
      onError.forEach(cb => cb(new Error(event.error)))
    }
  })

  request.open(method, url, true)
  request.send()

  return {
    subscribe: params => {
      params.progress && onProgress.push(params.progress)
      params.error && onError.push(params.error)
      params.complete && onComplete.push(params.complete)

      return () => {
        if (params.progress) {
          const idx = onProgress.indexOf(params.progress)
          if (idx > -1) {
            onProgress.splice(idx, 1)
          }
        }

        if (params.error) {
          const idx = onError.indexOf(params.error)
          if (idx > -1) {
            onError.splice(idx, 1)
          }
        }

        if (params.complete) {
          const idx = onComplete.indexOf(params.complete)
          if (idx > -1) {
            onComplete.splice(idx, 1)
          }
        }

        request.abort()
      }
    }
  }
}
