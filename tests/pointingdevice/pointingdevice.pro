# tests/pointingdevice/pointingdevice.pro --
#
# Initial software
# Authors: Izzat Mukhanov
# Copyright © INRIA

TEMPLATE  = app
CONFIG   += warn_on link_prl testcase
CONFIG   -= app_bundle

QT -= gui
QT += testlib

TARGET = pointingdevice

POINTING = ../..
include($$POINTING/pointing/pointing.pri)

HEADERS   += pointingdevice.h

macx {
    QMAKE_APPLE_DEVICE_ARCHS = x86_64
}
