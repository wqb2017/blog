
<template>
  <div>
    <el-dialog title="插入链接" :visible.sync="modal" size="tiny" :class="'editor_modal_link'">
      <el-form :model="form" label-width="100px">
        <el-form-item label="链接地址：">
          <el-input placeholder="请输入链接地址" v-model="form.link">
          </el-input>
        </el-form-item>
        <el-form-item label="标题：">
          <el-input placeholder="请输入链接标题" v-model="form.linkTitle"></el-input>
        </el-form-item>
        <el-form-item label="新窗口打开：">
          <el-switch on-text="" off-text="" v-model="form.newTable"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modal = false">取 消</el-button>
        <el-button type="primary" @click="submit(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.editor_modal_link .el-dialog {
  width: 500px;
}
</style>
<script>
export default {
  name: 'dialogs',
  data() {
    return {
      title: '',
      modal: false,
      type: 1,
      klass: '',
      editor: {},
      form: {
        link: '',
        linkTitle: '',
        newTable: true
      }
    };
  },
  methods: {
    closeModal(){
      this.modal = false;
    },
    submit(form){
      this.editor.execCommand('inserthtml', `<a style="color: #01cd78" target="${ form.newTable ? '_blank' : '_self'}" href="${form.link}">${form.linkTitle}</a>`);
      this.closeModal();
    },
    openModal(editor) {
      this.form = {
        link: '',
        linkTitle: '',
        newTable: true
      };
      this.editor = editor;
      this.modal = true;
    }
  }
};
</script>
