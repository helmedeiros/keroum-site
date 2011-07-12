.PHONY: install lint test build verify deploy publish clean help

help:
	@echo "make install   install npm dependencies"
	@echo "make lint      run jshint, csslint and htmlhint"
	@echo "make test      run jasmine specs"
	@echo "make build     compile sass and assemble dist/"
	@echo "make verify    lint + test + build"
	@echo "make deploy    verify and publish dist/ to gh-pages"
	@echo "make clean     remove dist/ and node_modules/"

install:
	npm install

lint:
	npm run lint

test:
	npm test

build:
	npm run build

verify: lint test build

deploy: verify
	bash bin/publish.sh

publish:
	bash bin/publish.sh

clean:
	rm -rf dist node_modules
