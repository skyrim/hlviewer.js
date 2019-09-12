export class ReplayState {
  cameraPos: any[]
  cameraRot: any[]
  entities: any[]

  constructor(obj: any | null = null) {
    if (obj) {
      this.cameraPos = JSON.parse(JSON.stringify(obj.cameraPos))
      this.cameraRot = JSON.parse(JSON.stringify(obj.cameraRot))
      this.entities = JSON.parse(JSON.stringify(obj.entities))
    } else {
      this.cameraPos = [0, 0, 0]
      this.cameraRot = [0, 0, 0]
      this.entities = []
    }
  }

  feedFrame(frame: any) {
    switch (frame.type) {
      case 0:
      case 1: {
        this.cameraPos[0] = frame.camera.position[0]
        this.cameraPos[1] = frame.camera.position[1]
        this.cameraPos[2] = frame.camera.position[2]

        this.cameraRot[0] = frame.camera.orientation[0]
        this.cameraRot[1] = frame.camera.orientation[1]
        this.cameraRot[2] = frame.camera.orientation[2]

        // TODO: handle spawnbaseline, clientdata, and similar messages

        break
      }
    }
  }

  // TODO
  // serialize() {
  //     return JSON.stringify(this)
  // }

  // deserialize(data: string) {
  //     return JSON.parse(data)
  // }

  clone() {
    return new ReplayState(this)
  }
}
