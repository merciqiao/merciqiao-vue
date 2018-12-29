<template>
    <div class="document-editor">
        <!-- 工具栏容器 start -->
        <div class="document-editor__toolbar"></div>
        <!-- 工具栏容器 end -->

        <!-- 编辑器容器 start -->
        <div class="document-editor__editable-container">
            <div class="document-editor__editable">
                <p>The initial editor data.</p>
            </div>
        </div>
        <!-- 编辑器容器 end -->
    </div>
</template>

<script>

// import CKEditor from '@ckeditor/ckeditor5-build-classic';//经典模式
import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document';//文档模式

export default {
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
                CKEditor.create(document.querySelector('.document-editor__editable'), {
                    ckfinder: {
                        // Upload the images to the server using the CKFinder QuickUpload command.
                        uploadUrl: 'http://localhost:8070/img-api/upload'
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

