<template>
<div class="un_pieceRotation_wrapper">
    <div class="section">
        <div class="title">ピースの回転</div>
        <div class="bl_pieceWrapper">
            <table class="bl_piece">
                <tr v-for="(row, i) in piece.shape2D" :key="i">
                    <td class="bl_piece_cell" :class="{is_green: cell === 1}" v-for="(cell, j) in row" :key="j">
                        <div class="bl_piece_cellInner">
                        </div>
                    </td>
                </tr>
            </table>
            <div class="bl_rotTool">
                <span>
                    <img 
                        @click="rotateLeft()"
                        class="bl_rotTool_left bl_rotTool_clickable" 
                        src="/assets/arrow-curve-pointing-to-right.svg" 
                        width="50" 
                        height="50">
                    <img
                        @click="rotateRight()"
                        class="bl_rotTool_right bl_rotTool_clickable" 
                        src="/assets/arrow-curve-pointing-to-right.svg" 
                        width="50" 
                        height="50">
                    <img 
                        @click="transpose()"
                        class="bl_rotTool_transpose bl_rotTool_clickable" 
                        src="/assets/update.svg" 
                        width="20" 
                        height="20">
                </span>
                <div class="bl_rotTool_circle"></div>
            </div>
        </div>
    </div>
    <div class="section">
        <div class="bl_pieceUnit">
            <table class="bl_piece" 
                v-for="(shape2D, pieceId) in pieceList"
                :key="pieceId"
                @click="selectPiece(pieceId)">
                <tr v-for="(row, i) in shape2D" :key="i">
                    <td class="bl_piece_cell is_small" :class="{is_green: cell === 1}" v-for="(cell, j) in row" :key="j">
                        <div class="bl_piece_cellInner">
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            currentPieceId: 1,
            piece: {
                shape2D: [
                    [1,1,1],
                    [1,0,0],
                ],
            },
            pieceList: [
                [[1,1,1],[1,0,0],[1,0,0]],
                [[0,1,0],[1,1,1],[0,1,0]],
                [[1,1],[1,0]],
                [[1],[1],[1],[1]],
                [[1,1,1],[1,0,1]],
            ]
        }
    },
    methods: {
        rotateRight() {
            const newShape2D = this.piece.shape2D[0].map((cell, j) => {
                return this.piece.shape2D.map((row) => {
                    return row[j]
                }).reverse()
            })
            this.piece.shape2D = newShape2D
        },
        rotateLeft() {
            // the difference is whether reverse method is attached inner array or outer array.
            const newShape2D = this.piece.shape2D[0].map((cell, j) => {
                return this.piece.shape2D.map((row) => {
                    return row[j]
                })
            }).reverse()
            this.piece.shape2D = newShape2D
        },
        transpose() {
            // the difference is to remove reverse method
            const newShape2D = this.piece.shape2D[0].map((cell, j) => {
                return this.piece.shape2D.map((row) => {
                    return row[j]
                })
            })
            this.piece.shape2D = newShape2D
        },
        selectPiece(pieceId) {
            this.piece.shape2D = this.pieceList[pieceId]
        }
    }
}
</script>

<style lang="scss">
.un_pieceRotation_wrapper {
    .bl_pieceWrapper {
        position: relative;
        width: fit-content;
    }
    .bl_pieceWrapper > .bl_piece {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    // bl_piece
    .bl_piece_cell.is_green {
        background-color: lightgreen;
        border: solid 1px green;
    }
    .bl_piece_cellInner {
        width: 30px;
        height: 30px;
    }
    .bl_piece_cell.is_small .bl_piece_cellInner {
        width: 15px;
        height: 15px;
    }

    // bl_pieceUnit
    .bl_pieceUnit {
        display: flex;
    }
    .bl_pieceUnit .bl_piece:not(:last-of-type) {
        margin-right: 1.5rem;
    }
    .bl_pieceUnit .bl_piece:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    // bl_rotTool
    .bl_rotTool {
        transform: rotate(-45deg);
    }
    .bl_rotTool_circle {
        width: 150px;
        height: 150px;
        border: 2px dashed lightgray;
        border-radius: 50%;
    }
    .bl_rotTool_left {
        position: absolute;
        transform: rotate3d(1,1,0,180deg);
    }
    .bl_rotTool_right {
        position: absolute;
        bottom: 0;
        right: 0;
        transform: rotate(180deg);
    }
    .bl_rotTool_transpose {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .bl_rotTool_clickable {
        cursor: pointer;
    }
    .bl_rotTool_clickable:hover {
        opacity: 0.5;
    }
}
</style>
