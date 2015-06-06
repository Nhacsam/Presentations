TEX=pdflatex
INDEX=makeindex
GLOSS=makeglossaries

NAME=Base
MAIN=main.tex

SRC_DIR=src
BIN=bin

TEXFLAGS=-output-directory=../$(BIN) -jobname=$(NAME) -halt-on-error

TEXFILES=$(wildcard $(SRC_DIR)/*.tex) $(wildcard $(SRC_DIR)/Parts/*.tex) $(wildcard $(SRC_DIR)/Config/*.tex)

MPOST=mpost
SRC_MPOST=$(wildcard $(SRC_DIR)/mpost/*.mp)
TEMP=$(SRC_MPOST:%.mp=%.0)
C_MPOST=$(TEMP:$(SRC_DIR)/mpost/%=bin/%)

C_PICT=$(SRC_PICT:$(SRC_DIR)/Pictures/%=bin/%)

.PHONY:all pict mrproper clean

all: 	$(NAME).pdf

$(NAME).pdf: 	$(BIN)/$(NAME).aux
		cp $(BIN)/$(NAME).pdf ./
		cp $(BIN)/$(NAME).pdf $(BIN)/$(NAME)2.pdf
		rm $(C_PICT) $(BIN)/$(NAME)2.pdf



$(BIN)/$(NAME).aux:	$(TEXFILES) $(C_MPOST)
		cd $(SRC_DIR) &&\
		$(TEX) $(TEXFLAGS) \
			   $(MAIN) &&\
		$(TEX) $(TEXFLAGS) \
			   $(MAIN) | grep Warning &&\
		cd ..

$(BIN)/$(NAME).glg: $(TEXFILES)
		cd $(SRC_DIR) &&\
		$(TEX) $(TEXFLAGS) \
			   $(MAIN) &&\
		cd .. &&\
		xindy -L french -C utf8 -I xindy -M $(BIN)/$(NAME) \
			 -t $(BIN)/$(NAME).glg -o $(BIN)/$(NAME).gls $(BIN)/$(NAME).glo


$(BIN)/%.0:		$(SRC_DIR)/mpost/%.mp
		cd $(BIN) && \
		$(MPOST) ../$< && \
		cd ..

clean:
	rm -f $(BIN)/*.aux $(BIN)/*.log $(BIN)/*.mpx\
		  $(SRC_DIR)/mpxerr.tex $(SRC_DIR)/*\~ \
		  $(SRC_MPOST:.mp=.mp\~)

mrproper: clean
	rm -f $(BIN)/*; rm -f $(MAIN).pdf;
