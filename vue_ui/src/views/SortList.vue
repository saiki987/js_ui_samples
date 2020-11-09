<template>
<div class="un_sortList_wrapper">
<div class="ly_cont section">
    <div class="title">Sort List</div>
    <div class="bl_tableWithTool">
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <td></td>
                        <td>no</td>
                        <td>title</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, k) in list" :key="k">
                        <td>
                            <input class="checkbox" type="checkbox" v-model="listOfCheckedSortNo" :value="item.sort_no">
                        </td>
                        <td>{{ item.sort_no }}</td>
                        <td>{{ item.title }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="panel">
            <div class="panel-heading">
                Sort Tool
            </div>
            <div class="panel-block">
                <span class="mr-2">checked:</span>
                <span v-for="(no, k) in listOfCheckedSortNo.sort()" :key="k">
                    {{ no + ', ' }}
                </span>
            </div>
            <datalist id="existingSortNo">
                <option v-for="(item, k) in list" :value="item.sort_no" :key="k"></option>
            </datalist>
            <div class="panel-block">
                <input type="text" list="existingSortNo" v-model="inputBefore">
                の前に移動
                <span class="tag is-dark hp_cursor_pointer" @click="moveBefore()">go</span>
            </div>
            <div class="panel-block">
                <input type="text" list="existingSortNo" v-model="inputAfter">
                の後ろに移動
                <span class="tag is-dark hp_cursor_pointer" @click="moveAfter()">go</span>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            listOfCheckedSortNo: [],
            targetSortNo: 0,
            inputBefor: '',
            inputAfter: '',
            list: [
                {sort_no: 1, title: '国語A'},
                {sort_no: 2, title: '数学C'},
                {sort_no: 3, title: '英語3'},
                {sort_no: 4, title: '数学A'},
                {sort_no: 5, title: '英語1'},
                {sort_no: 6, title: '数学B'},
                {sort_no: 7, title: '国語B'},
            ]
        }
    },
    methods: {
        _moveItem(targetSortNo, afterFlg=false) {
            const restItems = []
            const movingItems = []
            this.list.forEach((item) => {
                if (this.listOfCheckedSortNo.includes(item.sort_no)) {
                    movingItems.push(item)
                } else {
                    restItems.push(item)
                }
            })
            let targetIndex = restItems.findIndex((item) => {
                return item.sort_no === targetSortNo
            })
            if (afterFlg) {
                targetIndex += 1
            }
            restItems.splice(targetIndex, 0, ...movingItems)
            this.listOfCheckedSortNo = []
            this.list = restItems
        },
        moveBefore() {
            const targetSortNo = parseInt(this.inputBefore)
            this._moveItem(targetSortNo)
            this.inputBefore = ''
        },
        moveAfter() {
            const targetSortNo = parseInt(this.inputAfter)
            this._moveItem(targetSortNo, true)
            this.inputAfter = ''
        },
    },
}
</script>

<style lang="scss">
.un_sortList_wrapper {
    .bl_tableWithTool {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .hp_cursor_pointer {
        cursor: pointer;
    }
}
</style>
