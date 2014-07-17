REPORTER = spec
TESTS = test/**/*.js

setup: 
	sudo sh ./setup-ws.sh

test:
	./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		$(TESTS)

install:
	npm install

build: setup install test
	git update-index --assume-unchanged setup-ws.sh

.PHONY: test setup install build