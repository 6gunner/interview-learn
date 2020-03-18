<template>
    <div class="main">
        <div class="v1">
            v1
        </div>
        <div class="v2">
            <div class="child">
                v2
            </div>
        </div>
        <div class="v3">
            <div class="child">
            </div>
        </div>
        <div class="v4">
            <div class="child">
                v4
            </div>
        </div>
        <div class="v5">
            <div class="child">
                v5
            </div>
        </div>
        <div class="v6">
            <div class="child">
                v6
            </div>
        </div>
    </div>
</template>
<script></script>
<style>
    .main div + div {
        margin-top: 40px;
    }
    .main > div {
        height: 100px;
        width:  100px;
        border: 1px solid #42b983;
        position: relative;
    }

    .child {
        border: 1px solid #000000;
    }

    .v1 {
        text-align: center;
        height: 100px;
        line-height: 100px;
    }
    .v1 div {
    }

    .v2 div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .v3 div {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        width: 50px;
        height: 50px;
    }
    .v4 {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .v5 {
        display: table;
    }
    .v5 .child {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        width: 10px;
        height: 10px;
    }
    .v6 {
        display: grid;
        align-items: center;
        justify-items: center;
    }
    .v6 .child {
    }

</style>
