function Alert(message,action){
    this.message = message
    this.action = action
    // 首先传入一个函数而不执行它 在
    // 内部保留这个函数 当内部处理完毕之后
    // 再回过头来调用这个函数 通常为callback
}

Alert.prototype.showMask = function(){
    var mask = document.createElement('div')
    mask.className = 'modal-mask'
    document.body.appendChild(mask)
}

// Alert不需要太多的内容  但子类可以决定显示更多的内容
Alert.prototype.showContent = function(box){

}

Alert.prototype.showBody = function(){
    var box = document.createElement('div')
    box.className = "modal-box"
    document.body.appendChild(box) 

    var mess = document.createElement('div')
    mess.className = "modal-message"
    mess.innerText = this.message
    box.appendChild(mess) 
    // 允许在消息文字下方显示更多的内容
    this.showContent(box)
    var btn = document.createElement('div')
    btn.className = "modal-btn"
    box.appendChild(btn)
}

Alert.prototype.showButton = function(){
    var btn = document.createElement('div')
    btn.innerText = '确定'
    document.querySelector('.modal-btn').appendChild(btn)
    var self = this
    btn.onclick = function(){
        self.close()
        // self.action判断self.action是否有值并是否是一个函数
        if(typeof self.action === 'function'){
            self.action()
        }
    }

    // 事件处理函数中的this指向当前监听事件的标签元素
    // 所以在这个函数中无法使用this表示Alert对象
    // 可以使用变量self 把this赋值给self 
    // 来保存Alert这个对象 变量self代替了this

}
Alert.prototype.close = function(){
    var mask = document.querySelector('.modal-mask')
    var box = document.querySelector('.modal-box')
    document.body.removeChild(mask)
    document.body.removeChild(box)
    
}
Alert.prototype.show = function(){
    this.showMask()
    this.showBody()
    this.showButton()
}