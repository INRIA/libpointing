# file: cwinSystemPointerAcceleration.pxd

from libcpp.string cimport string
from libcpp cimport bool
from curi cimport URI 

IF WINDOWS:
    cdef extern from "pointing/transferfunctions/windows/winSystemPointerAcceleration.h" namespace "pointing":

        cdef cppclass winSystemPointerAcceleration:
            winSystemPointerAcceleration()
            void setTransferFunction(URI &funcURI)
            void get(string *winVersion, int *sliderPosition, bool *enhancePointerPrecision)
            void set(int sliderPosition, bool enhancePointerPrecision)
