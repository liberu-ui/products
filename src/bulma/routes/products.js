import routeImporter from '@liberu-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./products', false, /.*\.js$/));
const RouterView = () => import('@liberu-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: '/products',
    component: RouterView,
    meta: {
        breadcrumb: 'products',
        route: 'products.index',
    },
    children: routes,
};
