module.exports = {
    extends: ['@dianmi-fe/stylelint-config'],
    rules: {
        'font-family-no-missing-generic-family-keyword': null,
        'order/order': [
            'at-rules',
            'custom-properties',
            'dollar-variables',
            'declarations',
            'rules',
        ],

        /**
         * 已处理规则，待更新版本
         */
        'no-descending-specificity': null,
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global', 'local']
            }
        ]
    }
}
