cdef extern from "pointing/utils/PointingCursor.h" namespace "pointing":

    cdef cppclass PointingCursor:
        @staticmethod
        void setPosition(double x, double y)

        @staticmethod
        void getPosition(double *x, double *y)
