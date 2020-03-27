let socket = io('http://localhost:8000');

let app = new Vue({
    el: '#message-app',
    data: {
        messages : [],
        msg : ''
    },
    created() {

        socket.on('chat message', (msg) => {
            this.messages.push({
                text : msg
            })
        });
    },
    methods : {
        sendMessage(){
            socket.emit('chat message', this.msg); 
            this.msg = '';
        }
    }
});
