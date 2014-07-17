REPORTER = spec
TESTS = test/**/**

test:
	./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		$(TESTS)

install:
	npm install

build: install test
	git update-index --assume-unchanged setup-ws.sh

.PHONY: test setup install build