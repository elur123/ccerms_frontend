import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
import { useStyleStore } from '@/stores/style.js'
import { useLayoutStore } from '@/stores/layout.js'
import { darkModeKey, styleKey } from '@/config.js'

import { useLoading } from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import './css/main.css'

/* Init Pinia */
const pinia = createPinia()

/* Create Vue app */
const app = createApp(App);
app.use(router);
app.use(pinia);

app.provide('Loader', useLoading())

app.mount('#app');

/* Init Pinia stores */
const mainStore = useMainStore(pinia)
const styleStore = useStyleStore(pinia)
const layoutStore = useLayoutStore(pinia)

/* Fetch sample data */
// mainStore.fetch('clients')
// mainStore.fetch('history')

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? 'basic')

/* Dark mode */
styleStore.setDarkMode(false)

/* Default title tag */
const defaultDocumentTitle = 'CCERMS'

/* Collapse mobile aside menu on route change */
router.beforeEach(() => {
  layoutStore.asideMobileToggle(false)
  layoutStore.asideLgToggle(false)
})

router.afterEach(to => {
  /* Set document title from route meta */
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle

  /* Full screen mode */
  layoutStore.fullScreenToggle(!!to.meta.fullScreen)
})
