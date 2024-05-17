include .env

root := $(shell pwd)

all: install build build-app package-app publish-app

reset: clean update
	
clean:
	@echo "cleaning..."
	rm -rf ./elwood

update:
	@echo "Updating submodule..."
	git submodule update --remote

install:
	@echo "Installing dependencies..."
	cd ./elwood && pnpm install

build:
	@echo "Building..."
	cd ./elwood && pnpm run build

build-app:
	@echo "Building app..."
	cd ./elwood/apps/desktop && pnpm run build

package-app:
	@echo "Packaging..."
	cd ./elwood/apps/desktop && pnpm run package

publish-app:
	@echo "Publishing..."
	./scripts/release.ts
	 