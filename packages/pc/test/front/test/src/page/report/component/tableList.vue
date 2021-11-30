<template>
    <d-table border :height="height" :columns="columns" :data="data">
        <d-table-column
            :property="item.key"
            :label="item.title"
            v-for="item in columns"
            :key="item.key"
        ></d-table-column>
    </d-table>
</template>
<script type="text/ecmascript-6">
export default {
    props: {
        data: {
            type: Array
        },
        name: {
            type: String
        },
        height: {
            type: Number,
            default: 230
        }
    },
    computed: {
        columns() {
            return [
                {
                    title: this.name,
                    key: 'name'
                },
                {
                    title: '人数',
                    key: 'value'
                },
                {
                    title: '占比',
                    key: 'percent'
                }
            ]
        }
    }
}
</script>