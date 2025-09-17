// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'
import './custom.css'
import PostCard from "./components/PostCard.vue";
import ProjectCard from "./components/ProjectCard.vue";
import CardContainer from "./components/CardContainer.vue";

export default {
    extends: DefaultTheme,
    Layout: MyLayout,
    enhanceApp(ctx) {
      ctx.app.component('PostCard', PostCard);
      ctx.app.component('CardContainer', CardContainer);
      ctx.app.component('ProjectCard', ProjectCard);
    }
}
