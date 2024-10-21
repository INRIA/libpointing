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

HEADERS   += BallisticsPlayground.h
SOURCES   += BallisticsPlayground.cpp ballistics.cpp
