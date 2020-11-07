<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img :src="cropImg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div v-if="lastdata" class="user-info-list">
                        上次登录时间：
                        <span>{{lastdata}}</span>
                    </div>
                    <div v-else class="user-info-list tran">
                        <span>欢迎新用户!!!</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>江西南昌</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS
                    <el-progress :percentage="13.7"></el-progress>HTML
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <el-menu :default-active="activeIndex"
                                 class="el-menu-demo"
                                 mode="horizontal" @select="handleSelect">
                            <el-menu-item index="1">待办事项</el-menu-item>
                            <el-menu-item index="2">已完成事项</el-menu-item>
                        </el-menu>
                        <el-button
                            style="float: right; padding: 3px 0"
                            type="text" @click="addList">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="activeStatus ? undoneList : successList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template slot-scope="scope">
                                <i class="el-icon-edit" @click="editList(scope.row)"></i>
                                <i class="el-icon-delete" @click="deletetList(scope.row)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import bus from '../common/bus';

export default {
    name: 'dashboard',
    data() {
        return {
            activeStatus: true,
            activeIndex: '1',
            cropImg: JSON.parse(localStorage.getItem('ms_username')).cropImg,
            lastdata: localStorage.getItem('lastdata'),
            name: JSON.parse(localStorage.getItem('ms_username')).username,
            todoList: [{title: '敲100行代码',status: true},{title: '敲1000行代码',status: true},{title: '敲10000行代码',status: true},{title: '敲100000行代码',status: false}]
        };
    },
    components: {},
    created() {
        if(localStorage.getItem('todoList')){
            let windowList = localStorage.getItem('todoList').split('%').slice(0,-1)
            windowList.forEach((i, index)=> windowList[index] = JSON.parse(i))
            this.todoList = windowList
        }
        bus.$on('updata', msg => {
            this.name = msg.username,
                this.cropImg = msg.cropImg
            console.log(2);
            console.log(this.name);
        })
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        },
        successList() {
            return this.todoList.filter(i => i.status)
        },
        undoneList() {
            return this.todoList.filter(i => !i.status)
        }
    },
    watch:{
        todoList: {
            handler(newVal, oldVal) {
                let todoListStr = ''
                newVal.forEach(i => {
                    todoListStr+=JSON.stringify(i) + '%'
                })
                localStorage.setItem('todoList', todoListStr)
            },
            deep: true
        },
        activeStatus (newValue){
            this.activeIndex = newValue ? '1' : '2'
        }
    },
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        editList(index) {
            this.$prompt('请输入事项(输入框不能为空或者不能超过16个字)', '编辑', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: index.title,
                closeOnClickModal: false
            }).then(({ value }) => {
                const status = value.trim() && value.length < 17
                this.$message({
                    type: status ? 'success':'info',
                    message: status? '添加成功' : '添加失败'
                });
                if(status && !this.todoList.some(i => i.title === value)){
                    let listIndex
                    this.todoList.filter((item, inde) => {
                        if(item.title === index.title){
                            listIndex = inde
                        }
                    })
                    this.todoList[listIndex].title = value
                    if (this.todoList[listIndex].status) this.todoList[listIndex].status=false
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '添加失败'
                });
            });
        },
        deletetList(index) {
            if (index.status) {
                this.$message({
                    type: 'success',
                    message: '删除成功'
                });
                this.todoList = this.todoList.filter(i => i.title !== index.title)
            }else {
                this.$confirm('该事项还没有完成, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.todoList = this.todoList.filter(i => i.title !== index.title)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        addList() {
            this.$prompt('请输入事项(输入框不能为空或者不能超过16个字)', '添加', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false
            }).then(({ value }) => {
                const status = value.trim() && value.length < 17
                this.$message({
                    type: status ? 'success':'info',
                    message: status? '添加成功' : '添加失败'
                });
                if(status && !this.todoList.some(i => i.title === value)){
                    this.todoList.push({title: value,status: false})
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '添加失败'
                });
            });
        },
        handleSelect(index) {
            index === '1' ? this.activeStatus = true : this.activeStatus = false
            console.log(index,this.activeStatus);
        }
        // changeDate() {
        //     const now = new Date().getTime();
        //     this.data.forEach((item, index) => {
        //         const date = new Date(now - (6 - index) * 86400000);
        //         item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        //     });
        // }
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}
.el-icon-edit{
    margin-right: 15px;
}
.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}
.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}
.tran span{
    white-space: nowrap;
    margin-left: -102px;
    animation: myfirst 8s linear infinite;
}
@keyframes myfirst
{
    100% {margin-left: 400px}
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
