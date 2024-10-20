# tests/interpolation/interpolation.pro --
#
# Initial software
# Authors: Izzat Mukhanov
# Copyright © INRIA

TEMPLATE  = app
CONFIG   += warn_on link_prl testcase
CONFIG   -= app_bundle

QT -= gui
QT += testlib

TARGET = interpolation

POINTING = ../..
include($$POINTING/pointing/pointing.pri)

macx {
    QMAKE_APPLE_DEVICE_ARCHS = x86_64
}

HEADERS   += interpolation.h
