<template>
<div class="un_gomoku_wrapper">
    <div class="section">
        <div class="title">駒並べ</div>
        <div class="block">
            <div class="is-flex"
                v-if="currentPieceId === 1">
                <span class="tag is-medium is-dark">黒番</span>
            </div>
            <div class="is-flex"
                v-if="currentPieceId === 2">
                <span class="tag is-medium is-light">白番</span>
            </div>
        </div>
        <table class="bl_board">
            <tr v-for="(row, i) in pieces" :key="i">
                <td class="bl_board_cell"
                    v-for="(piece, j) in row" :key="j"
                    @click="putPiece(i, j)">
                    <div class="bl_piece bl_piece__black" v-if="piece === 1"></div>
                    <div class="bl_piece bl_piece__white" v-if="piece === 2"></div>
                </td>
            </tr>
        </table>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            currentPieceId: 1,
            pieces: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
            ],
        }
    },
    methods: {
        putPiece(i, j) {
            this.pieces[i][j] = this.currentPieceId
            if (this.currentPieceId === 1) {
                this.currentPieceId = 2
            } else if (this.currentPieceId === 2) {
                this.currentPieceId = 1
            }
        }
    }
}
</script>

<style lang="scss">
.un_gomoku_wrapper {
    .bl_board_cell {
        width: 30px;
        height: 30px;
        border: solid 1px lightblue;
    }
    .bl_board_cell:hover {
        background-color: lightyellow;
    }
    .bl_piece {
        width: calc(100% - 1px);
        height: calc(100% - 1px);
        border: lightgrey 1px solid;
        border-radius: 50%;
    }
    .bl_piece.bl_piece__black {
        background-color: black;
    }
    .bl_piece.bl_piece__white {
        background-color: whitesmoke;
    }
}
</style>
