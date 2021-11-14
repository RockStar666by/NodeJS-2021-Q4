# Ciphering CLI Tool

#### `my_cipher` - is an entering point file.
#### `-c(--config)` - is required option.
#### `-i(--input)` - can be missed. Default input source is `stdin`.
#### `-o(--output)` - can be missed. Default output source is `stdout`.


### To start the program you should enter
>For example:
>
> `node my_cipher -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"`


### CLI tool accepts 3 options (short alias and full name):

1.  **-c, --config**: config for ciphers
Config is a string with pattern `{XY(-)}n`, where:
  * `X` is a cipher mark:
    * `C` is for Caesar cipher (with shift 1)
    * `A` is for Atbash cipher
    * `R` is for ROT-8 cipher
  * `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
    * `1` is for encoding
    * `0` is for decoding
2.  **-i, --input**: a path to input file
3.  **-o, --output**: a path to output file

>For example:
>
> C1 - is for Caesar cipher with shift `+1 (ABC => BCD)`  
> C0 - is for Caesar cipher with shift `-1 (BCD => ABC)`  
> R1 - is for ROT-8 cipher with shift `+8 (ABC => IJK)`  
> R0 - is for ROT-8 cipher with shift `-8 (IJK => ABC)`  
> A - is for Atbash cipher that reverses all the alphabet every time its called `(ABC => ZYX)`



