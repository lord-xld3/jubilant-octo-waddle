# Password Generator
Increased options, unicode doesn't display in browser but generates ~valid-ish results

# Crypt0r
Hash is generated to be at least the length of input

Character ranges limited from (34-6809) for safe output

Valid encryption without salt

Each char of hash is random, and can be "mapped" to different chars of input

This also makes the output random, and there are no repeating characters or patterns


## Theory
Below is a snippet of psuedo-code to plan out an encryption function

-------encrypt0r---------

! input data

% arithmetic

$ function/reference

? output data

@ attributes

! textbox-input::@length>0 && <8192

! textbox-hash::@length>0 && <8192

! checkbox::stringOptions

! button-submit::@goto $cryptMe

$ cryptMe

  % convert textbox-input to integer [textInput]

  % create random integer of length (textbox.length) [hashText]

  % [outputText] == [textInput] XOR [hashText]

  ? outputText,hashText

$

$ decryptMe

  % convert textbox-input to binary/integer [textInput]

  % convert textbox-hash to binary/integer [inputHash]

  % [outputText] == [textInput] XOR [hashText]

  ? outputText

$