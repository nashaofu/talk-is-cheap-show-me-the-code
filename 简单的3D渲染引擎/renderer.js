class Renderer {
  constructor({ width, height }) {
    this.width = width
    this.height = height
    this.dx = width / 2
    this.dy = height / 2
    this.dom = document.createElement('canvas')
    this.dom.width = width
    this.dom.height = height
    this.ctx = this.dom.getContext('2d')
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
    this.ctx.fillStyle = 'rgba(0, 150, 255, 0.3)'
  }

  to2d({ x, y, z }) {
    // 摄像机距离
    const d = 200
    const r = 1
    return {
      x: parseFloat(r * x) + this.dx,
      y: -parseFloat(r * z) + this.dy
    }
  }

  render(...args) {
    // Clear the previous frame
    this.ctx.clearRect(0, 0, this.width, this.height)
    for (let i = 0, length = args.length; i < length; i++) {
      const faces = args[i].faces
      // 绘制每一个面
      for (let fi = 0, fLength = faces.length; fi < fLength; fi++) {
        const face = faces[fi]
        const point = this.to2d(face[0])
        this.ctx.beginPath()
        this.ctx.moveTo(point.x, point.y)

        // Draw the other vertices
        for (let pi = 1, pLength = face.length; pi < pLength; pi++) {
          const point = this.to2d(face[pi])
          this.ctx.lineTo(point.x, point.y)
        }

        // Close the path and draw the face
        this.ctx.closePath()
        this.ctx.stroke()
        this.ctx.fill()
      }
    }
  }
}
