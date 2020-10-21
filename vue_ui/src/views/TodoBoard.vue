<template>
<div class="un_todoBoard_wrapper">
    <header class="bl_header">
        <nav class="navbar is-info">
            <div class="navbar-brand">
                <div class="navbar-item has-text-weight-bold">ボードリスト</div>
                <div class="navbar-item">
                    <a class="tag mr-2" @click="addBoard()">+ボードを追加</a>
                    <input type="text" v-model="nextBoardTitle">
                </div>
            </div>
        </nav>
    </header>
    <div class="ly_cont">
        <div class="bl_boardUnit is-flex p-4">
            <div class="bl_board p-2" v-for="(board, bIndex) in boards" :key="bIndex">
                <div class="bl_board_header mb-4">
                    <div>
                        <p class="title">{{ board.title }}</p>
                    </div>
                    <div>
                        <a class="tag" @click="addCard(board)">+カードを追加</a>
                        <input type="text" v-model="board.nextCardTitle">
                    </div>
                </div>
                <!-- .tile.is-child margin-bottom: 1.5rem if not last child -->
                <ul class="bl_cardUnit tile is-vertical sortable">
                    <li class="tile is-child draggable" v-for="(card, cIndex) in board.cards" :key="cIndex">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-header-title">
                                    <input type="text"
                                        v-if="card.isEditMode"
                                        v-model="card.title"
                                        @focusout="card.isEditMode = false">
                                    <p v-else>{{ card.title }}</p>
                                </div>
                                <div class="card-header-icon">
                                    <a class="mr-2" @click="deleteCard(bIndex, cIndex)">
                                        <i class="fas fa-times"></i>
                                    </a>
                                    <a @click="turnOnCardEditMode(card)">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            nextBoardTitle: '',
            boards: [{
                    title: 'aaa',
                    nextCardTitle: '',
                    cards: [{
                            title: 'aa'
                        },
                        {
                            title: 'bb'
                        }, {
                            title: 'aa'
                        },
                        {
                            title: 'bb'
                        }, {
                            title: 'aa'
                        },
                    ]
                },
                {
                    title: 'aaa',
                    cards: [{
                            title: 'aa'
                        },
                        {
                            title: 'bb'
                        },
                    ]
                },
            ]
        };
    },
    methods: {
        addBoard() {
            if (this.nextBoardTitle !== '') {
                this.boards.unshift({
                    title: this.nextBoardTitle,
                    cards: []
                })
            }
            this.nextBoardTitle = ''
        },
        addCard(board) {
            if (board.nextCardTitle !== '') {
                board.cards.unshift({
                    title: board.nextCardTitle
                })
                board.nextCardTitle = ''
            }
        },
        deleteCard(bIndex, cIndex) {
            this.boards[bIndex].cards.splice(cIndex, 1)
        },
        turnOnCardEditMode(card) {
            card.isEditMode = true
            // 再レンダリングが完了するまで、目的のinput要素は存在しないため、$nextTickを用いた
            const targetParent = event.target.closest('.card-header')
            this.$nextTick(() => {
                targetParent.querySelector('input').focus()
            })
        },
    },
}
</script>

<style lang="scss">
.un_todoBoard_wrapper {
    .ly_cont {
        background-color: rgb(173, 215, 230);
        height: calc(100vh - 52px);
        width: 100vw;
        overflow-x: scroll;
    }

    .bl_boardUnit .bl_board:not(:last-child) {
        margin-right: 1rem;
    }

    .bl_board {
        background-color: #ebecf0;
        // 100vh - header - padding
        height: calc(100vh - 52px - 2rem);
        min-width: 200px;
        overflow-y: scroll;
    }
}
</style>
