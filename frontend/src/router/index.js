import Vue from 'vue';
import VueRouter from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import AppMain from '@/views/AppMain';
import AppNotice from '@/views/AppNotice';
import AppPlan from '@/views/AppPlan';
import AppPlace from '@/views/AppPlace';
import NoticeList from '@/components/notice/NoticeList';
import NoticeView from '@/components/notice/NoticeView';
import NoticeWrite from '@/components/notice/NoticeWrite';
import NoticeModify from '@/components/notice/NoticeModify';
import NoticeDelete from '@/components/notice/NoticeDelete';
import AppSignUp from '@/views/user/AppSignUp';
import AppLogin from '@/views/user/AppLogin';
import AppMypage from '@/views/user/AppMypage';
import PlaceList from '@/components/place/PlaceList';
import PlaceWrite from '@/components/place/PlaceWrite';
import PlanMain from '@/views/plan/PlanMain';
import AppTrail from '@/views/AppTrail';
import TrailBoardWrite from '@/components/trail/TrailBoardWrite';
import TrailBoardView from '@/components/trail/TrailBoardView';
import PlanView from '@/views/plan/PlanView';
import PlanWrite from '@/views/plan/PlanWrite';
import TrailBoardWriteItem from '@/components/trail/TrailBoardWriteItem';
import AppError from "@/views/AppError";

Vue.use(VueRouter);

const routes = [
  {
    path: "/autherror",
    name: "autherror",
    component: AppError,
  },
  {
    path: '/',
    name: 'home',
    component: AppMain,
  },
  {
    path: '/notice',
    name: 'notice',
    redirect: '/notice/noticelist',
    component: AppNotice,
    children: [
      {
        path: 'noticelist',
        name: 'noticelist',
        component: NoticeList,
      },
      {
        path: 'noticeview/:articleno',
        name: 'noticeview',
        component: NoticeView,
      },
      {
        path: 'noticewrite',
        name: 'noticewrite',
        component: NoticeWrite,
      },
      {
        path: 'noticemodify/:articleno',
        name: 'noticemodify',
        component: NoticeModify,
      },
      {
        path: 'noticedelete/:articleno',
        name: 'noticedelete',
        component: NoticeDelete,
      },
    ],
  },
  {
    path: '/plan',
    name: 'plan',
    redirect: 'plan/main',
    component: AppPlan,
    children: [
      {
        path: 'main',
        name: 'planmain',
        component: PlanMain,
      },
      {
        path: 'view',
        name: 'planview',
        component: PlanView,
      },
      {
        path: 'wirte',
        name: 'planwrite',
        component: PlanWrite,
        props: true,
      },
    ],
  },
  {
    path: '/place',
    name: 'place',
    redirect: '/place/placelist',
    component: AppPlace,
    children: [
      {
        path: 'placelist',
        name: 'placelist',
        component: PlaceList,
      },
      {
        path: 'placewrite',
        name: 'placewrite',
        component: PlaceWrite,
      },
    ],
  },
  {
    path: '/signup',
    name: 'signup',
    component: AppSignUp,
  },
  {
    path: '/login',
    name: 'login',
    component: AppLogin,
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: AppMypage,
  },
  {
    path: '/trail',
    name: 'trail',
    component: AppTrail,
  },
  {
    path: '/trailwrite',
    name: 'trailwrite',
    component: TrailBoardWrite,
  },
  {
    path: '/trailboardview',
    name: 'trailboard',
    component: TrailBoardView,
  },
  {
    path: '/trailboardwriteitem',
    name: 'trailboardwriteitem',
    component: TrailBoardWriteItem,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
