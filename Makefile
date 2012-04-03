FILES = core \
  services \
  jquery.plugin

akin:
	@rm -rf akin.js
	@rm -rf akin.min.js
	@ node support/build.js $(FILES)


.PHONY: akin