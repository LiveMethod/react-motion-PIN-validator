all: build

build: webpack static

webpack:
	webpack

# in case there's no dist dir
dist:
	-mkdir dist

# copy static assets from app to dist
static: dist
	-cp -r ./app/img ./dist

# scrub node modules and generated files
clean: 
	rm -rf ./dist
	rm -rf ./node_modules