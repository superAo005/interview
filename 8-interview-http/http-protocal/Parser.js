/**
 * 使用状态机来解析请求,获取到请求行 请求头 请求体
 */
let LF=10,//换行 Line Feed
    CR= 13,//回车  Carriage Return
    SPACE = 32;//空格
    COLON= 58;//冒号
let INIT=0,
    START=1,
    REQUEST_LINE=2,
    HEADER_FIELD_START= 3,
    HEADER_FIELD=4,
    HEADER_VALUE_START= 5,
    HEADER_VALUE=6,
    BODY=7;

class Parser{
    constructor(){
        this.state = INIT;
    }
    parse(buffer){
        let self=this,
            requestLine='',//POST /post HTTP/1.1
            headers={},//{Host: 127.0.0.1:8080}
            body='',//{"name":"superao","age":11}
            i=0,
            char,
            headerField='',
            headerValue='';
            debugger
        let state=START;
        for(i=0;i<buffer.length;i++){
            char = buffer[i];
            switch(state){
                case START:
                    state =REQUEST_LINE;
                    self['requestLineMark']=i;//记录一下请求行开始的索引
                case REQUEST_LINE:
                    if(char === CR){//回车 /r
                        requestLine=buffer.toString('utf8',self['requestLineMark'],i);
                        break;
                    }else if(char === LF){// \n
                        state = HEADER_FIELD_START;
                    }
                    break;
                case HEADER_FIELD_START:
                    if(char == CR){
                        //如果是这样的,说明下面该读请求体了
                        state = BODY;
                        self['bodyMark']=i+2;
                    }else {
                        state=HEADER_FIELD;
                        self['headerFieldMark']=i;
                    }
                case HEADER_FIELD:
                    if(char === COLON){//如果遇到冒号
                        headerField=buffer.toString('utf8',self['headerFieldMark'],i);
                        state = HEADER_VALUE_START;
                    }
                    break;
                case HEADER_VALUE_START:
                    if(char === SPACE){
                        break;
                    }
                    self['headerValueMark']=i;
                    state = HEADER_VALUE;
                case HEADER_VALUE:
                    if(char === CR){
                        headerValue=buffer.toString('utf8',self['headerValueMark'],i);
                        headers[headerField]=headerValue;
                        headerField=headerValue='';
                    }else if(char === LF){
                        state=HEADER_FIELD_START;
                    }
                  break;  

            }    
        }
        let [method,url]= requestLine.split(' ');
        body = buffer.toString('utf8',self['bodyMark']);
        return {method,url,headers,body}
    }
}
module.exports = Parser;
/**
POST /post HTTP/1.1\r\n
Host: 127.0.0.1:8080\r\n
Connection: keep-alive\r\n
Content-Length: 27\r\n
\r\n
{"name":"superao","age":11}
 */
//为什么实际实现中不能split
// 数据传输的是流式的不连续的 而且 可能很大