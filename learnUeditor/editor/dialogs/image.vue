<template>
  <div>
    <el-dialog  @close="closeModal" title="上传图片" :visible.sync="modal" size="tiny" class="editor_modal_image">
        <el-upload accept="image/png,image/jpeg,image/gif" ref="imageUpload"
            drag
            multiple
            list-type="picture"
            :action="uploadUrl"
            :on-success="successHandle"
            :on-remove="removeHandle"
            :on-error="errorHandle">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
        </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modal = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.editor_modal_image .el-dialog {
  width: 600px;
  .el-upload-list {
    max-height: 350px;
    overflow-y: scroll;
  }
  .el-upload-list__item {
    width: 170px;
    height: 160px;
    float: left;
    margin-right: 10px;
    img {
      height: 130px;
      width: 150px;
      margin-top: 10px;
    }
    .el-upload-list__item-name i {
      display: none;
    }
  }
  .el-upload-list--picture .el-upload-list__item {
    padding: 0;
  }
  .el-upload-list__item-thumbnail {
    margin-left: 0;
  }
  .el-upload-list__item:nth-child(3n) {
    margin-left: 0 !important;
  }
}
.el-upload-dragger {
  width: 560px;
}
</style>
<script>
let index = 0;
export default {
  data() {
    return {
      modal: false,
      active: "first",
      editor: {},
      uploadUrl: "",
      imageList: [],
      imageOnload: [],
      isComplete: false,
    };
  },
   mounted(){
    this.$nextTick(()=>{
      $('.edui-body-container').on('scroll', function(){
        $('.edui-scale').hide();
      });
    });
  },
  methods: {
    openModal(editor) {
      index = 0;
      this.editor = editor;
      this.uploadUrl = editor.options.imageUploadUrl;
      this.modal = true;
    },
    closeModal(){
      this.isComplete = false;
      this.imageList = [];
      this.$refs.imageUpload && this.$refs.imageUpload.clearFiles();
    },
    successHandle(response, file, fileList) {
      index++;
      this.getImage(fileList, this.editor);
    },
    removeHandle(file, fileList) {
      index--; 
      this.getImage(fileList, this.editor);
    },
    getImage(lists, editor) {
      this.imageList = [];
      if (index == lists.length) {
        let $this = this;
        lists.forEach(list => {
          var img = new Image();
          this.imageOnload.push(
            new Promise((resolve, reject) => {
              img.onload = function() {
                let imgStr = `<p align="center" class="editor-temp-p-${index}"><img class="thumb-img fr-fic fr-dib fr-draggable" data-size="${list.size}" data-width="${this.width}" data-height="${this.height}" src="${editor.options.imageDownUrl}${list.response.content.picId}/download"/></p>`;
                $this.imageList.push(imgStr);
                resolve();
              };
            })
          );
          img.src = list.url;
        });
        Promise.all(this.imageOnload).then(() => {
          this.isComplete = true;
        });
      }
    },
    submit() {
      if (this.isComplete) {
        index = 0;
        this.editor.execCommand("inserthtml", this.imageList.join(''), true);
        this.modal = false;
      }else{
         this.$message({ message: "请选择图片或等待图片上传完成!",type: "warning"});
      }
    },
    errorHandle() {}
  }
};
</script>
