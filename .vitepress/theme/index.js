// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import PostCard from "./components/PostCard.vue";
import CardContainer from "./components/CardContainer.vue";

export default {
    extends: DefaultTheme,
    enhanceApp(ctx) {
      ctx.app.component('PostCard', PostCard);
      ctx.app.component('CardContainer', CardContainer);
    }
}
