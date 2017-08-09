RM = rm -rf
LIB = lib
MINIMIZE = java -jar tools/yuicompressor-2.4.6.jar --nomunge --preserve-semi -o $(TARGET)/bib-list-min.js  $(TARGET)/bib-list.js 
CAT = cat
SRC = src
TARGET = build
SOURCES = $(LIB)/BibTex-0.1.2.js $(LIB)/jquery.dataTables.min.js $(SRC)/bib-publication-list.js

all: build

clean:
	$(RM) build/*

build: $(TARGET)/bib-list.js minimize

$(TARGET)/bib-list.js: $(SOURCES)
	-mkdir $(TARGET)
	$(CAT) $(SOURCES) > $(TARGET)/bib-list.js

minimize: $(TARGET)/bib-list-min.js

$(TARGET)/bib-list-min.js: $(SOURCES)
	$(MINIMIZE)
