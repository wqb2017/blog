
<template>
  <div>
    <el-dialog :close-on-click-modal="false" @close="closeModal" title="上传视频" :visible.sync="modal" size="tiny" class="editor_modal_video">
        <!-- <el-tabs v-model="active" type="card">
            <el-tab-pane label="上传视频" name="upload"> -->
                <div>
                    <el-upload ref="videoUpload"
                        drag
                        :action="uploadUrl"
                        name="video"
                        :disabled="isUploading"
                        :on-success="successHandle"
                        :before-upload="beforeHandle"
                        :on-progress="progressHandle"
                        :on-error="errorHandle">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </div>
            <!-- </el-tab-pane> -->
           <!-- <el-tab-pane label="插入视频" name="insert">
                <el-input v-model.trim="videoUrl" placeholder="请输入视频地址"></el-input>
            </el-tab-pane> -->
        <!-- </el-tabs> -->
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="modal = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.editor_modal_video .el-dialog {
  width: 600px;
}
.el-upload-dragger {
  width: 560px;
}

</style>
<script>
var appRoot = "http://192.168.9.84:8046";
var appHost = "/ecms";
let i = 0;
export default {
  name: "dialogs",
  data() {
    return {
      modal: false,
      active: "upload",
      videoUrl: "", //输入视频链接
      uploadUrl: "", //视频上传地址
      downUrl: "", //视频下载地址
      tempVideo: [], //上传多个视频
      isUploading: false,
      editor: {},
      disableUpload: false
    };
  },
  methods: {
    closeModal() {
      this.modal = false;
      this.isUploading = false;
      this.tempVideo = [];
      this.$refs.videoUpload.abort();
      this.$refs.videoUpload.clearFiles();
    },
    openModal(editor) {
      this.editor = editor;
      this.uploadUrl = editor.options.videoUploadUrl; //设置上传视频地址
      this.downUrl = editor.options.videoDownUrl; //设置下载获取地址
      this.videoUrl = "";
      this.isUploading = false;
      this.tempVideo = [];
      this.modal = true;
    },
    beforeHandle(file) {
      let { size, name } = file;
      let fileKey = $.md5(`${size}${name}`);
      log(fileKey);
      const isVideo = file.type === "video/mp4";
      const isLt1G = size < 1024 * 1024 * 1024;
      if (!isVideo) {
        this.$message({ message: "视频只能是mp4格式", type: "warning" });
      }
      if (!isLt1G) {
        this.$message({ message: "视频不能大于1G!", type: "warning" });
      }
      return isVideo && isLt1G;
    },
    progressHandle() {
      this.isUploading = true;
    },
    successHandle(response, file, fileList) {
      if (response.state != 0) {
        let url = this.getUploadUrl(
          "sys",
          "News",
          "playVideo",
          response.content
        );
        this.tempVideo.push(url);
      } else {
        this.$message({ message: "视频上传出错!", type: "warning" });
      }
      this.isUploading = false;
    },
    errorHandle(response, file, fileList) {
      this.$message({ message: "视频上传出错!", type: "warning" });
      this.isUploading = false;
    },
    submit() {

      if (this.isUploading) {
        this.$message({ message: "请等待视频上传完成!", type: "warning" });
        return;
      } else {
        let src = "";
        if (this.active == "upload") {
          //上传文件
          src = this.tempVideo;
        } else {
          if (!this.videoUrl) {
            this.$message({ message: "请输入视频地址!", type: "warning" });
            return;
          }
          src = this.videoUrl;
        }
        src.forEach((item, index)=>{
          i++;
          this.editor.execCommand(
            "inserthtml",
            `<iframe style="width: 640px !important; height: 370px; display: block; margin:0 auto;" class="player" src="${appHost}${appRoot}/static/video/index.html?index=${i}&url=${item}"></iframe><br />`
          );
        });
        this.videoUrl = [];
        this.modal = false;
      }
    }
  }
};
</script>