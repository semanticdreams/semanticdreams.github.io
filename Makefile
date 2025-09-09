.PHONY: dev build preview push post

dev:
	pnpm run docs:dev

build:
	pnpm run docs:build

preview:
	pnpm run docs:preview

push:
	git add -A && git commit -m "Update" && git push

# List of words not capitalized in title
SMALL_WORDS="a an the and but or for nor on at to from by in of"

# Command to generate a new post
post:
	@TITLE="$(filter-out $@,$(MAKECMDGOALS))"; \
	FILENAME="$$(echo $$TITLE | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g').md"; \
	CAP_TITLE=""; \
	for word in $$TITLE; do \
		lower=$$(echo $$word | tr '[:upper:]' '[:lower:]'); \
		if echo $(SMALL_WORDS) | grep -wq $$lower; then \
			CAP_TITLE="$$CAP_TITLE$$lower "; \
		else \
			if echo $$word | grep -q '[A-Z]'; then \
				CAP_TITLE="$$CAP_TITLE$$word "; \
			else \
				CAP_TITLE="$$CAP_TITLE$$(echo $$word | sed 's/.*/\u&/') "; \
			fi; \
		fi; \
	done; \
	CAP_TITLE="$$(echo $$CAP_TITLE | sed 's/ $$//')"; \
	DATE="$$(date '+%Y-%m-%d')"; \
	mkdir -p posts; \
	echo "---" > posts/$$FILENAME; \
	echo "title: $$CAP_TITLE" >> posts/$$FILENAME; \
	echo "description:" >> posts/$$FILENAME; \
	echo "date: $$DATE" >> posts/$$FILENAME; \
	echo "---" >> posts/$$FILENAME; \
	echo "" >> posts/$$FILENAME; \
	echo "# $$CAP_TITLE" >> posts/$$FILENAME; \
	echo "" >> posts/$$FILENAME; \
	echo "" >> posts/$$FILENAME; \
	echo "Created post: posts/$$FILENAME"

# Allow passing title with spaces
%:
	@:
