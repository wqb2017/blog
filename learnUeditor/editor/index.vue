<template>
  <div>
    <script :id="randomId" name="content" type="text/plain"></script>
   <span v-if="scriptTagStatus"></span>
  </div>
</template>

<script>
require('./themes/default/css/umeditor.css');
require('./umeditor.config');
require('./umeditor');
export default {
  name: 'VueUEditor',
  props: {
    ueditorConfig: {}
  },
  data() {
    return {
      // 为了避免麻烦，每个编辑器实例都用不同的 id
      randomId: 'editor_' + (Math.random() * 100000000000000000),
      instance: null,
      // scriptTagStatus -> 0:代码未加载，1:两个代码依赖加载了一个，2:两个代码依赖都已经加载完成
      scriptTagStatus: 0
    };
  },
  created() {
    this.initEditor();
  },
  beforeDestroy() {
    // 组件销毁的时候，要销毁 UEditor 实例
    if (this.instance !== null && this.instance.destroy) {
      this.instance.destroy();
    }
  },
  updated(){
    this.initEditor();
  },
  methods: {
    initEditor() {
      this.$nextTick(() => {
         let timer = setInterval(()=>{  //for egg pain ie...
            if(!this.instance){
              this.scriptTagStatus++;
            }else{
              clearInterval(timer);
            }
          }, 100);
        this.instance = window.UM.getEditor(this.randomId, this.ueditorConfig);
        this.$emit('editorReady', this.instance);
      });
    }
  }
};
</script>
