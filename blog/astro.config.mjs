// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { visit } from 'unist-util-visit';

function remarkMermaid() {
	return (tree) => {
		visit(tree, 'code', (node) => {
			if (node.lang === 'mermaid') {
				node.type = 'html';
				node.value = '<div class="mermaid">' + node.value + '</div>';
			}
		});
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://locdinh209.github.io',
	base: '/Harry-the-architect/',
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [remarkMermaid],
		shikiConfig: {
			theme: 'github-dark',
		},
	},
	trailingSlash: 'always',
});
