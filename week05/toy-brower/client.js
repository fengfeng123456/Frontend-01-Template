const net = require('net');


class ResponseParser {
  constructor(){
    this.WAITING_STATUS_LINE = 0
    this.WAITING_STATUS_LINE_END = 1
    this.WAITING_HEADER_NAME = 2
    this.WAITING_HEADER_SPACE = 3
    this.WAITINF_HEADER_VALUE = 4
    this.WAITING_HEADER_LINE_END = 5
    this.WAITING_HEADER_BLOCK_END = 6
    this.WAITING_BODY = 7

    this.current = this.WAITING_STATUS_LINE 
    this.statusLine = ""
    this.headers = {}
    this.headerName = ""
    this.headerVaule = ""
    this.bodyParser = null
  }
  get isFinished(){
    return this.bodyParser && this.bodyParser.isFinished
  }
  get responce() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\S\s]+)/)
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }
  receive(string){
    for(let i=0;i<string.length;i++){
      this.receiveChar(string[i])
    } 
    // console.log(this.statusLine)
    // console.log(this.headers)
  }
  receiveChar(char){
    if (this.current === this.WAITING_STATUS_LINE){
      if (char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END
      } else {
        this.statusLine+=char
      }
    }
    else if (this.current === this.WAITING_STATUS_LINE_END) {
      if(char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    }
    else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE
      } else if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END
        // 开始创建body
        if (this.headers['Transfer-Encoding'] === 'chunked') {

          this.bodyParser = new TrunkedBodyParse()
        }
      } else {
        this.headerName += char
      }
    }
    else if (this.current === this.WAITING_HEADER_SPACE) {
      if(char === ' ') {
        this.current = this.WAITINF_HEADER_VALUE
      }
    }
    else if(this.current === this.WAITINF_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerVaule
        this.headerName = ''
        this.headerVaule = ''
      }else {
        this.headerVaule += char
      }
    }
    else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    }
    else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.current = this.WAITING_BODY
      }
    }
    else if(this.current === this.WAITING_BODY) {
      this.bodyParser.receiveChar(char)
    }

  }
}

class TrunkedBodyParse{
  constructor(){
    this.WAITING_LENGTH = 0
    this.WAITING_LENGTH_LINE_END = 1
    this.READING_TRUNK = 2
    this.WAITING_NEW_LINE = 3
    this.WAITING_NEW_LINE_END = 4
    this.length = 0
    this.content = []
    // body结束，，最后一个字符为0
    this.isFinished = false

    this.current = this.WAITING_LENGTH
  }
  receiveChar(char){
    console.log(JSON.stringify(char))

    if (this.current === this.WAITING_LENGTH){
      if (char === '\r') {
        if (this.length === 0) {
          // console.log(this.content)
          // console.log('////////////////////////')
          this.isFinished = true
        }
        this.current = this.WAITING_LENGTH_LINE_END
      } else {
        // ???
        this.length *=10
        this.length += char.charCodeAt(0)-'0'.charCodeAt(0)
      }
    }
    else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_TRUNK
      }
    }
    else if (this.current === this.READING_TRUNK) {
      this.content.push(char)
      this.length--
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LINE
      }
    }
    else if (this.current === this.WAITING_NEW_LINE){
      if (char === '\r') {
        this.current = this.WAITING_NEW_LINE_END
      }
    }
    else if (this.current === this.WAITING_NEW_LINE_END){
      if (char === '\n') {
        this.current = this.WAITING_LENGTH
      }
    }
  }
}


class Request {
  // method, url=host+port+path
  // body: k/v
  // headers
  constructor(options){
    this.method = options.method || 'GET'
    this.host = options.host
    this.path = options.path || '/'
    this.port = options.port || 80
    this.body = options.body || {}
    this.headers = options.headers || {}
    if (!this.headers['Content-Type']){
      this.headers['Content-Type']='application/x-www-form-urlencoded'
    }
    
    if (this.headers['Content-Type']==='application/json')
      this.bodyText = JSON.stringify(this.body);
    else if(this.headers['Content-Type']==='application/x-www-form-urlencoded')
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');

    this.headers['Content-Length'] = this.bodyText.length

    
  }

  toString() {
// //   client.write(`
// // POST / HTTP/1.1\r
// // Content-Type: application/x-www-form-urlencoded\r
// // Content-Length: 11\r
// // \r
// // field1=aaaa`)
  return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`

  }

  open(method, url){

  }
  send(connection){
    return new Promise((resolve, reject) => {
      let parser = new ResponseParser;
      if (connection){
        connection.write(this.toString())
      }else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString())
        })
      }
      connection.on('data', (data) => {
        // 这个data，不知道是不是完整的，on(data)也许会触发很多次，才完整
        parser.receive(data.toString())

        if(parser.isFinished) {
          resolve(parser.responce)
        }
        connection.end();
      });
      connection.on('error', err => {
        reject(err)
      })
    })
  }
}


void async function(){
  let request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: '8080',
    headers: {
      ["X-foo1"]:'cucc'
    },
    body: {
      name: 'fengfeng'
    }
  })
  
  let response = await request.send()

  console.log(response)

}()




// const client = net.createConnection({ port: 8080 }, () => {
//   // 'connect' listener.
//   console.log('connected to server!');

//   let request = new Request({
//     method: 'POST',
//     host: '127.0.0.1',
//     port: '8080',
//     headers: {
//       ["X-foo1"]:'cucc'
//     },
//     body: {
//       name: 'fengfeng'
//     }
//   })

//   console.log(request.toString())
  
// // 这块内容要写对
// // http是文本传输
//   // client.write('POST / HTTP/1.1\r\n');
//   // client.write('Content-Length: 11\r\n');
//   // client.write('Content-Type: application/x-www-form-urlencoded\r\n');
//   // client.write('\r\n');
//   // client.write('field1=aaaa');

// // 这里不能字符串模板缩进呦
// //   client.write(`
// // POST / HTTP/1.1\r
// // Content-Type: application/x-www-form-urlencoded\r
// // Content-Length: 11\r
// // \r
// // field1=aaaa`)
// });
// client.on('data', (data) => {
//   console.log(data.toString());
//   client.end();
// });
// client.on('end', () => {
//   console.log('disconnected from server');
// });
// client.on('error', err => {
//   console.log(err)
// })

