class ColorSwitching {
  constructor(color1, color2) {
    this.color1 = color1 || '#769656';
    this.color2 = color2 || '#eeeed2';
    this.color = this.color1;
    this.column = 0;
  }

  switch(column) {
    if (this.column === column) {
      this.color = this.color === this.color2 ? this.color1 : this.color2;
    } else {
      this.column = column;
    }
    return this.color;
  }
}

export default ColorSwitching;
