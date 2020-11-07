<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 个人设置
        </el-breadcrumb-item>
        <el-breadcrumb-item>资料修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名" prop="username" :rules="[
      { required: true, message: '请输入用户名', trigger: 'blur' }]">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item prop="email"
                        label="邮箱"
                        :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' }
    ]">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="修改头像">
            <div class="crop-demo">
              <img :src="form.cropImg" class="pre-img" width="100px" height="100px">
              <div class="crop-demo-btn">选择图片
                <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
              </div>
            </div>

            <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
              <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage"
                           style="width:100%;height:300px;"></vue-cropper>
              <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelCrop">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
          </el-form-item>
          <el-form-item label="部门">
              <el-select v-model="form.deparment" placeholder="请选择">
                  <el-option
                      v-for="item in options"
                      :key="item"
                      :label="item"
                      :value="item">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="座右铭">
            <el-input type="textarea" rows="5" v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">表单提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
    import VueCropper  from 'vue-cropperjs';
    import bus from '../common/bus'
    export default {
        name: 'baseform',
        data() {
            return {
                imgSrc: '',
                fileList: [],
                dialogVisible: false,
                options: ['财务部','销售部','研发部','售后部','行政部'],
                form: {  }
            };
        },
        components: {
            VueCropper
        },
        methods: {
            // setImage(e){
            //     const file = e.target.files[0];
            //     if (!file.type.includes('image/')) {
            //         return;
            //     }
            //     const reader = new FileReader();
            //     reader.onload = (event) => {
            //         this.dialogVisible = true;
            //         this.imgSrc = event.target.result;
            //         this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
            //     };
            //     reader.readAsDataURL(file);
            // },
            // cropImage () {
            //     this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            // },
            // cancelCrop(){
            //     this.dialogVisible = false;
            //     this.cropImg = this.defaultSrc;
            // },
            onSubmit() {
                if(this.form.username.trim() === '' || this.form.email.trim() === '') return
                this.$message.success('提交成功！');
                // this.form.cropImg = this.imgSrc || this.form.cropImg
                localStorage.setItem('ms_username', JSON.stringify(this.form))
                bus.$emit('updata',this.form)
                console.log(this.form);
            },
            setImage(e){
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.imgSrc = event.target.result;
                    console.log(this.imgSrc);
                    this.form.cropImg = this.imgSrc
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
            },
            cropImage () {
                this.form.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
                // localStorage.setItem('ms_username', JSON.stringify(this.form))
                console.log(this.form);
            },
            cancelCrop(){
                this.dialogVisible = false;
                // this.form.cropImg = this.defaultSrc;
            }
        },
        watch: {
            form: {
                handler(newVal, oldVal) {
                    console.log('表单变了');
                    console.log(newVal);
                    this.form = newVal
                },
                deep: true
            }
        },
        created() {
            const userData = JSON.parse(localStorage.getItem('ms_username'))
            this.form = userData
            console.log(this.form);
        }
    };
</script>
<style scoped>
    .crop-demo-btn{
        position: relative;
        width: 100px;
        left: -30px;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>
