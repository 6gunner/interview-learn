<template>
    <div class="sticky">
        <div class="header"></div>
        <div class="content"></div>
        <div class="footer"></div>
    </div>

</template>
<script></script>
<style scoped="true">
    .sticky {
        max-width: 600px;
        margin: 0 auto;
        border: solid 10px green;
        padding: 10px;
        margin-top: 40px;
    }

    .sticky * {
        padding: 10px;
        background: #aaa;
        border: dashed 5px #000;
    }

    .sticky * + *{
        margin-top: 10px;
    }


    .header {
        position: sticky;
        top: 0px;
        height: 50px;
        background: #aaa;
    }

    .content {
        height: 1000px;
    }

    .footer {
        border-color: red;
    }


    div {
        display: flex;
        flex: 1;
        
    }
</style>
