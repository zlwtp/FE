import { base } from '../env';
import Router from '@2haohr/front-router';

export default (app, option) => {
    Router(app, { base });

    const { router } = app.Vue.$ctx;

    router.afterEach(route => {
        const { analysis, log, namespace } = app.Vue.$ctx;
        const path = `${namespace ? `/${namespace}` : ''}${route.path}`;

        analysis && analysis.TP(path); // 统计PV的页面URL
        log && log.PLV(path); // 产品线统计
    });
};
