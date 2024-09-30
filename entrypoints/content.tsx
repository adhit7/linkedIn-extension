import './index.css';
import { ContentScriptContext } from 'wxt/client';
import ReactDOM from 'react-dom/client';
import AIChat from './AIChat.tsx';

export default defineContentScript({
  matches: ['*://www.linkedin.com/*'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createUi(ctx);
    ui.mount();
  },
});

function createUi(ctx: ContentScriptContext) {
  return createShadowRootUi(ctx, {
    name: 'linkedin-ai-extension',
    position: 'inline',
    anchor: 'body',
    append: 'first',
    onMount: (uiContainer) => {
      const wrapper = document.createElement('div');
      uiContainer.append(wrapper);

      const root = ReactDOM.createRoot(wrapper);
      root.render(<AIChat />);
      return { root };
    },
  });
}
