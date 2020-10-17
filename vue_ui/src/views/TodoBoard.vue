<template>
<div class="bl_todoBoard_wrapper">
    <header>
        <h3>ボードリスト<a href="">ボードを追加する</a></h3>
    </header>
    <div class="content_wrapper">
        <div class="boards">
            <div class="board" v-for="(board, index) in boards" :key="index">
                <h3>
                    <a href="">{{ board.title }}</a>
                </h3>
                <div class="addcard">
                    <a href="">カードを追加する</a>
                </div>
                <ul class="cards sortable" id="sortable-<?=$board->id?>">
                    <li class="card draggable" v-for="(card, index) in board.cards" :key="index">
                        <span>{{ card.title }}</span>
                        <a href="">
                            <i class="fas fa-times"></i>
                        </a>
                        <a href="">
                            <i class="fas fa-edit"></i>
                        </a>
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
            boards: [{
                title: 'aaa',
                cards: [{
                        title: 'aa'
                    },
                    {
                        title: 'bb'
                    },
                ]
            }]
        };
    }
}
</script>

<style lang="scss">
.bl_todoBoard_wrapper {
    a {
        text-decoration: none;
        color: #172b4d;
    }

    header {
        height: 40px;
        background-color: rgb(126, 199, 223);
        padding: 10px;
    }

    header h3 {
        color: #ebecf0;
    }

    .content_wrapper {
        height: calc(100% - 60px);
        background-color: rgb(173, 215, 230);
    }

    .boards {
        margin: 0 10px;
        padding: 10px 0 20px;
        height: calc(100% - 30px);
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;
        /* white-space: nowrap; */
    }

    .board {
        display: flex;
        flex-direction: column;

        background-color: #ebecf0;
        width: 272px;
        height: calc(100% - 40px);
        padding: 10px 0 10px;
        margin: 0 10px 0 0;
        white-space: initial;
        /* デフォルトで縮む効果を向こうにできた */
        flex-shrink: 0;
    }

    .board h3 {
        color: #172b4d;
        font-weight: 600;
        margin: 0px 10px 8px;
        font-size: 18px;
        line-height: 22px;
    }

    .board .addcard {
        margin: 0 10px 8px;
    }

    .cards {
        /* 親要素をflexboxにしていることで、100%が残りの高さになる */
        height: 100%;
        overflow-y: scroll;
        white-space: initial;
    }

    .card {
        background-color: #fff;
        margin: 10px;
        padding: 5px;
    }

    .card .fa-edit,
    .card .fa-times {
        float: right;
        margin-right: 5px;
    }

    .card .fa-edit:hover,
    .card .fa-times {
        cursor: pointer;
    }
}
</style>
