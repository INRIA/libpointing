from distutils.core import setup
from distutils.extension import Extension
from Cython.Distutils import build_ext
from Cython.Build import cythonize
import platform

libpointing = '../../../'

system = platform.system()

if system == 'Darwin':
    ext_modules = [Extension(
                        "libpointing.libpointing",
                        ["libpointing.pyx"],
                        language="c++",
                        libraries=['pointing'],
                        include_dirs=[libpointing],
                        library_dirs=["./", libpointing+"pointing"],
                        extra_compile_args=["-stdlib=libc++", "-mmacosx-version-min=10.10", "-std=c++17", "-arch", "arm64", "-arch", "x86_64"],
                        extra_link_args=["-mmacosx-version-min=10.10", "-framework", "CoreGraphics", "-arch", "arm64", "-arch", "x86_64"],
                        )]
elif system == 'Linux':
    ext_modules = [Extension(
                         "libpointing.libpointing",
                         ["libpointing.pyx"],
                         language="c++",
                         libraries=['pointing', "stdc++", "udev", "X11", "Xrandr"],
                         include_dirs=[
                            libpointing
                            ],
                         library_dirs=["./"]
                         )]
elif system == 'Windows':
    ext_modules = [Extension(
                         "libpointing.libpointing",
                         ["libpointing.pyx"],
                         language="c++",
                         libraries=['pointing', "user32", "advapi32", "setupapi", "hid"],
                         include_dirs=[
                            libpointing
                            ],
                         library_dirs=["./"]
                         )]
else:
    ext_modules = [Extension(
                         "libpointing.libpointing",
                         ["libpointing.pyx"],
                         language="c++",
                         libraries=['pointing', "stdc++"],
                         include_dirs=[
                            libpointing
                            ],
                         library_dirs=["./"]
                         )]

setup(
  name='libpointing',
  cmdclass={'build_ext': build_ext},
  ext_modules=cythonize(ext_modules, compiler_directives={'language_level' : "3"})
)
