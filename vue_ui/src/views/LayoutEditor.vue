<template>
<div class="un_layoutEditor_wrapper">
<div class="ly_cont">
    <div class="bl_canvas_wrapper">
        <canvas class="bl_canvas"></canvas>
        <div class="un_draggableElems">
            <div
                class="bl_textBox"
                :class="{is_selected: box.index === boxIndex}"
                @click="selectBox(box)"
                @mousedown="waitDrag(box)"
                @mousemove="moveBox(box)"
                @mouseup="endDrag(box)"
                @mouseout="endDrag(box)"
                :style="`top:${box.y}px; left:${box.x}px;`"
                v-for="(box, i) in boxes"
                :key="i">
                <div
                    class="bl_textBox_resizer bl_textBox_resizerR"
                    :class="{is_active: box.isResizingR}"
                    @mousedown="waitResize(box, 'R')"
                    @mousemove="resizeBox(box, 'R')"
                    @mouseup="endResize(box)">
                </div>
                <div
                    class="bl_textBox_resizer bl_textBox_resizerB"
                    :class="{is_active: box.isResizingB}"
                    @mousedown="waitResize(box, 'B')"
                    @mousemove="resizeBox(box, 'B')"
                    @mouseup="endResize(box)">
                </div>
                <div
                    class="bl_textBox_resizer bl_textBox_resizerBR"
                    :class="{is_active: box.isResizingBR}"
                    @mousedown="waitResize(box, 'BR')"
                    @mousemove="resizeBox(box, 'BR')"
                    @mouseup="endResize(box)">
                </div>
                <div class="bl_textBox_inner" :style="`line-height:${box.fontSize}px; font-size:${box.fontSize}px; width:${box.width}px; height:${box.height}px`">
                    {{ box.text }}
                </div>
            </div>
        </div>
    </div>
    <div class="bl_tool_wrapper">
        <div>
            <button class="button"
                @click="addBox()">追加</button>
        </div>
        <div class="bl_tool">
            <div class="title is-size-4">
                {{ boxes[boxIndex].name }}
            </div>
            <div class="bl_tool_item">
                <div class="column is-2">
                    <label class="label">text</label>
                </div>
                <div class="column">
                    <input type="text" v-model.lazy="boxes[boxIndex].text">
                </div>
            </div>
            <div class="bl_tool_item">
                <div class="column is-3">
                    <label class="label">x:</label>
                </div>
                <div class="column is-3">
                    <input type="text"
                        class="hp_fullwidth"
                        v-model.lazy="boxes[boxIndex].x">
                </div>
                <div class="column is-3">
                    <label class="label">y:</label>
                </div>
                <div class="column is-3">
                    <input type="text"
                        class="hp_fullwidth"
                        v-model.lazy="boxes[boxIndex].y">
                </div>
            </div>
            <div class="bl_tool_item">
                <div class="column is-3">
                    <label class="label">width:</label>
                </div>
                <div class="column is-3">
                    <input type="text"
                        class="hp_fullwidth"
                        v-model.lazy="boxes[boxIndex].width">
                </div>
                <div class="column is-3">
                    <label class="label">height:</label>
                </div>
                <div class="column is-3">
                    <input type="text"
                        class="hp_fullwidth"
                        v-model.lazy="boxes[boxIndex].height">
                </div>
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
            boxIndex: 0,
            boxes: [{
                    name: '氏名',
                    text: '',
                    width: 260,
                    height: 40,
                    x: 30,
                    y: 0,
                    fontSize: 40,
                },
                {
                    name: '修了日',
                    text: '',
                    width: 150,
                    height: 40,
                    x: 0,
                    y: 45,
                    fontSize: 20,
                },
            ]
        }
    },
    mounted() {
        this.boxes.forEach((box, i) => {
            this.boxes[i].index = i
        })
    },
    methods: {
        selectBox(box) {
            this.boxIndex = box.index
        },
        addBox() {
            const numBoxes = this.boxes.length
            this.boxes.push({
                name: `要素${numBoxes + 1}`,
                index: numBoxes,
                type: 'text',
                text: '',
                width: 160,
                height: 40,
                x: 0,
                y: 0,
                fontSize: 20,
            })
        },
        moveBox(box) {
            if (box.isDraggable) {
                const changeX = event.clientX - box.clientX
                const changeY = event.clientY - box.clientY
                box.x += changeX
                box.y += changeY
                box.clientX = event.clientX
                box.clientY = event.clientY
            }
        },
        waitDrag(box) {
            this.boxIndex = box.index
            box.isDraggable = true
            box.clientX = event.clientX
            box.clientY = event.clientY
        },
        endDrag(box) {
            box.isDraggable = false
        },
        waitResize(box, directionName) {
            box.isResizable = true
            box.clientX = event.clientX
            box.clientY = event.clientY
            if (directionName === 'R') {
                box.isResizingR = true
            }
            if (directionName === 'B') {
                box.isResizingB = true
            }
            if (directionName === 'BR') {
                box.isResizingBR = true
            }
        },
        resizeBox(box, directionName) {
            if (box.isResizable) {
                event.stopPropagation()
                const changeX = event.clientX - box.clientX
                const changeY = event.clientY - box.clientY
                if (directionName === 'R') {
                    box.width += changeX
                    box.isResizingR = true
                }
                if (directionName === 'B') {
                    box.height += changeY
                    box.isResizingB = true
                }
                if (directionName === 'BR') {
                    box.width += changeX
                    box.height += changeY
                    box.isResizingBR = true
                }
                box.clientX = event.clientX
                box.clientY = event.clientY
            }
        },
        endResize(box) {
            box.isResizable = false
            box.isResizingR = false
            box.isResizingB = false
            box.isResizingBR = false
        },
    },
}
</script>

<style lang="scss">
.un_layoutEditor_wrapper {
    .hp_fullwidth {
        width: 100%;
    }

    .ly_cont {
        display: flex;
        padding: 3rem 1.5rem;
    }

    .bl_canvas_wrapper {
        /* A4サイズ */
        width: 400px;
        height: 250px;
        flex-shrink: 0;
        border: 1px solid black;
        position: relative;
    }

    .bl_tool_wrapper {
        margin-left: 3rem;
        flex-shrink: 0;
        width: 300px;
    }

    .bl_tool {
        padding: 1.5rem;
        position: relative;
        border: 1px solid black;
    }
    .bl_tool_item {
        display: flex;
        margin-left: -0.75rem;
        margin-bottom: -0.75rem;
        margin-right: -0.75rem;
    }

    .un_draggableElems {
        position: absolute;
        top: 0;
    }

    // textBox
    .bl_textBox {
        position: absolute;
        top: 0;
        white-space: nowrap;
    }
    .bl_textBox.is_selected {
        cursor: grab;
        z-index: 1;
    }
    .bl_textBox.is_selected .bl_textBox_inner {
        background-color: lightblue;
    }
    .bl_textBox_inner {
        background-color: lightgreen;
        width: fit-content;
        height: fit-content;
        text-align: center;
    }

    // resizer
    .bl_textBox_resizer {
        position: absolute;
        opacity: 0.2;
    }
    .bl_textBox_resizerR.is_active {
        width: 50px;
        right: -25px;
    }
    .bl_textBox_resizerR {
        right: 0;
        width: 5px;
        height: 100%;
        background-color: red;
        cursor: ew-resize;
    }
    .bl_textBox_resizerB.is_active {
        height: 50px;
        bottom: -25px;
    }
    .bl_textBox_resizerB {
        bottom: 0;
        width: 100%;
        height: 5px;
        background-color: blue;
        cursor: ns-resize;
    }
    .bl_textBox_resizerBR.is_active {
        height: 50px;
        width: 50px;
        bottom: -25px;
        right: -25px;
    }
    .bl_textBox_resizerBR {
        bottom: 0;
        right: 0;
        width: 5px;
        height: 5px;
        background-color: green;
        cursor: nwse-resize;
    }
}
</style>
