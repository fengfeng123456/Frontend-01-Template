

// 'abababx', 
function match(str) {
  class Parse {
    constructor() {
      this.WAITING_1 = 1
      this.WAITING_2 = 2
      this.WAITING_3 = 3
      this.length = 0
      this.content = []

      this.current = this.WAITING_1
    }
    reset() {
      this.length = 0
      this.content = []
      this.current = this.WAITING_1
    }
    handleChar(char) {
      if (this.current == this.WAITING_1) {
        if (char === 'a') {
          if (this.length == 0 || this.length == 2 || this.length == 4) {
            this.current = this.WAITING_2
            this.content.push(char)
            this.length++
          }
        } else if (char === 'x' && this.length == 6) {
          this.content.push(char)
          return true
        } else {
          this.reset()
        }
      } else if (this.current == this.WAITING_2) {
        if (char === 'b') {
          if (this.length == 1 || this.length == 3 || this.length == 5) {
            this.current = this.WAITING_1
            this.content.push(char)
            this.length++
          }
        }
      } else {
        this.reset()
      }
      
    }
    handleStr(str) {
      for (let i = 0; i < str.length; i++) {
        var result = this.handleChar(str[i])
        if (result) return result
      }

      return false
    }
  }


  return (new Parse()).handleStr(str)
}

console.log(match('i am abababx'))