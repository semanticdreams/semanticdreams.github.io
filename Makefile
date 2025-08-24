.PHONY: dev build preview

dev:
	pnpm run docs:dev

build:
	pnpm run docs:build

preview:
	pnpm run docs:preview

push:
	git add -A && git commit -m "Update" && git push
