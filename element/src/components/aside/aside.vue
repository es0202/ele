<template>
    <el-aside class="aside">
        <el-menu class="aside-menu">
            <el-submenu index="1">
                <template slot="title">导航一</template>
                <el-menu-item index="#test" class="aside-item">选项1</el-menu-item>
                <el-menu-item index="1-2" class="aside-item">选项2</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">导航二</template>
                <el-menu-item index="2-1" class="aside-item">选项3</el-menu-item>
                <el-menu-item index="2-2" class="aside-item">选项4</el-menu-item>
                <el-menu-item index="2-3" class="aside-item">选项5</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">导航三</template>
                <el-menu-item index="3-1" class="aside-item">选项6</el-menu-item>
                <el-menu-item index="3-2" class="aside-item">选项7</el-menu-item>
                <el-menu-item index="3-3" class="aside-item">选项8</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">导航四</template>
                <el-menu-item index="4-1" class="aside-item">选项9</el-menu-item>
                <el-menu-item index="4-2" class="aside-item">选项10</el-menu-item>
                <el-menu-item index="4-3" class="aside-item">选项11</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">导航五</template>
                <el-menu-item index="5-1" class="aside-item">选项12</el-menu-item>
                <el-menu-item index="5-2" class="aside-item">选项13</el-menu-item>
                <el-menu-item index="5-3" class="aside-item">选项14</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
export default {}
</script>


<style lang="stylus">
$size = 14px;
.aside
    width 21% !important; // 消除默认
    .aside-menu, .aside-item
        border none;
        background #f8f8f8;
    .el-submenu__title, .el-menu-item
        height 46px;
        font-size $size;
    i.el-submenu__icon-arrow
        display none;
    .el-submenu__title
        border-left 4px solid #f8f8f8;
        padding-left 12px !important;
    .el-submenu.is-opened
        .el-submenu__title
            border-left 4px solid #409EFF;
    .aside-item
        min-width 50px !important;
        padding-left 10px !important;
        &::before
            content '·';
            padding-right 6px;
            font-weight bold;
</style>
