let socket = io('http://localhost:8000');

let app = new Vue({
    el: '#message-app',
    data: {
        messages : [],
        msg : '',
        users : [],
        channels : []
    },
    created() {
        socket.on('chat message', async (msg) => {
            this.messages.push({
                text : msg
            });

            await this.$nextTick();
            this.scrollToEnd();
        });
    },
    methods : {
        sendMessage() {
            socket.emit('chat message', this.msg); 
            this.msg = '';
        },
        scrollToEnd(){
            let container = this.$el.querySelector(".message-main");
            container.scrollTop = container.scrollHeight;
        }
    }
});
