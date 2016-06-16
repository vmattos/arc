MOCHA = ./node_modules/.bin/mocha
REPORTER = spec
MOCHA_RUNNER = $(MOCHA) --reporter $(REPORTER)

UNIT_TESTS = test/unit/**/**/*Test.js
CONSUMER_DRIVEN_TESTS = test/consumer-driven/**/**/*Test.js

setup: clean
	mkdir Markdown

clean:
	rm -rf Markdown

unit-test:
	$(MOCHA_RUNNER) $(UNIT_TESTS)

consumer-driven-test:
	$(MOCHA_RUNNER) $(CONSUMER_DRIVEN_TESTS)

test: unit-test consumer-driven-test

install:
	npm install

build: install test setup
	git update-index --assume-unchanged setup-ws.sh

.PHONY: unit-test setup install build setup
