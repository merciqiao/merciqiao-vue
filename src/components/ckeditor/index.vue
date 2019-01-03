<template>
    <div class="document-editor">
        <!-- 工具栏容器 start -->
        <div class="document-editor__toolbar"></div>
        <!-- 工具栏容器 end -->

        <!-- 编辑器容器 start -->
        <div class="document-editor__editable-container">
            <div class="document-editor__editable">
                <p>CSDN同款富文本编辑器，支持将截图直接粘贴进来</p>
            </div>
        </div>
        <!-- 编辑器容器 end -->
    </div>
</template>
<style>
.document-editor__editable{
    
    min-height: 400px;
}
</style>

<script>

// import DecoupledEditor from '@ckeditor/ckeditor5-build-classic';//经典模式
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';//文档模式

export default {
    name:"ckeditor",
    data() {
        return {
            EditorObj: null,//编辑器实例
        }
    },
    mounted() {
        this.initCKEditor()
    },
    methods: {
        //初始化容器
        initCKEditor() {
                DecoupledEditor.create(document.querySelector('.document-editor__editable'), {
                    ckfinder: {
                        // Upload the images to the server using the CKFinder QuickUpload command.
                        uploadUrl: '/api/img-api/upload'
                    }
                })
                .then(editor => {
                    const toolbarContainer = document.querySelector('.document-editor__toolbar');
                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);//添加工具栏
                    this.EditorObj = editor;
                })
                .catch(err => {
                    console.error(err);
                });
        }

    }

}



</script>

