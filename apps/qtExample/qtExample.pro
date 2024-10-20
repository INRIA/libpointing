# apps/qtExample/qtExample.pro --
#
# Initial software
# Authors: Nicolas Roussel
# Copyright © Inria

TEMPLATE  = app
CONFIG   += qt warn_on link_prl
QT += openglwidgets

POINTING = ../..
include($$POINTING/pointing/pointing.pri)

macx {
    QMAKE_APPLE_DEVICE_ARCHS = x86_64
}

HEADERS   += BallisticsPlayground.h
SOURCES   += BallisticsPlayground.cpp ballistics.cpp
