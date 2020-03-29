const socket = io('http://localhost:8000');

const app = new Vue({
    el: '#message-app',
    data: {
        messages : [],
        msg : '',
        users : [],
        channels : [],
        username : ''
    },
    created() {
        socket.on('chat message', async (msg) => {
            this.messages.push(msg);

            await this.$nextTick();
            this.scrollToEnd();
        });
    },
    methods : {
        sendMessage(){
            const message = {
                text: this.msg, 
                time: new Date().toLocaleString(),
                username: this.username
            }
            socket.emit('chat message', message); 
            this.msg = '';
        },
        scrollToEnd(){
            const container = this.$el.querySelector(".message-main");
            container.scrollTop = container.scrollHeight;
        }
    },
    filters : {
        timestamp(value){
            return value.replace(',','');
        }
    }
});
