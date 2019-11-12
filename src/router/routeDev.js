
/**
 * 这里配置开发环境写死的路由和菜单，方便开发
 */

//静态路由
var routeDevList = [
    {
        path: '/routedev',
        component: resolve => require(['../components/test/RouteDev'], resolve),
        meta: {
            title: '静态菜单路由'
        }
    },

];
//静态菜单
var menuDevList = [
    {
        icon: 'el-icon-date',
        index: Math.random()+'',
        title: '静态菜单Demo',
        subs: [
            {
                index: 'routedev',
                title: '静态菜单和路由'
            },
        ]
    }
]


var routeDev = {
    ROUTE_DEV: true,//是否写入静态路由（开关）
    routeDevList: routeDevList,
    MENU_DEV: true,//是否写入静态菜单（开关）
    menuDevList: menuDevList,
}
export default routeDev;