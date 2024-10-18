<template>
    <div>
    <AreaHeader/>
    <hr class="divider" />
        <div class="Area-Home">
            <h1>홈페이지 입니다.</h1>
            <img alt="Vue logo" src="@/assets/logo.png">
        </div>
    </div>
</template>

<script>
import AreaHeader from '@/components/AreaHeader.vue';

export default {
name: "AreaHome",
components: {
    AreaHeader
},
};
</script>

<style>
.Area-Home {
 text-align: center;
 padding-top: 10%;
}
</style>