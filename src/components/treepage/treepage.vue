<template>
    <div>
        <el-tree :data="treeData" :props="defaultProps" node-key="id" :expand-on-click-node="false" @node-click="nodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{node.label}}
                    <i class="el-icon-plus" @click.stop="() => add(data)"></i>
                    <i class="el-icon-edit-outline" @click.stop="() => edit(data)"></i>
                    <i class="el-icon-delete" @click.stop="() => remove(node,data)"></i>
                </span>
            </span>
        </el-tree>
    </div>
</template>
<script>
let id = 1000;

export default {
    name: "treepage",
    data() {
        return {
            treeData: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    methods: {
        add(data) {
            const newChild = { id: id++, label: '新增节点' + id, children: [] };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);

        },
        edit(data) {
            data.label = "修改节点";
            console.log(data);
        },
        remove(node, data) {
            debugger;
            const parent = node.parent
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
            this.$message({
                type: 'success',
                message: 'delete ok'
            })

        },
        nodeClick(data, node, el) {
            this.$message({
                message: '您点击的是:' + data.label,
                type: "success"
            });
        }

    }
};
</script>
