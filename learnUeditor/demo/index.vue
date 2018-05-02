<template>
  <div>
    <LansPanel>
      4444444444
      <!-- <LansDditor class="editor-article-write" :ueditorConfig="ueditorConfig" @editorReady="editorReady" style="width: 100%;"></LansDditor> -->
    </LansPanel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ueditorConfig: {},
    };
  },
  created() {
    this.ueditorConfig = {
      toolbar: [
        " bold italic underline | justifyleft justifycenter justifyright justifyjustify | fontfamily | fontsize | forecolor | backcolor | removeformat |",
        "insertorderedlist horizontal | link ",
        " emotion | image video fullscreen | undo redo "
      ],
    };
  },
  methods: {
    editorReady(editor) {
      this.editorInstance = editor;
      editor.addListener("contentChange", () => {
        this.form.content = editor.getContent();
      });
      editor.setContent("");
    },
  }
};
</script>
