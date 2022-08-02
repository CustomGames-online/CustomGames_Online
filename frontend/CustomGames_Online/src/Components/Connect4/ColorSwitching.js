class ColorSwitching {
  constructor() {
    this.color = 'brown'
    this.column = 0
  }
  
  switch(column) {
    if (this.column === column) {
      this.color = this.color === 'white' ? 'brown' : 'white'
    } else {
      this.column = column
    }
    return this.color
  }
}

export default ColorSwitching