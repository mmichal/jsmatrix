JSOBJECTS := Matrix.min.js 

JSOUTPUT := jsmatrix.min.js

COMPILER := yui-compressor

VPATH := ./src/
FLAGS := --charset utf-8

all: js

js: $(JSOBJECTS)
	cat $(JSOBJECTS) > $(JSOUTPUT)

%.min.js: %.js
	$(COMPILER) $(FLAGS) -o $@ $<
	
clean:
	rm ./*.min.js
 
.PHONY: clean
