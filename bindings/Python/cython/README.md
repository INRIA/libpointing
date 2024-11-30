# Compiling the library

## Step 0
Install cython from http://cython.org/ (at least a version > 0.15.1 for C++ support)

If you are using windows + Cygwin/mingw you should follow this documentation:
http://docs.cython.org/src/tutorial/appendix.html

## Step 0.5
Skip Step 1 and Step 2 and run `make` on Linux and Mac

## Step 1
Compile libpointing and copy 
pointing.dll (or pointing.so) into the bindings/Python/cython directory.

## Step 2
Compile the python binding by typing:
```python3 buildcythonlib.py build_ext --inplace```

If you are using windows + Cygwin/mingw there is a bug while compiling pylibpointing.cpp.
The problem is that distutils is still linking with msvc90, this cause the binding to crash 
on some functions. To avoid this, the compilation line should be cut&pasted, the -lmsvc90 
removed, and the line re-executed. 

## Step 3
In python you can then type: 
import pylibpointing
dir(libpointing)

Or launch the examples: 
python consoleExample.py
python apiExample.py

## Known problems
If you are using windows + Cygwin/mingw there is a bug while compiling pylibpointing.cpp.
The problem is that distutils is still linking with msvc90, this cause the binding to crash 
on some functions. To avoid this, the compilation line should be cut&pasted, the -lmsvc90 
removed, and the line re-executed. 

If importing the libpointing library fails, check that all the required dynamic libraries are provided.
On windows+mingw+qt you may need pointing.dll, QTCore4.dll, QTXML4.dll, mingwm10.dll, libgcc_s_dw2-1.dll).
Try to load libpointing.pyd with dependencywalker (http://www.dependencywalker.com/) 
to have list of the possibly missing libraries. 

# Creating the libpointing module for pip

`python setupForPip.py bdist_wheel`