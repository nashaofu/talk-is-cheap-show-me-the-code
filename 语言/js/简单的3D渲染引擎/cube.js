class Vertex {
  constructor(x, y, z) {
    this.x = parseFloat(x)
    this.y = parseFloat(y)
    this.z = parseFloat(z)
  }
}

class Cube {
  constructor({ x, y, z, size }) {
    const d = size / 2
    this.x = x
    this.y = y
    this.z = z

    this.vertices = [
      new Vertex(x - d, y - d, z + d),
      new Vertex(x - d, y - d, z - d),
      new Vertex(x + d, y - d, z - d),
      new Vertex(x + d, y - d, z + d),
      new Vertex(x + d, y + d, z + d),
      new Vertex(x + d, y + d, z - d),
      new Vertex(x - d, y + d, z - d),
      new Vertex(x - d, y + d, z + d)
    ]
    this.faces = [
      [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
      [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
      [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
      [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
      [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
      [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
    ]
  }

  rotate(theta, phi) {
    for (var i = 0; i < 8; ++i) {
      const vertice = this.vertices[i]
      var ct = Math.cos(theta)
      var st = Math.sin(theta)
      var cp = Math.cos(phi)
      var sp = Math.sin(phi)

      var x = vertice.x - this.x
      var y = vertice.y - this.y
      var z = vertice.z - this.z

      vertice.x = ct * x - st * cp * y + st * sp * z + this.x
      vertice.y = st * x + ct * cp * y - ct * sp * z + this.y
      vertice.z = sp * y + cp * z + this.z
    }
  }
}
