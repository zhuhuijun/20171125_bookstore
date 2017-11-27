import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Add from '@/components/Add';
import List from '@/components/List';
import Detail from '@/components/Detail';

Vue.use(Router)

export default new Router({
  routes: [
    /*{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }*/
    {path: '/add', component: Add},
    {path: '/detail/:id', component: Detail,name:'detail'},
    {path: '/list', component: List},
    {path: '*', component: List}
  ]
})
