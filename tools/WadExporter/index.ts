import { resolve } from 'node:path'
import { promisify } from 'node:util'
import { readFile, createWriteStream, existsSync, mkdir } from 'node:fs'
import { PNG } from 'pngjs'
import { Wad } from '../../src/Parsers/Wad'

const mkdirP = promisify(mkdir)
const readFileP = promisify(readFile)

function toArrayBuffer(buf: Buffer): ArrayBuffer {
  const ab = new ArrayBuffer(buf.length)
  const view = new Uint8Array(ab)
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i]
  }
  return ab
}

export const WadExporter = {
  async export(path: string, out: string) {
    const buffer = await readFileP(path, { flag: 'r' }).catch(() => {
      console.log('File not found or could not be opened')
    })
    if (!buffer) {
      return
    }

    if (!existsSync(out)) {
      await mkdirP(out)
    }

    const arrayBuffer = toArrayBuffer(buffer)
    const wad = await Wad.parse(arrayBuffer)

    for (let i = 0; i < wad.entries.length; ++i) {
      const entry = wad.entries[i]
      if (entry.type !== 'texture') {
        continue
      }

      const msg = `Exporting: ${entry.name}`
      process.stdout.write(msg)

      const png = new PNG({
        width: entry.width,
        height: entry.height
      })

      const mipmap = entry.data
      for (let i = 0; i < mipmap.length; ++i) {
        png.data[i] = mipmap[i]
      }

      png.pack().pipe(createWriteStream(`${out}/${entry.name}.png`))

      const dots: string[] = []
      for (let j = 0; j < 30 - msg.length; ++j) {
        dots.push('.')
      }
      process.stdout.write(`${dots.join('')}DONE\n`)
    }

    console.log(
      `\nSuccessfully exported all textures from "${resolve(process.cwd(), path)}"\n into "${resolve(
        process.cwd(),
        out
      )}" directory\n`
    )
  }
}

function getParam(params: string[], name: string) {
  let val: string | null = null
  for (let i = 0; i < params.length; ++i) {
    if (params[i] === name) {
      val = params[i + 1]
      break
    }
  }

  return val
}

async function main() {
  const path = getParam(process.argv, '--path')
  const out = getParam(process.argv, '--out')

  if (!path) {
    console.log('--path parameter missing')
    return
  }

  if (!out) {
    console.log('--out parameter missing')
    return
  }

  await WadExporter.export(path, out)
}

main()
