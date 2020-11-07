<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import Mock from 'mockjs'
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        };
    },
    methods: {
        publicMessage () {
            const num = Math.ceil(Math.random()*9)
            const datet = new Date()
            const timeCount = Math.ceil(datet.getTime() / 100000)
            console.log(num);
            console.log(timeCount);
            const hour = datet.getHours() < 10 ? '0'+datet.getHours() : datet.getHours()
            const min = datet.getMinutes() < 10 ? '0'+datet.getMinutes() : datet.getMinutes()
            const sec = datet.getSeconds() < 10 ? '0'+datet.getSeconds() : datet.getSeconds()
            if(timeCount % num === 0){
                const data = {'list|1': [{
                    'title': '@cparagraph(2)',
                        'date': `${localStorage.getItem('todata')} ${hour}:${min}:${sec}`
                    }]
                }
               const mockData = Mock.mock(data).list;
               // const obj = mockData.date = `${localStorage.getItem('todata')} ${hour}:${min}:${sec}`
                // console.log(mockData.date = `${localStorage.getItem('todata')} ${hour}:${min}:${sec}`);
               //  console.log(datet);
               //  console.log(typeof obj);
                console.log(mockData);
                bus.$emit('publish-message', mockData)
            }
        }
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });
        bus.$emit('vue-message',1)
        setInterval(this.publicMessage,1000*10)

        console.log(localStorage.getItem('lastdata'));
        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    }
};
</script>
