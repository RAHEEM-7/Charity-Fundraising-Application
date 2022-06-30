"""preprocessing input"""
import regex as re
import contractions
import unidecode
import spacy
from word2number import w2n
from num2words import num2words
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
# import nltk
# nltk.download('stopwords')
# nltk.download('punkt')
nlp=spacy.load('en_core_web_lg')

def convert(value):
    """multiplying"""
    if value:
		# determine multiplier
        multiplier = 1
        if value.endswith('k'):
            multiplier = 1000
            value = value[0:len(value)-1]
            return int(float(value) * multiplier)
        if value.endswith('m'):
            multiplier = 1000000
            value = value[0:len(value)-1] # strip multiplier character
            return int(float(value) * multiplier)
		# convert value to float, multiply, then convert the result to int
    return value

def convert_km(sentence):
    """convert k to 1000"""
    words=sentence.split()
    length=len(words)
    i=0
    while i<length:
        if words[i][0].isnumeric():
            words[i]=str(convert(words[i]))
        i+=1
    return ' '.join(words)

def convert_only_numeric(words):
    """ Convert only numeric """
    numeric=[]
    len_of_words=len(words)
    i=0
    while i<len_of_words:
        try:
            if not words[i].isnumeric() and w2n.word_to_num(words[i]):
                numeric.append(w2n.word_to_num(words[i]))
            else:
                numeric.append(int(words[i]))
                words[i]=num2words(words[i])
        except ValueError:
            numeric.append(words[i])
        i+=1
    return numeric

def get_value(idx_j,numeric,words):
    """ Get value """
    wton=''
    idx_i=idx_j
    while idx_i < len(numeric):
        if isinstance(numeric[idx_i], int):
            idx_j=idx_j+1
            wton=wton+' '+words[idx_i]
            idx_i=idx_i+1
        else:
            break
    return wton,idx_j

def convert_numeric_num(sentence):
    """convert numeric words"""
    words=sentence.split()
    num=""
    numeric=convert_only_numeric(words)
    length=len(numeric)
    number=[]
    idx_j=0
    while idx_j<length:
        wton,idx_j=get_value(idx_j,numeric,words)
        wton=remove_stop_words(wton)
        if len(wton)>0:
            try:
                val=w2n.word_to_num(wton)
            except ValueError:
                val=wton
            number.append(val)
        if idx_j<length:
            number.append(words[idx_j])
        idx_j=idx_j+1
    idx_i=0
    while idx_i<len(number):
        number[idx_i]=str(number[idx_i])
        idx_i+=1
    num=' '.join(number)
    return num

def preprocessing(sentence):
    """Preprocess string"""
    #remove punctuations
    sentence=re.sub(r'[^\w\s\'$]',' ',sentence)

	#handling white spaces
    sentence = re.sub(' +',' ', sentence)

	#lower case the letters and expand the contractions
    sentence=contractions.fix(sentence.lower())

	#accented letters
    sentence = unidecode.unidecode(sentence)

	#Convert k to 1000,m to 1000000 (3k=3000)
    sentence=convert_km(sentence)

    #convert numeric words to numbers
    sentence= convert_numeric_num(sentence)

    return sentence

#handling with stop words
def remove_stop_words(sentence):
    """Remove stop words"""
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(sentence)
    filtered_sentence = []
    req_words={'no', 'not'}
    stop_words=stop_words-req_words
    for token in word_tokens:
        if token not in stop_words:
            filtered_sentence.append(token)

    doc = nlp(sentence)
    pos_sentence = ""
    for token in doc:
        pos_sentence+=token.pos_
        pos_sentence+=" "
	# print(pos_sentence)

    if len(filtered_sentence)==0:
        if re.search(r'.*SCONJ.*(AUX|ADP).*(PRON|NOUN).*', pos_sentence):
            return sentence
        if re.search(r'.*PRON.*AUX.*(ADV|VERB|ADJ).*', pos_sentence):
            return sentence
        if re.search(r'.*(PRON|VERB).*(AUX|ADP|ADJ).*(PRON|NOUN).*', pos_sentence):
            return sentence
        if re.search(r'.*AUX.*PRON.*ADJ.*', pos_sentence):
            return sentence
        if re.search(r'.*(AUX|SCONJ).*PRON.*VERB.*(NOUN|PRON).*', pos_sentence):
            return sentence
    return ' '.join(filtered_sentence)


# #tokenization and lemmatization of words using spacy
# def lemmatization(sentence):
#     sentence=nlp(sentence)
#     tokens=[token.text for token in sentence]
#     lemmatized_words=[token.lemma_ for token in sentence]
#     return lemmatized_words




# text normalization demo
# s="How long doesn't    isn't   $10000   and forty thousand three hundred rupees shipping take?"
# s="i don't know"
# s='i have 3k rupees'
# b=preprocessing(s)
# print(b)
# c=lemmatization(b)
# print(c)
# d=tfidvectorizing(c)
